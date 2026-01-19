import { Link } from 'react-router-dom';
import { Plant } from '../types';
import { useAppStore } from '../store/useAppStore';

interface PlantCardProps {
  plant: Plant;
}

export default function PlantCard({ plant }: PlantCardProps) {
  const { isBookmarked, toggleBookmark } = useAppStore();
  const bookmarked = isBookmarked(plant.id);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleBookmark(plant.id);
  };

  return (
    <Link
      to={`/plant/${plant.id}`}
      className="group relative bg-slate-900/50 backdrop-blur-2xl rounded-3xl p-6 border border-blue-500/30 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30 hover:-translate-y-2 hover:scale-105"
    >
      {/* Bookmark button */}
      <button
        onClick={handleBookmarkClick}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/70 backdrop-blur-sm hover:bg-purple-600/50 transition-all duration-300 border border-blue-500/30"
      >
        {bookmarked ? (
          <span className="text-yellow-400 text-2xl drop-shadow-lg">★</span>
        ) : (
          <span className="text-blue-300 text-2xl">☆</span>
        )}
      </button>

      {/* Plant Image Placeholder with Glow */}
      <div className="relative w-full h-48 bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-pink-900/40 rounded-2xl mb-4 flex items-center justify-center overflow-hidden border border-blue-500/20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-500"></div>
        <span className="text-7xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative z-10" style={{ filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.6))' }}>🌿</span>
      </div>

      {/* Plant Info */}
      <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text mb-2 group-hover:from-blue-200 group-hover:to-pink-200 transition-all">{plant.commonName}</h3>
      <p className="text-blue-300 text-sm italic mb-3">
        {plant.scientificName}
      </p>
      <p className="text-blue-100/70 text-sm line-clamp-2 mb-4">
        {plant.descriptionShort}
      </p>

      {/* Tags with Gradient */}
      <div className="flex flex-wrap gap-2 mb-3">
        {plant.tags.slice(0, 3).map((tag, index) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 text-xs rounded-full border border-blue-500/40 backdrop-blur-sm"
            style={{ animation: `scaleIn 0.3s ease-out ${index * 0.1}s both` }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* AYUSH Systems */}
      <div className="flex flex-wrap gap-2">
        {plant.ayushSystems.slice(0, 2).map((system, index) => (
          <span
            key={system}
            className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 text-xs rounded-lg border border-purple-500/40"
            style={{ animation: `scaleIn 0.3s ease-out ${(index + 3) * 0.1}s both` }}
          >
            {system}
          </span>
        ))}
      </div>

      {/* Hover overlay with Animated Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 via-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
      <div className="absolute inset-0 border-2 border-purple-500/0 group-hover:border-purple-500/30 rounded-3xl transition-all duration-500 pointer-events-none"></div>
    </Link>
  );
}
