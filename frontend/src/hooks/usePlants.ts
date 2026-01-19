/**
 * React hooks for plant data fetching
 */
import { useState, useEffect, useCallback } from 'react';
import { plantApi, ApiError } from '../services/api';
import { Plant } from '../types';

export interface UsePlantsResult {
  plants: Plant[];
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch all plants
 */
export function usePlants(): UsePlantsResult {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchPlants = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await plantApi.getAll();
      setPlants(data);
    } catch (err) {
      setError(err as ApiError);
      console.error('Error fetching plants:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlants();
  }, [fetchPlants]);

  return {
    plants,
    loading,
    error,
    refetch: fetchPlants,
  };
}

export interface UsePlantResult {
  plant: Plant | null;
  loading: boolean;
  error: ApiError | null;
  refetch: () => Promise<void>;
}

/**
 * Hook to fetch a single plant by ID
 */
export function usePlant(id: string | undefined): UsePlantResult {
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchPlant = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await plantApi.getById(id);
      setPlant(data);
    } catch (err) {
      setError(err as ApiError);
      setPlant(null);
      console.error('Error fetching plant:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPlant();
  }, [fetchPlant]);

  return {
    plant,
    loading,
    error,
    refetch: fetchPlant,
  };
}

export interface UsePlantSearchParams {
  q?: string;
  disease?: string;
  diseaseCategories?: string[];
  ayushSystem?: string;
  ayushSystems?: string[];
  part?: string;
  partsUsed?: string[];
  region?: string;
  medicinalUse?: string;
}

export interface UsePlantSearchResult {
  plants: Plant[];
  loading: boolean;
  error: ApiError | null;
  search: (params: UsePlantSearchParams) => Promise<void>;
}

/**
 * Hook for searching/filtering plants
 */
export function usePlantSearch(): UsePlantSearchResult {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const search = useCallback(async (params: UsePlantSearchParams) => {
    try {
      setLoading(true);
      setError(null);
      const data = await plantApi.search(params);
      setPlants(data);
    } catch (err) {
      setError(err as ApiError);
      console.error('Error searching plants:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    plants,
    loading,
    error,
    search,
  };
}
