import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    theme: {
      type: String,
      required: true,
      // e.g. immunity, digestion, stress
    },

    ayushSystem: [
      {
        type: String,
        enum: ["Ayurveda", "Yoga", "Unani", "Siddha", "Homeopathy"],
      },
    ],

    plants: [
      {
        plant: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Plant",
          required: true,
        },
        order: {
          type: Number,
          required: true,
        },
        note: {
          type: String, // explanation for this plant in the tour
        },
      },
    ],

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Tour", tourSchema);
