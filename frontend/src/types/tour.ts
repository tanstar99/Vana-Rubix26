export interface Tour {
  id: string;
  title: string;
  theme: string;
  description: string;
  coverImage: string;
  steps: {
    plantId: string;
    narrationText: string;
    order: number;
  }[];
}
