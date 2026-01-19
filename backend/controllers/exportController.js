import Plant from "../models/Plant.js";
import { Parser } from "json2csv";

export const exportPlantsCSV = async (req, res) => {
  try {
    const plants = await Plant.find().lean();

    if (!plants.length) {
      return res.status(404).json({ message: "No plant data found" });
    }

    // Fields to export (research-friendly)
    const fields = [
      "scientificName",
      "commonName",
      "ayushSystem",
      "medicinalUses",
      "diseases",
      "plantPartsUsed",
      "dosage",
      "precautions",
      "habitat",
      "region",
      "conservationStatus",
    ];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(plants);

    res.header("Content-Type", "text/csv");
    res.attachment("ayush_plants_dataset.csv");
    return res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
