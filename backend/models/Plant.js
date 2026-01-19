import mongoose from "mongoose";

const plantSchema = new mongoose.Schema(
  {
    // Basic Info
    scientificName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    commonName: {
      type: String,
      required: true,
      index: true,
    },
    localNames: {
      type: [String],
      default: [],
    },
    
    // AYUSH Systems
    ayushSystems: {
      type: [String],
      enum: ["Ayurveda", "Yoga", "Unani", "Siddha", "Homeopathy"],
      required: true,
      default: [],
    },
    
    // Descriptions
    descriptionShort: String,
    descriptionFull: String,
    
    // Tags and Categories
    tags: [String],
    diseaseCategories: [String],
    medicinalProperties: [String],
    
    // Medicinal Info
    medicinalUses: [String],
    diseases: [String],
    plantPartsUsed: [String],
    
    // Therapeutic Uses
    therapeuticUses: [{
      condition: String,
      benefit: String,
    }],
    
    // Dosage (object format)
    dosage: {
      form: String,
      amount: String,
      frequency: String,
    },
    
    // Precautions
    precautions: [String],
    
    // Cultivation
    cultivation: {
      soil: String,
      water: String,
      climate: String,
    },
    
    // Habitat
    habitat: {
      region: String,
      origin: String,
    },
    region: String, // Keep for backward compatibility
    
    // Media
    media: {
      images: [String],
      videos: [String],
      audio: [String],
      model3dUrl: String,
    },
    images: [String], // Keep for backward compatibility
    videos: [String], // Keep for backward compatibility
    
    // 3D Garden Placement
    gardenPlacement: {
      zone: String,
      x: Number,
      y: Number,
      z: Number,
    },
    
    // Conservation
    conservationStatus: String,
  },
  { 
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    },
    toObject: {
      transform: function(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  },
);

// Text search index
plantSchema.index({
  scientificName: "text",
  commonName: "text",
  medicinalUses: "text",
  diseases: "text",
  descriptionFull: "text",
  tags: "text",
});

export default mongoose.model("Plant", plantSchema);
