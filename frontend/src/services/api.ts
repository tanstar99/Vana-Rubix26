/**
 * API Service Layer
 * Centralized API calls for the frontend
 */

import type { Plant } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export interface ApiError {
  message: string;
  status?: number;
}

/**
 * Generic API fetch function with error handling
 */
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw {
        message: errorData.message || `HTTP error! status: ${response.status}`,
        status: response.status,
      } as ApiError;
    }

    return await response.json();
  } catch (error) {
    if (error && typeof error === 'object' && 'message' in error) {
      throw error;
    }
    throw {
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    } as ApiError;
  }
}

/**
 * Plant API endpoints
 */
export const plantApi = {
  /**
   * Get all plants
   */
  getAll: async () => {
    return apiFetch<Plant[]>('/plants');
  },

  /**
   * Get a single plant by ID
   */
  getById: async (id: string) => {
    return apiFetch<Plant>(`/plants/${id}`);
  },

  /**
   * Search and filter plants
   */
  search: async (params: {
    q?: string;
    disease?: string;
    diseaseCategories?: string[];
    ayushSystem?: string;
    ayushSystems?: string[];
    part?: string;
    partsUsed?: string[];
    region?: string;
    medicinalUse?: string;
  }) => {
    const searchParams = new URLSearchParams();
    
    if (params.q) searchParams.append('q', params.q);
    if (params.disease) searchParams.append('disease', params.disease);
    if (params.ayushSystem) searchParams.append('ayushSystem', params.ayushSystem);
    if (params.part) searchParams.append('part', params.part);
    if (params.region) searchParams.append('region', params.region);
    if (params.medicinalUse) searchParams.append('medicinalUse', params.medicinalUse);
    
    // Handle arrays
    if (params.diseaseCategories) {
      params.diseaseCategories.forEach(cat => searchParams.append('diseaseCategories', cat));
    }
    if (params.ayushSystems) {
      params.ayushSystems.forEach(system => searchParams.append('ayushSystems', system));
    }
    if (params.partsUsed) {
      params.partsUsed.forEach(part => searchParams.append('partsUsed', part));
    }

    const queryString = searchParams.toString();
    return apiFetch<Plant[]>(`/plants/search${queryString ? `?${queryString}` : ''}`);
  },
};
