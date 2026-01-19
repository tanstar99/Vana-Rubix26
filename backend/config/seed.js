import mongoose from "mongoose";
import dotenv from "dotenv";
import Plant from "../models/Plant.js";
import plants from "../data/plants.js";

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Plant.deleteMany();
    await Plant.insertMany(plants);
    console.log("Plant data seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
