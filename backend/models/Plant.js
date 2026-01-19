import mongoose from "mongoose";

const plantSchema = new mongoose.Schema(
  {
    scientificName: {
      type: String,
      required: true,
      trim: true,
    },
    commonName: {
      type: String,
      required: true,
    },
    ayushSystem: {
      type: [String],
      enum: ["Ayurveda", "Yoga", "Unani", "Siddha", "Homeopathy"],
      required: true,
    },
    medicinalUses: [String],
    diseases: [String],
    plantPartsUsed: [String],
    dosage: String,
    precautions: String,
    habitat: String,
    region: String,
    images: [String],
    videos: [String],
    conservationStatus: String,
  },
  { timestamps: true },
);

export default mongoose.model("Plant", plantSchema);
