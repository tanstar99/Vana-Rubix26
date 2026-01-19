const plants = [
  {
    // =========================
    // BASIC INFO
    // =========================
    scientificName: "Ocimum sanctum",
    commonName: "Tulsi",
    localNames: ["Holy Basil", "Krishna Tulsi"],

    // =========================
    // AYUSH SYSTEMS
    // =========================
    ayushSystems: ["Ayurveda"],

    // =========================
    // DESCRIPTIONS
    // =========================
    descriptionShort:
      "A sacred medicinal plant widely used in Ayurveda for immunity and respiratory health.",
    descriptionFull:
      "Tulsi (Ocimum sanctum) is one of the most important medicinal herbs in Ayurveda. It is known for its immunomodulatory, antioxidant, and antimicrobial properties. Tulsi is commonly used to treat respiratory disorders, fever, and infections and is considered a sacred plant in Indian tradition.",

    // =========================
    // TAGS & CATEGORIES
    // =========================
    tags: ["immunity", "respiratory", "herbal", "antioxidant"],
    diseaseCategories: ["Respiratory Disorders", "Infectious Diseases"],
    medicinalProperties: ["Immunomodulator", "Antioxidant", "Antimicrobial"],

    // =========================
    // MEDICINAL INFO
    // =========================
    medicinalUses: ["Immunity booster", "Respiratory health"],
    diseases: ["Cold", "Cough", "Fever"],
    plantPartsUsed: ["Leaves"],

    // =========================
    // THERAPEUTIC USES
    // =========================
    therapeuticUses: [
      {
        condition: "Common Cold",
        benefit: "Relieves cough, cold, and throat irritation",
      },
      {
        condition: "Low Immunity",
        benefit: "Enhances immune response",
      },
    ],

    // =========================
    // DOSAGE
    // =========================
    dosage: {
      form: "Fresh leaves / Decoction",
      amount: "5–10 leaves",
      frequency: "Once daily",
    },

    // =========================
    // PRECAUTIONS
    // =========================
    precautions: ["Avoid excessive use during pregnancy"],

    // =========================
    // CULTIVATION
    // =========================
    cultivation: {
      soil: "Well-drained loamy soil",
      water: "Moderate",
      climate: "Tropical and subtropical",
    },

    // =========================
    // HABITAT
    // =========================
    habitat: {
      region: "Tropical regions",
      origin: "India",
    },
    region: "India",

    // =========================
    // MEDIA
    // =========================
    media: {
      images: [],
      videos: [],
      audio: [],
      model3dUrl: "",
    },
    images: [],
    videos: [],

    // =========================
    // 3D GARDEN PLACEMENT
    // =========================
    gardenPlacement: {
      zone: "Immunity Zone",
      x: 0,
      y: 0,
      z: 0,
    },

    // =========================
    // CONSERVATION
    // =========================
    conservationStatus: "Least Concern",
  },

  {
    scientificName: "Withania somnifera",
    commonName: "Ashwagandha",
    localNames: ["Indian Ginseng", "Winter Cherry"],

    ayushSystems: ["Ayurveda"],

    descriptionShort:
      "A powerful adaptogenic herb used to reduce stress and improve vitality.",
    descriptionFull:
      "Ashwagandha (Withania somnifera) is a renowned Rasayana herb in Ayurveda. It is used to manage stress, anxiety, fatigue, and to improve strength and stamina. The roots are most commonly used for medicinal purposes.",

    tags: ["adaptogen", "stress", "energy", "rejuvenation"],
    diseaseCategories: ["Mental Health", "Fatigue"],
    medicinalProperties: ["Adaptogenic", "Rejuvenative"],

    medicinalUses: ["Stress relief", "Strength enhancer"],
    diseases: ["Stress", "Anxiety", "Fatigue"],
    plantPartsUsed: ["Roots"],

    therapeuticUses: [
      {
        condition: "Stress",
        benefit: "Reduces cortisol levels and anxiety",
      },
      {
        condition: "Fatigue",
        benefit: "Improves strength and stamina",
      },
    ],

    dosage: {
      form: "Powder / Capsules",
      amount: "300–600 mg",
      frequency: "Once or twice daily",
    },

    precautions: [
      "Avoid during pregnancy",
      "Consult physician if on medication",
    ],

    cultivation: {
      soil: "Sandy loam",
      water: "Low to moderate",
      climate: "Dry subtropical",
    },

    habitat: {
      region: "Dry regions",
      origin: "India",
    },
    region: "India",

    media: {
      images: [],
      videos: [],
      audio: [],
      model3dUrl: "",
    },
    images: [],
    videos: [],

    gardenPlacement: {
      zone: "Rejuvenation Zone",
      x: 1,
      y: 0,
      z: 0,
    },

    conservationStatus: "Least Concern",
  },

  {
    scientificName: "Azadirachta indica",
    commonName: "Neem",
    localNames: ["Margosa", "Indian Lilac"],

    ayushSystems: ["Ayurveda", "Unani"],

    descriptionShort:
      "A medicinal tree known for its blood-purifying and antimicrobial properties.",
    descriptionFull:
      "Neem (Azadirachta indica) is widely used in Ayurveda and Unani medicine for its antibacterial, antifungal, and detoxifying properties. Almost all parts of the plant are used for medicinal purposes, especially for skin and metabolic disorders.",

    tags: ["skin", "detox", "antibacterial", "blood-purifier"],
    diseaseCategories: ["Skin Disorders", "Metabolic Disorders"],
    medicinalProperties: ["Antibacterial", "Antifungal", "Detoxifying"],

    medicinalUses: ["Skin disorders", "Blood purification"],
    diseases: ["Acne", "Eczema", "Diabetes"],
    plantPartsUsed: ["Leaves", "Bark"],

    therapeuticUses: [
      {
        condition: "Skin Disorders",
        benefit: "Reduces inflammation and infections",
      },
      {
        condition: "Blood Impurities",
        benefit: "Helps detoxify blood",
      },
    ],

    dosage: {
      form: "Decoction / Tablets",
      amount: "As prescribed",
      frequency: "As advised",
    },

    precautions: [
      "Avoid excessive internal use",
      "Not recommended during pregnancy",
    ],

    cultivation: {
      soil: "Well-drained soil",
      water: "Low",
      climate: "Tropical",
    },

    habitat: {
      region: "Tropical and semi-tropical regions",
      origin: "India",
    },
    region: "India",

    media: {
      images: [],
      videos: [],
      audio: [],
      model3dUrl: "",
    },
    images: [],
    videos: [],

    gardenPlacement: {
      zone: "Skin Care Zone",
      x: 2,
      y: 0,
      z: 0,
    },

    conservationStatus: "Least Concern",
  },
];

export default plants;
