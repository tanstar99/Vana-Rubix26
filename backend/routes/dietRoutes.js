import express from "express";
import { Pinecone } from "@pinecone-database/pinecone";
import Groq from "groq-sdk";
import { pipeline } from "@xenova/transformers";

const router = express.Router();

// --------------------
// Initialize clients
// --------------------

if (!process.env.PINECONE_API_KEY) console.error("Missing PINECONE_API_KEY");
if (!process.env.PINECONE_INDEX_NAME) console.error("Missing PINECONE_INDEX_NAME");
if (!process.env.GROQ_API_KEY) console.error("Missing GROQ_API_KEY");

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY || "",
});

const index = pinecone.index(process.env.PINECONE_INDEX_NAME || "");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY || ""
});

// --------------------
// Embedding model (loaded ONCE)
// --------------------
let extractor = null;

async function loadEmbeddingModel() {
    if (extractor) return;
    console.log("Loading embedding model for diet routes...");
    try {
        extractor = await pipeline(
            "feature-extraction",
            "Xenova/all-MiniLM-L6-v2"
        );
        console.log("Embedding model loaded");
    } catch (err) {
        console.error("Failed to load embedding model:", err);
    }
}

// Load model on start
loadEmbeddingModel();

async function getEmbedding(text) {
    if (!extractor) {
        await loadEmbeddingModel();
        if (!extractor) throw new Error("Embedding model not loaded");
    }

    const output = await extractor(text, {
        pooling: "mean",
        normalize: true,
    });

    return Array.from(output.data);
}

// --------------------
// Routes
// --------------------

// POST /api/diet/generate
router.post("/generate", async (req, res) => {
    try {
        const { plantNames } = req.body;

        if (!plantNames || !Array.isArray(plantNames) || plantNames.length === 0) {
            return res.status(400).json({ error: "plantNames array is required" });
        }

        const plantsString = plantNames.join(", ");
        const query = `Suggest recipes segregated as Breakfast, Lunch, and Dinner from the following plants: ${plantsString}.`;

        console.log("Generating diet plan for:", plantsString);

        // 1. Create embedding for the query
        const queryEmbedding = await getEmbedding(query);

        // 2. Query Pinecone
        const queryResponse = await index.query({
            vector: queryEmbedding,
            topK: 5, // Fetch a bit more context for recipes
            includeMetadata: true,
        });

        // 3. Build context
        const context = queryResponse.matches
            ?.map((m) => m.metadata?.text)
            .filter(Boolean)
            .join("\n\n") || "";

        // 4. Groq prompt
        const messages = [
            {
                role: "system",
                content: `You are an expert Ayurvedic nutritionist and chef. 
                Your task is to create a daily meal plan (Breakfast, Lunch, Dinner) incorporating specific medicinal plants.
                
                Strict Rules:
                1. Use ONLY the provided context to find medicinal properties or traditional uses if available.
                2. Suggest PRACTICAL and tasty vegetarian recipes.
                3. Do not suggest recipes that are not vegetarian.
                4. Also give benefits of the plants in the recipe.
                5. You MUST return the output as a valid JSON object with the following structure:
                {
                    "breakfast": [ { "dish": "Dish Name", "recipe": "**Ingredients:**\\n- 1 cup ingredient X\\n- 2 tbsp ingredient Y\\n\\n**Instructions:**\\n1. Step one...\\n2. Step two...", "benefits": "Key health benefits..." } ],
                    "lunch": [ { "dish": "Dish Name", "recipe": "**Ingredients:**\\n- ...\\n\\n**Instructions:**\\n1. ...", "benefits": "..." } ],
                    "dinner": [ { "dish": "Dish Name", "recipe": "**Ingredients:**\\n- ...\\n\\n**Instructions:**\\n1. ...", "benefits": "..." } ]
                }
                6. Do NOT preserve any other text or markdown formatting outside the JSON.
                7. Ensure every recipe includes specific QUANTITIES (e.g., 1 cup, 2 tsp).
                8. If a plant is non-edible or toxic based on context, DO NOT suggest eating it.
                `
            },
            {
                role: "user",
                content: `Context:\n${context}\n\nTask:\n${query}`
            }
        ];

        // 5. Generate answer
        console.log("Calling Groq for diet plan...");
        let answerText = "";

        try {
            const chatCompletion = await groq.chat.completions.create({
                messages: messages,
                model: "llama-3.1-8b-instant",
                temperature: 0.5,
                max_tokens: 2048,
                response_format: { type: "json_object" }
            });
            answerText = chatCompletion.choices[0]?.message?.content || "{}";
        } catch (groqError) {
            console.error("Groq error:", groqError);
            return res.status(500).json({ error: "Failed to generate diet plan via LLM." });
        }

        // 6. Send response
        res.json({
            plan: answerText,
            sourceNodes: queryResponse.matches?.map((m) => m.id)
        });

    } catch (error) {
        console.error("Request error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message,
        });
    }
});

export default router;
