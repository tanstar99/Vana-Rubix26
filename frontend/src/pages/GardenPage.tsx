import { useState } from 'react';
import GardenScene from '../three/GardenScene';
import PlantModal from '../components/PlantModal';
import { usePlants } from '../hooks/usePlants';

export default function GardenPage() {
  const { plants, loading } = usePlants();
  const [selectedPlant, setSelectedPlant] = useState<typeof plants[0] | null>(null);

  const handlePlantClick = (plant: typeof plants[0]) => {
    setSelectedPlant(plant);
  };

  const handleCloseModal = () => {
    setSelectedPlant(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse" style={{ filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.8))' }}>🌿</div>
          <div className="text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">Loading garden...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 particles-bg"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
          <h1 className="text-6xl font-bold text-white mb-4 font-['Cinzel']">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent neon-text">
              🏛️ Virtual Garden
            </span>
          </h1>
          <p className="text-xl text-blue-200 mb-6">
            Click on any plant to learn more about its <span className="text-purple-400 font-semibold">medicinal properties</span>
          </p>
          
          {/* Instructions */}
          <div className="bg-slate-900/50 backdrop-blur-2xl rounded-2xl p-5 border border-blue-500/30 max-w-2xl mx-auto shadow-lg shadow-blue-500/10" style={{ animation: 'scaleIn 0.8s ease-out 0.3s both' }}>
            <p className="text-blue-100 text-sm">
              <strong className="text-purple-400">Controls:</strong> <span className="text-blue-300">Click and drag to rotate</span> • <span className="text-purple-300">Scroll to zoom</span> • <span className="text-pink-300">Click plants to view details</span>
            </p>
          </div>
        </div>

        {/* 3D Garden Scene */}
        <GardenScene plants={plants} onPlantClick={handlePlantClick} />

        {/* Plant List Below */}
        <div className="mt-12" style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}>
          <h2 className="text-3xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Plants in this Garden
            </span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {plants.map((plant, index) => (
              <button
                key={plant.id}
                onClick={() => handlePlantClick(plant)}
                className="group bg-slate-900/50 backdrop-blur-2xl rounded-2xl p-5 border border-blue-500/30 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/30 text-left"
                style={{ animation: `scaleIn 0.5s ease-out ${0.7 + index * 0.1}s both` }}
              >
                <div className="text-4xl mb-3 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" style={{ filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))' }}>🌿</div>
                <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-purple-300 transition-colors">{plant.commonName}</h3>
                <p className="text-blue-300 text-xs italic">{plant.scientificName}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Plant Modal */}
      {selectedPlant && (
        <PlantModal plant={selectedPlant} onClose={handleCloseModal} />
      )}
    </div>
  );
}
