import Plant from "../models/Plant.js";

// Helper function to transform plant data
const transformPlant = (plant) => {
  const plantObj = plant.toObject ? plant.toObject() : plant;
  return {
    ...plantObj,
    id: plantObj._id?.toString() || plantObj.id,
    // Ensure backward compatibility
    ayushSystems: plantObj.ayushSystems || plantObj.ayushSystem || [],
    // Ensure arrays exist
    localNames: plantObj.localNames || [],
    tags: plantObj.tags || [],
    diseaseCategories: plantObj.diseaseCategories || plantObj.diseases || [],
    medicinalProperties: plantObj.medicinalProperties || [],
    therapeuticUses: plantObj.therapeuticUses || [],
    precautions: Array.isArray(plantObj.precautions) 
      ? plantObj.precautions 
      : plantObj.precautions 
        ? [plantObj.precautions] 
        : [],
    // Ensure objects exist
    dosage: plantObj.dosage && typeof plantObj.dosage === 'object'
      ? plantObj.dosage
      : { form: '', amount: plantObj.dosage || '', frequency: '' },
    cultivation: plantObj.cultivation || {
      soil: '',
      water: '',
      climate: '',
    },
    habitat: plantObj.habitat && typeof plantObj.habitat === 'object'
      ? plantObj.habitat
      : { region: plantObj.habitat || plantObj.region || '', origin: '' },
    media: plantObj.media || {
      images: plantObj.images || [],
      videos: plantObj.videos || [],
      audio: [],
      model3dUrl: null,
    },
    gardenPlacement: plantObj.gardenPlacement || {
      zone: 'center',
      x: 0,
      y: 0,
      z: 0,
    },
  };
};

// GET all plants
export const getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    const transformedPlants = plants.map(transformPlant);
    res.status(200).json(transformedPlants);
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
    const transformedPlant = transformPlant(plant);
    res.status(200).json(transformedPlant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// SEARCH + FILTER plants (Enhanced)
export const searchPlants = async (req, res) => {
  try {
    const { 
      q, // General search query
      disease, // Specific disease filter
      diseaseCategories, // Array of disease categories
      ayushSystem, // Single AYUSH system
      ayushSystems, // Array of AYUSH systems
      part, // Plant part used
      partsUsed, // Array of parts used
      region, // Region filter
      medicinalUse, // Medicinal use filter
    } = req.query;

    let query = {};
    const andConditions = [];
    const textSearchOrConditions = [];

    // General text search
    if (q) {
      textSearchOrConditions.push(
        { scientificName: { $regex: q, $options: "i" } },
        { commonName: { $regex: q, $options: "i" } },
        { localNames: { $regex: q, $options: "i" } },
        { medicinalUses: { $regex: q, $options: "i" } },
        { diseases: { $regex: q, $options: "i" } },
        { diseaseCategories: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
        { descriptionFull: { $regex: q, $options: "i" } },
        { descriptionShort: { $regex: q, $options: "i" } }
      );
    }

    // Disease filters
    if (disease) {
      andConditions.push({
        $or: [
          { diseases: { $regex: disease, $options: "i" } },
          { diseaseCategories: { $regex: disease, $options: "i" } },
        ]
      });
    }

    if (diseaseCategories) {
      const categories = Array.isArray(diseaseCategories) 
        ? diseaseCategories 
        : [diseaseCategories];
      andConditions.push({
        $or: [
          { diseaseCategories: { $in: categories } },
          { diseases: { $in: categories } },
        ]
      });
    }

    // AYUSH system filters
    if (ayushSystem) {
      andConditions.push({
        $or: [
          { ayushSystems: ayushSystem },
          { ayushSystem: ayushSystem }, // Backward compatibility
        ]
      });
    }

    if (ayushSystems) {
      const systems = Array.isArray(ayushSystems) 
        ? ayushSystems 
        : [ayushSystems];
      andConditions.push({
        $or: [
          { ayushSystems: { $in: systems } },
          { ayushSystem: { $in: systems } }, // Backward compatibility
        ]
      });
    }

    // Plant parts filters
    if (part) {
      query.plantPartsUsed = { $regex: part, $options: "i" };
    }

    if (partsUsed) {
      const parts = Array.isArray(partsUsed) ? partsUsed : [partsUsed];
      query.plantPartsUsed = { $in: parts };
    }

    // Region filter
    if (region) {
      andConditions.push({
        $or: [
          { region: { $regex: region, $options: "i" } },
          { "habitat.region": { $regex: region, $options: "i" } },
        ]
      });
    }

    // Medicinal use filter
    if (medicinalUse) {
      query.medicinalUses = { $regex: medicinalUse, $options: "i" };
    }

    // Combine text search with other filters
    if (textSearchOrConditions.length > 0) {
      andConditions.push({ $or: textSearchOrConditions });
    }

    // Apply all AND conditions
    if (andConditions.length > 0) {
      query.$and = andConditions;
    }

    const plants = await Plant.find(query);
    const transformedPlants = plants.map(transformPlant);
    res.status(200).json(transformedPlants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
