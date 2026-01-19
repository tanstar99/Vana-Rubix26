import Plant from "../models/Plant.js";

// GET all plants
export const getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.status(200).json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET plant by ID
export const getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }
    res.status(200).json(plant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH + FILTER plants (Advanced)
export const searchPlants = async (req, res) => {
  try {
    const { q, disease, ayushSystem, part, region, theme } = req.query;

    let query = {};

    // Keyword search
    if (q) {
      query.$or = [
        { scientificName: { $regex: q, $options: "i" } },
        { commonName: { $regex: q, $options: "i" } },
        { medicinalUses: { $regex: q, $options: "i" } },
        { diseases: { $regex: q, $options: "i" } },
      ];
    }

    // Disease filter
    if (disease) {
      query.diseases = { $regex: disease, $options: "i" };
    }

    // AYUSH system filter
    if (ayushSystem) {
      query.ayushSystem = ayushSystem;
    }

    // Plant part filter
    if (part) {
      query.plantPartsUsed = { $regex: part, $options: "i" };
    }

    // Region / habitat filter
    if (region) {
      query.region = { $regex: region, $options: "i" };
    }

    // Health theme filter (optional)
    // Example themes mapping
    const themeMap = {
      immunity: ["Immunity booster", "Cold", "Fever", "Respiratory health"],
      digestion: ["Digestion", "Stomach", "Liver", "Constipation"],
      stress: ["Stress relief", "Anxiety", "Fatigue", "Mental health"],
    };

    if (theme && themeMap[theme]) {
      query.$or = [
        ...(query.$or || []),
        { medicinalUses: { $in: themeMap[theme] } },
        { diseases: { $in: themeMap[theme] } },
      ];
    }

    const plants = await Plant.find(query);
    res.status(200).json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// RECOMMEND PLANTS BASED ON SYMPTOMS / CONDITIONS
export const recommendPlants = async (req, res) => {
  try {
    let { symptoms } = req.query;

    if (!symptoms) {
      return res
        .status(400)
        .json({ message: "Please provide at least one symptom or condition" });
    }

    // Convert comma-separated string to array
    if (typeof symptoms === "string") {
      symptoms = symptoms.split(",").map((s) => s.trim());
    }

    // Build query: any medicinalUses OR diseases matches the symptom
    const regexSymptoms = symptoms.map((s) => new RegExp(s, "i"));

    const query = {
      $or: [
        { medicinalUses: { $in: regexSymptoms } },
        { diseases: { $in: regexSymptoms } },
      ],
    };

    const plants = await Plant.find(query);

    if (!plants.length) {
      return res
        .status(404)
        .json({ message: "No plants found for given symptoms" });
    }

    res.status(200).json({
      disclaimer:
        "This recommendation is for educational purposes only and not a medical diagnosis.",
      plants,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET PLANTS BY HEALTH THEME (Guided Tours)
export const getPlantsByTheme = async (req, res) => {
  try {
    const { theme } = req.params;

    if (!theme) {
      return res.status(400).json({ message: "Theme is required" });
    }

    const plants = await Plant.find({
      $or: [
        { theme: { $regex: theme, $options: "i" } },
        { themes: { $in: [new RegExp(theme, "i")] } },
      ],
    });

    if (!plants.length) {
      return res
        .status(404)
        .json({ message: "No plants found for this theme" });
    }

    res.status(200).json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
