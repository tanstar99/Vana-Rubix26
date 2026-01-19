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


// SEARCH + FILTER plants
export const searchPlants = async (req, res) => {
  try {
    const { q, disease, ayushSystem, part } = req.query;

    let query = {};

    if (q) {
      query.$or = [
        { scientificName: { $regex: q, $options: "i" } },
        { commonName: { $regex: q, $options: "i" } },
        { medicinalUses: { $regex: q, $options: "i" } },
        { diseases: { $regex: q, $options: "i" } }
      ];
    }

    if (disease) {
      query.diseases = { $regex: disease, $options: "i" };
    }

    if (ayushSystem) {
      query.ayushSystem = ayushSystem;
    }

    if (part) {
      query.plantPartsUsed = { $regex: part, $options: "i" };
    }

    const plants = await Plant.find(query);
    res.status(200).json(plants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
