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

    // 🌱 Multimedia Learning Content
    images: [String], // Cloudinary image URLs
    videos: [String], // Cloudinary / YouTube URLs
    audios: [String], // Cloudinary audio URLs

    description: {
      type: String, // text explanation
    },

    conservationStatus: String,
    themes: [
      {
        type: String,
        enum: [
          "immunity",
          "digestion",
          "stress",
          "diabetes",
          "skin",
          "respiratory",
          "mental-health",
        ],
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Plant", plantSchema);
