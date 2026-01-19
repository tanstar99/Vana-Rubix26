import Tour from "../models/Tour.js";

// GET all guided tours
export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find({ isPublished: true })
      .select("title description theme ayushSystem")
      .sort({ createdAt: -1 });

    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single tour with ordered plants
export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id).populate({
      path: "plants.plant",
      select:
        "scientificName commonName medicinalUses diseases images ayushSystem",
    });

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    // sort plants by order
    tour.plants.sort((a, b) => a.order - b.order);

    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET tours by theme (immunity, digestion, etc.)
export const getToursByTheme = async (req, res) => {
  try {
    const { theme } = req.params;

    const tours = await Tour.find({
      theme,
      isPublished: true,
    });

    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN: Create new tour
export const createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json(tour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
