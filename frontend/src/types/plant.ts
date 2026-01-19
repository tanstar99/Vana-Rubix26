export interface Plant {
  id: string;
  scientificName: string;
  commonName: string;
  localNames: string[];
  ayushSystems: string[];
  descriptionShort: string;
  descriptionFull: string;
  tags: string[];
  diseaseCategories: string[];
  partsUsed: string[];
  medicinalProperties: string[];
  therapeuticUses: {
    condition: string;
    benefit: string;
  }[];
  dosage: {
    form: string;
    amount: string;
    frequency: string;
  };
  precautions: string[];
  cultivation: {
    soil: string;
    water: string;
    climate: string;
  };
  habitat: {
    region: string;
    origin: string;
  };
  media: {
    images: string[];
    videos: string[];
    audio: string[];
    model3dUrl: string | null;
  };
  gardenPlacement: {
    zone: string;
    x: number;
    y: number;
    z: number;
  };
}
