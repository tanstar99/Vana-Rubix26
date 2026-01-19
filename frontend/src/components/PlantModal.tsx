import { useNavigate } from 'react-router-dom';
import { Plant } from '../types';

interface PlantModalProps {
  plant: Plant;
  onClose: () => void;
}

export default function PlantModal({ plant, onClose }: PlantModalProps) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/plant/${plant.id}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-emerald-900/95 to-green-800/95 backdrop-blur-md rounded-2xl border border-emerald-500/30 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl"
        >
          ×
        </button>

        {/* Plant icon */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-gradient-to-br from-emerald-600/30 to-green-700/30 rounded-full flex items-center justify-center">
            <span className="text-6xl">🌿</span>
          </div>
        </div>

        {/* Plant Info */}
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          {plant.commonName}
        </h2>
        <p className="text-emerald-300 text-center italic mb-6">
          {plant.scientificName}
        </p>

        <p className="text-white/90 mb-6 leading-relaxed">
          {plant.descriptionShort}
        </p>

        {/* Quick Info */}
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-emerald-300 font-semibold mb-2">AYUSH Systems:</h4>
            <div className="flex flex-wrap gap-2">
              {plant.ayushSystems.map((system) => (
                <span
                  key={system}
                  className="px-3 py-1 bg-amber-500/20 text-amber-200 text-sm rounded-full border border-amber-500/30"
                >
                  {system}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-emerald-300 font-semibold mb-2">Medicinal Tags:</h4>
            <div className="flex flex-wrap gap-2">
              {plant.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-emerald-500/20 text-emerald-200 text-sm rounded-full border border-emerald-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleViewDetails}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg transition-all"
          >
            View Full Profile
          </button>
          <button
            onClick={onClose}
            className="py-3 px-6 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
