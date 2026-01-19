// backend/seeds/seedTours.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import Plant from "../models/Plant.js";
import Tour from "../models/Tour.js";
import tours from "../data/tours.js";

dotenv.config();

const seedTours = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    const plants = await Plant.find();

    // Helper: get plants matching theme
    const getPlantsByTheme = (theme) =>
      plants
        .filter((p) => p.themes.includes(theme))
        .map((p, index) => ({
          plant: p._id,
          order: index + 1,
          note: `${p.commonName} is beneficial for ${theme} related conditions.`,
        }));

    await Tour.deleteMany();

    const tourDocs = tours.map((tour) => ({
      ...tour,
      plants: getPlantsByTheme(tour.theme),
      isPublished: true,
    }));

    await Tour.insertMany(tourDocs);

    console.log("✅ Tours seeded successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Tour seeding failed:", error);
    process.exit(1);
  }
};

seedTours();
