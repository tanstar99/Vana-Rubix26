import express from "express";
import { Pinecone } from "@pinecone-database/pinecone";
import Groq from "groq-sdk";
import { pipeline } from "@xenova/transformers";

const router = express.Router();

// --------------------
// Initialize clients
// --------------------

// Ensure env vars are loaded (index.js calls dotenv)
// We instantiate clients lazily or here if dependencies allows.
// Since modules are cached, this should be fine.

// Environment validation
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
    console.log("Loading embedding model...");
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
        // Try loading again if null
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

// POST /api/chat/ask
router.post("/ask", async (req, res) => {
    try {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ error: "Query is required" });
        }

        console.log("Received query:", query);

        // 1. Create embedding
        console.log("Generating embedding...");
        const queryEmbedding = await getEmbedding(query);

        // 2. Query Pinecone
        console.log("Querying Pinecone...");
        const queryResponse = await index.query({
            vector: queryEmbedding,
            topK: 3,
            includeMetadata: true,
        });

        if (!queryResponse.matches || queryResponse.matches.length === 0) {
            return res.json({
                answer: "I couldn't find any relevant information in the database.",
                sources: [],
            });
        }

        // 3. Build context
        const context = queryResponse.matches
            .map((m) => m.metadata?.text)
            .filter(Boolean)
            .join("\n\n");

        // 4. Groq prompt
        const messages = [
            {
                role: "system",
                content: "You are an ancient herbal sage with deep knowledge of medicinal plants. Speak calmly, wisely, and clearly. Strict Rules: Answer only what is directly asked. Do not add background, history, philosophy, or extra explanations unless explicitly requested. Use only the provided context. If the answer is not fully present in the context, say: 'This knowledge is not present in the given texts.' Do not hallucinate, infer, or invent facts. Keep responses concise and to the point (prefer 2–4 sentences unless a list is requested). If the user asks about dosage, medical treatment, sexual content, illegal use, or anything explicit or unsafe, do not answer directly. Instead:Gently warn the user that such guidance cannot be provided. Suggest consulting a qualified professional. Never provide medical prescriptions or guaranteed cures. Maintain the tone of a wise sage, but prioritize clarity, relevance, and restraint over storytelling."
            },
            {
                role: "user",
                content: `Context:\n${context}\n\nUser Question:\n${query}`
            }
        ];

        // 5. Generate answer
        console.log("Calling Groq...");
        let answerText = "";

        try {
            const chatCompletion = await groq.chat.completions.create({
                messages: messages,
                model: "llama-3.1-8b-instant",
                temperature: 0.5,
                max_tokens: 1024,
            });
            answerText = chatCompletion.choices[0]?.message?.content || "No content returned.";
        } catch (groqError) {
            console.error("Groq error:", groqError);
            answerText =
                "I found relevant information, but failed to generate an answer with Groq. \n\nRelated Context:\n" + context;
        }

        // 6. Send response
        res.json({
            answer: answerText,
            sources: queryResponse.matches.map(
                (m) => m.metadata?.source || "Unknown"
            ),
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
