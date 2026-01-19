import { useState, useEffect, useMemo } from 'react';
import PlantCard from '../components/PlantCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import { Plant } from '../types';
import { usePlants, usePlantSearch } from '../hooks/usePlants';

export default function PlantsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAyushSystems, setSelectedAyushSystems] = useState<string[]>([]);
  const [selectedDiseaseCategories, setSelectedDiseaseCategories] = useState<string[]>([]);
  const [selectedPartsUsed, setSelectedPartsUsed] = useState<string[]>([]);

  // Fetch all plants initially for filter options
  const { plants: allPlants, loading: loadingAll } = usePlants();
  
  // Use search when filters are applied
  const { plants: searchedPlants, loading: searching, search } = usePlantSearch();
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  // Determine which plants to show and loading state
  const plants = hasActiveFilters ? searchedPlants : allPlants;
  const loading = hasActiveFilters ? searching : loadingAll;

  // Apply search when filters change
  useEffect(() => {
    const hasFilters = 
      searchQuery.trim() !== '' ||
      selectedAyushSystems.length > 0 ||
      selectedDiseaseCategories.length > 0 ||
      selectedPartsUsed.length > 0;

    setHasActiveFilters(hasFilters);

    if (hasFilters) {
      const searchParams: any = {};
      if (searchQuery.trim()) searchParams.q = searchQuery.trim();
      if (selectedAyushSystems.length > 0) searchParams.ayushSystems = selectedAyushSystems;
      if (selectedDiseaseCategories.length > 0) searchParams.diseaseCategories = selectedDiseaseCategories;
      if (selectedPartsUsed.length > 0) searchParams.partsUsed = selectedPartsUsed;
      
      search(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedAyushSystems, selectedDiseaseCategories, selectedPartsUsed]);

  // Get unique values for filters from all plants
  const ayushSystems = useMemo(() => {
    const systems = new Set<string>();
    allPlants.forEach((plant) => plant.ayushSystems.forEach((s) => systems.add(s)));
    return Array.from(systems).sort();
  }, [allPlants]);

  const diseaseCategories = useMemo(() => {
    const categories = new Set<string>();
    allPlants.forEach((plant) => plant.diseaseCategories.forEach((c) => categories.add(c)));
    return Array.from(categories).sort();
  }, [allPlants]);

  const partsUsed = useMemo(() => {
    const parts = new Set<string>();
    allPlants.forEach((plant) => plant.partsUsed.forEach((p) => parts.add(p)));
    return Array.from(parts).sort();
  }, [allPlants]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedAyushSystems([]);
    setSelectedDiseaseCategories([]);
    setSelectedPartsUsed([]);
    setHasActiveFilters(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse" style={{ filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.8))' }}>📚</div>
          <div className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">Loading plants...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 particles-bg"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
          <h1 className="text-6xl font-bold text-white mb-4 font-['Cinzel']">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent neon-text">
              📚 Plant Compendium
            </span>
          </h1>
          <p className="text-xl text-blue-200">
            Explore <span className="text-purple-400 font-semibold">{allPlants.length} medicinal plants</span> from AYUSH traditions
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name or properties..."
          />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel
              ayushSystems={ayushSystems}
              selectedAyushSystems={selectedAyushSystems}
              onAyushSystemsChange={setSelectedAyushSystems}
              diseaseCategories={diseaseCategories}
              selectedDiseaseCategories={selectedDiseaseCategories}
              onDiseaseCategoriesChange={setSelectedDiseaseCategories}
              partsUsed={partsUsed}
              selectedPartsUsed={selectedPartsUsed}
              onPartsUsedChange={setSelectedPartsUsed}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Plants Grid */}
          <div className="lg:col-span-3">
            {/* Results count */}
            <div className="mb-4 text-emerald-200">
              Found {plants.length} plant{plants.length !== 1 ? 's' : ''}
            </div>

            {plants.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-2">No plants found</h3>
                <p className="text-emerald-200 mb-4">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plants.map((plant) => (
                  <PlantCard key={plant.id} plant={plant} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
