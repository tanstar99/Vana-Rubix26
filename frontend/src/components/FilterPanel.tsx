import { useState } from 'react';

interface FilterPanelProps {
  ayushSystems: string[];
  selectedAyushSystems: string[];
  onAyushSystemsChange: (systems: string[]) => void;
  
  diseaseCategories: string[];
  selectedDiseaseCategories: string[];
  onDiseaseCategoriesChange: (categories: string[]) => void;
  
  partsUsed: string[];
  selectedPartsUsed: string[];
  onPartsUsedChange: (parts: string[]) => void;
  
  onClearFilters: () => void;
}

export default function FilterPanel({
  ayushSystems,
  selectedAyushSystems,
  onAyushSystemsChange,
  diseaseCategories,
  selectedDiseaseCategories,
  onDiseaseCategoriesChange,
  partsUsed,
  selectedPartsUsed,
  onPartsUsedChange,
  onClearFilters,
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAyushSystem = (system: string) => {
    if (selectedAyushSystems.includes(system)) {
      onAyushSystemsChange(selectedAyushSystems.filter((s) => s !== system));
    } else {
      onAyushSystemsChange([...selectedAyushSystems, system]);
    }
  };

  const toggleDiseaseCategory = (category: string) => {
    if (selectedDiseaseCategories.includes(category)) {
      onDiseaseCategoriesChange(selectedDiseaseCategories.filter((c) => c !== category));
    } else {
      onDiseaseCategoriesChange([...selectedDiseaseCategories, category]);
    }
  };

  const togglePartUsed = (part: string) => {
    if (selectedPartsUsed.includes(part)) {
      onPartsUsedChange(selectedPartsUsed.filter((p) => p !== part));
    } else {
      onPartsUsedChange([...selectedPartsUsed, part]);
    }
  };

  const hasActiveFilters = 
    selectedAyushSystems.length > 0 ||
    selectedDiseaseCategories.length > 0 ||
    selectedPartsUsed.length > 0;

  return (
    <div className="bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-emerald-500/30 p-5 sticky top-24">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
          <span className="text-xl">🔍</span> Filters
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden text-white/80 hover:text-white"
        >
          {isExpanded ? '▲' : '▼'}
        </button>
      </div>

      <div className={`space-y-6 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        {/* AYUSH Systems */}
        <div>
          <h4 className="text-sm font-semibold text-emerald-300 mb-3">AYUSH Systems</h4>
          <div className="space-y-2">
            {ayushSystems.map((system) => (
              <label key={system} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedAyushSystems.includes(system)}
                  onChange={() => toggleAyushSystem(system)}
                  className="w-4 h-4 rounded border-white/30 bg-white/10 text-emerald-500 focus:ring-emerald-400"
                />
                <span className="text-white/80 group-hover:text-white transition-colors">
                  {system}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Disease Categories */}
        <div>
          <h4 className="text-sm font-semibold text-emerald-300 mb-3">Health Concerns</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {diseaseCategories.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedDiseaseCategories.includes(category)}
                  onChange={() => toggleDiseaseCategory(category)}
                  className="w-4 h-4 rounded border-white/30 bg-white/10 text-emerald-500 focus:ring-emerald-400"
                />
                <span className="text-white/80 group-hover:text-white transition-colors capitalize">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Parts Used */}
        <div>
          <h4 className="text-sm font-semibold text-emerald-300 mb-3">Plant Parts</h4>
          <div className="space-y-2">
            {partsUsed.map((part) => (
              <label key={part} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedPartsUsed.includes(part)}
                  onChange={() => togglePartUsed(part)}
                  className="w-4 h-4 rounded border-white/30 bg-white/10 text-emerald-500 focus:ring-emerald-400"
                />
                <span className="text-white/80 group-hover:text-white transition-colors capitalize">
                  {part}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="w-full py-2 px-4 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg border border-red-500/30 transition-all"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );
}
