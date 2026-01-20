import { useState, useEffect, useMemo } from 'react';
import PlantCard from '../components/PlantCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import { Plant } from '../types';
import { filterPlants } from '../utils/filterPlants';

export default function PlantsPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAyushSystems, setSelectedAyushSystems] = useState<string[]>([]);
  const [selectedDiseaseCategories, setSelectedDiseaseCategories] = useState<string[]>([]);
  const [selectedPartsUsed, setSelectedPartsUsed] = useState<string[]>([]);

  useEffect(() => {
    fetch('/plants.json')
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading plants:', err);
        setLoading(false);
      });
  }, []);

  // Get unique values for filters
  const ayushSystems = useMemo(() => {
    const systems = new Set<string>();
    plants.forEach((plant) => plant.ayushSystems.forEach((s) => systems.add(s)));
    return Array.from(systems).sort();
  }, [plants]);

  const diseaseCategories = useMemo(() => {
    const categories = new Set<string>();
    plants.forEach((plant) => plant.diseaseCategories.forEach((c) => categories.add(c)));
    return Array.from(categories).sort();
  }, [plants]);

  const partsUsed = useMemo(() => {
    const parts = new Set<string>();
    plants.forEach((plant) => plant.partsUsed.forEach((p) => parts.add(p)));
    return Array.from(parts).sort();
  }, [plants]);

  // Filter plants
  const filteredPlants = useMemo(() => {
    return filterPlants(plants, {
      searchQuery,
      ayushSystems: selectedAyushSystems,
      diseaseCategories: selectedDiseaseCategories,
      partsUsed: selectedPartsUsed,
    });
  }, [plants, searchQuery, selectedAyushSystems, selectedDiseaseCategories, selectedPartsUsed]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedAyushSystems([]);
    setSelectedDiseaseCategories([]);
    setSelectedPartsUsed([]);
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen bg-slate-950 bg-cover bg-center bg-fixed relative overflow-hidden"
        style={{ backgroundImage: "url('/images/hero.png')" }}
      >
        <div className="absolute inset-0 bg-black" style={{ opacity: 0.8 }} />
        <div className="min-h-screen flex items-center justify-center relative z-10">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-pulse" style={{ filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.8))' }}></div>
            <div className="text-2xl bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent font-semibold">Loading plants...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-slate-950 bg-cover bg-center bg-fixed pt-32 pb-16 px-6 relative overflow-hidden"
      style={{ backgroundImage: "url('/images/hero.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 mt-4" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
          <h1 className="text-6xl font-bold text-white mb-4 font-['Cinzel']">
            <span className="bg-gradient-to-r pl-1 from-emerald-400 via-lime-400 to-green-400 bg-clip-text text-transparent neon-text">
              Aushadhi Sangrah
            </span>
          </h1>
          <p className="text-xl pl-7 text-emerald-200">
            Explore <span className="text-lime-400 font-semibold">{plants.length} medicinal plants</span> from AYUSH traditions
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-16">
          <div className="w-full max-w-3xl">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by name or properties..."
            />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
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
          <div className="lg:col-span-4">
            {/* Results count */}

            {filteredPlants.length === 0 ? (
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
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPlants.map((plant) => (
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
