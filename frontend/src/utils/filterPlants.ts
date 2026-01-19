import { Plant } from '../types';

export interface FilterOptions {
  searchQuery: string;
  ayushSystems: string[];
  diseaseCategories: string[];
  partsUsed: string[];
  region?: string;
}

export function filterPlants(plants: Plant[], filters: FilterOptions): Plant[] {
  return plants.filter((plant) => {
    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesName = 
        plant.commonName.toLowerCase().includes(query) ||
        plant.scientificName.toLowerCase().includes(query) ||
        plant.localNames.some(name => name.toLowerCase().includes(query));
      
      if (!matchesName) return false;
    }

    // AYUSH systems filter
    if (filters.ayushSystems.length > 0) {
      const hasSystem = filters.ayushSystems.some(system =>
        plant.ayushSystems.includes(system)
      );
      if (!hasSystem) return false;
    }

    // Disease categories filter
    if (filters.diseaseCategories.length > 0) {
      const hasCategory = filters.diseaseCategories.some(category =>
        plant.diseaseCategories.includes(category)
      );
      if (!hasCategory) return false;
    }

    // Parts used filter
    if (filters.partsUsed.length > 0) {
      const hasPart = filters.partsUsed.some(part =>
        plant.partsUsed.includes(part)
      );
      if (!hasPart) return false;
    }

    // Region filter
    if (filters.region && filters.region !== '') {
      if (!plant.habitat.region.toLowerCase().includes(filters.region.toLowerCase())) {
        return false;
      }
    }

    return true;
  });
}
