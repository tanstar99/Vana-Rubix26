import React, { useState, useEffect, useRef } from "react";
import cultivationData from "../data/plantCultivationMap.json";

interface CultivationZone {
  label: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Add custom animation styles
const animationStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.4s ease-out;
  }
`;

// Plant region definitions for SimpleMaps dynamic rendering
const PLANT_REGIONS: Record<
  string,
  {
    states: string[];
    name: string;
    color: string;
    description: string;
    url: string;
  }
> = {
  giloy: {
    states: ["INBR", "INCT", "INMH", "INAP"],
    name: "Giloy",
    color: "#A8D8EA",
    description:
      "Giloy is widely cultivated in central and eastern India and is a key Ayurvedic herb used for immunity enhancement, fever management, and detoxification.",
    url: "https://www.youtube.com/watch?v=1nR9rSqnOEo",
  },

  "aloe-vera": {
    states: ["INRJ", "INGJ", "INTG"],
    name: "Aloe Vera",
    color: "#FCBAD3",
    description:
      "Aloe Vera thrives in semi-arid regions and is used in Ayurveda and Siddha for skin care, wound healing, digestion, and metabolic balance.",
    url: "https://www.youtube.com/watch?v=F06wSDOyIqM",
  },

  tulsi: {
    states: ["INUP", "INMH", "INTN", "INKA"],
    name: "Tulsi",
    color: "#FF6B9D",
    description:
      "Tulsi is traditionally grown across plains and southern regions and is revered in Ayurveda for respiratory health, immunity support, and stress relief.",
    url: "https://www.youtube.com/watch?v=Ln3W9k9GVIE",
  },

  ashwagandha: {
    states: ["INRJ", "INMP", "INTG"],
    name: "Ashwagandha",
    color: "#4ECDC4",
    description:
      "Ashwagandha is mainly cultivated in dry regions and is a vital Ayurvedic herb used for stress management, strength enhancement, and rejuvenation.",
    url: "https://www.youtube.com/watch?v=vqzNWVVo5Is",
  },

  neem: {
    states: ["INPB", "INMP", "INKA", "INKL"],
    name: "Neem",
    color: "#FFE66D",
    description:
      "Neem grows well in tropical and subtropical climates and is extensively used in Ayurveda for detoxification, skin disorders, and antimicrobial care.",
    url: "https://www.youtube.com/watch?v=DsoPxPqmCQg",
  },

  turmeric: {
    states: ["INTG", "INTN", "INKL", "INAS"],
    name: "Turmeric",
    color: "#FF8C42",
    description:
      "Turmeric is cultivated in humid and tropical regions and is a cornerstone of Ayurveda for inflammation control, immunity support, and digestive health.",
    url: "https://www.youtube.com/watch?v=UaooFKFEOcw&t=165s",
  },

  brahmi: {
    states: ["INWB", "INAP", "INTN", "INKL"],
    name: "Brahmi",
    color: "#95E1D3",
    description:
      "Brahmi flourishes in wetland regions and is used in Ayurveda to enhance memory, cognitive function, and nervous system balance.",
    url: "https://www.youtube.com/watch?v=McaQWb6AZg4",
  },

  amla: {
    states: ["INUP", "INMP", "INMH", "INKA"],
    name: "Amla",
    color: "#F38181",
    description:
      "Amla is cultivated across plains and plateaus and is a powerful Ayurvedic fruit used for immunity enhancement, rejuvenation, and digestion.",
    url: "https://www.youtube.com/watch?v=MpYt0Dw61Ak",
  },

  ginger: {
    states: ["INKL", "INTN", "INKA", "INAS"],
    name: "Ginger",
    color: "#AA96DA",
    description:
      "Ginger grows in warm and humid regions and is widely used in Ayurveda and Siddha for digestion, inflammation control, and respiratory wellness.",
    url: "https://www.youtube.com/watch?v=wYgPfUIg9rM",
  },
};

export const PlantCultivationMap: React.FC = () => {
  const [selectedPlants, setSelectedPlants] = useState<string[]>([]);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [isLoadingRegions, setIsLoadingRegions] = useState<boolean>(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Inject custom animation styles
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Load SimpleMaps scripts on component mount
  useEffect(() => {
    const loadSimpleMaps = async () => {
      try {
        // Load mapdata.js
        const mapDataScript = document.createElement("script");
        mapDataScript.src = "/map/mapdata.js";
        mapDataScript.async = true;
        document.head.appendChild(mapDataScript);

        // After mapdata loads, load countrymap.js
        mapDataScript.onload = () => {
          const countryMapScript = document.createElement("script");
          countryMapScript.src = "/map/countrymap.js";
          countryMapScript.async = true;
          document.head.appendChild(countryMapScript);

          countryMapScript.onload = () => {
            // Initialize map with simplemaps
            if (
              window.simplemaps_countrymap &&
              typeof window.simplemaps_countrymap.load === "function"
            ) {
              window.simplemaps_countrymap.load();
              setMapLoaded(true);
            }
          };
        };
      } catch (error) {
        console.error("Error loading SimpleMaps:", error);
      }
    };

    loadSimpleMaps();

    return () => {
      // Cleanup: Remove scripts when component unmounts
      const scripts = document.querySelectorAll(
        'script[src="/map/mapdata.js"], script[src="/map/countrymap.js"]',
      );
      scripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  // Handle plant selection changes
  useEffect(() => {
    if (!mapLoaded) {
      return;
    }

    // Show loading overlay while updating regions
    setIsLoadingRegions(true);

    // Update map regions based on selected plants
    // Use a small delay to ensure the loader is visible before the update
    const timeoutId = setTimeout(() => {
      updateMapRegions(selectedPlants);
      setIsLoadingRegions(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedPlants, mapLoaded]);

  /**
   * Dynamically updates SimpleMaps regions based on selected plants
   *
   * Algorithm:
   * 1. Get the global simplemaps_countrymap_mapdata.regions object
   * 2. Clear all existing regions
   * 3. For each selected plant, add its region object with numeric key
   * 4. Include all fields: states, name, color, description, AND url for educational resources
   * 5. Call load() to repaint the map
   */
  const updateMapRegions = (plantIds: string[]) => {
    if (!window.simplemaps_countrymap) {
      console.warn("SimpleMaps not loaded yet");
      return;
    }

    try {
      // Access the global mapdata object
      const mapdata = (window as any).simplemaps_countrymap_mapdata;
      if (!mapdata || !mapdata.regions) {
        console.warn("SimpleMaps mapdata or regions not accessible");
        return;
      }

      // Clear existing regions
      mapdata.regions = {};

      // Add region for each selected plant with numeric keys starting from "0"
      plantIds.forEach((plantId, index) => {
        const plantRegion = PLANT_REGIONS[plantId];
        if (plantRegion) {
          // Use numeric key (not string) - SimpleMaps expects this
          // Include all fields: states, name, color, description, AND url for educational resources
          mapdata.regions[index] = {
            states: plantRegion.states,
            name: plantRegion.name,
            color: plantRegion.color,
            description: plantRegion.description,
            url: plantRegion.url,
          };
        }
      });

      console.log("Updated regions:", mapdata.regions);

      // Reload the map completely to render updated regions
      if (
        window.simplemaps_countrymap.load &&
        typeof window.simplemaps_countrymap.load === "function"
      ) {
        window.simplemaps_countrymap.load();
      }
    } catch (error) {
      console.error("Error updating map regions:", error);
    }
  };

  const togglePlantSelection = (plantId: string) => {
    setSelectedPlants((prev) =>
      prev.includes(plantId)
        ? prev.filter((id) => id !== plantId)
        : [...prev, plantId],
    );
  };

  const plantColors: Record<string, string> = {
    tulsi: "#FF6B9D",
    ashwagandha: "#4ECDC4",
    neem: "#FFE66D",
    turmeric: "#FF8C42",
    brahmi: "#95E1D3",
    amla: "#F38181",
    ginger: "#AA96DA",
    "aloe-vera": "#FCBAD3",
    giloy: "#A8D8EA",
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white flex flex-col pt-20">
      {/* Header */}
      <div className="flex flex-1 overflow-hidden mt-10">
        {/* Sidebar - Plant Selection */}
        <div className="w-64 bg-slate-900 border-r border-emerald-800 p-6 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4 text-emerald-300">
            Plants
          </h2>
          <div className="space-y-2">
            {cultivationData.map((plant) => (
              <button
                key={plant.plantId}
                onClick={() => togglePlantSelection(plant.plantId)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all border-2 ${
                  selectedPlants.includes(plant.plantId)
                    ? `bg-${plantColors[plant.plantId]}-900 border-${plantColors[plant.plantId]}-400 text-white`
                    : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600"
                }`}
                style={{
                  backgroundColor: selectedPlants.includes(plant.plantId)
                    ? plantColors[plant.plantId] + "20"
                    : undefined,
                  borderColor: selectedPlants.includes(plant.plantId)
                    ? plantColors[plant.plantId]
                    : undefined,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: plantColors[plant.plantId],
                    }}
                  />
                  <span className="font-medium">{plant.plantName}</span>
                  <span className="text-xs ml-auto opacity-60">
                    {plant.zones.length}
                  </span>
                </div>
              </button>
            ))}
          </div>
          {selectedPlants.length > 0 && (
            <button
              onClick={() => setSelectedPlants([])}
              className="w-full mt-6 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-200 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Map Area - SimpleMaps Container */}
        <div className="flex-1 bg-slate-950 p-4 overflow-hidden flex flex-col items-center justify-center relative">
          {/* SimpleMaps Container */}
          <div
            id="map"
            ref={mapContainerRef}
            className="w-full h-full"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />

          {/* Loading/Empty State */}
          {!mapLoaded && (
            <div className="text-center text-slate-400">
              <div className="text-lg font-light">Loading map...</div>
              <div className="text-sm opacity-60 mt-2">
                Please wait while we initialize the India map
              </div>
            </div>
          )}

          {/* Smooth Loading Overlay - Shading Cultivation Regions */}
          {isLoadingRegions && mapLoaded && (
            <div
              className={`absolute inset-0 flex items-center justify-center pointer-events-auto z-20 transition-all duration-500 ${isLoadingRegions ? "opacity-100" : "opacity-0"}`}
            >
              {/* Soft gradient background */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 opacity-60"></div>

              {/* Animated border glow effect */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-pulse"></div>
              </div>

              {/* Loading card */}
              <div className="relative bg-slate-900 bg-opacity-80 backdrop-blur-md px-10 py-8 rounded-2xl shadow-2xl text-center border border-emerald-500 border-opacity-60 max-w-sm mx-4 animate-fadeIn">
                <div className="flex justify-center mb-6">
                  <div className="relative w-16 h-16">
                    {/* Outer rotating ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-400 border-r-emerald-400 animate-spin"></div>
                    {/* Inner pulsing circle */}
                    <div className="absolute inset-2 rounded-full border border-emerald-500 border-opacity-30 animate-pulse"></div>
                    {/* Center dot */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <p className="text-emerald-300 font-semibold text-lg mb-2 tracking-wide">
                  Shading cultivation regions...
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Updating educational data on your map
                </p>

                {/* Subtle progress bar */}
                <div className="mt-6 h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Plant Count */}
      {selectedPlants.length > 0 && (
        <div className="bg-slate-900 border-t border-emerald-800 px-8 py-4 text-sm text-slate-400">
          Viewing{" "}
          <span className="text-emerald-300 font-semibold">
            {selectedPlants.length}
          </span>{" "}
          plant(s) cultivation regions
        </div>
      )}
    </div>
  );
};

export default PlantCultivationMap;

// Type declarations for SimpleMaps global object
declare global {
  interface Window {
    simplemaps_countrymap: {
      load: () => void;
      refresh: () => void;
      mapdata?: {
        main_settings?: Record<string, unknown>;
        state_specific?: Record<string, unknown>;
        [key: string]: unknown;
      };
      mapinfo?: Record<string, unknown>;
      states?: Record<
        string,
        {
          state_color?: string;
          [key: string]: unknown;
        }
      >;
      [key: string]: unknown;
    };
    simplemaps_countrymap_mapdata?: {
      main_settings?: Record<string, unknown>;
      state_specific?: Record<string, unknown>;
      regions?: Record<string | number, unknown>;
      [key: string]: unknown;
    };
  }
}