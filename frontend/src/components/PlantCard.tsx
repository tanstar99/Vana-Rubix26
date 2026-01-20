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
      className="group relative bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 border border-emerald-500/30 hover:border-lime-400/60 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1"
    >
      {/* Bookmark button */}
      <button
        onClick={handleBookmarkClick}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-slate-800/80 backdrop-blur-sm hover:bg-emerald-600/50 transition-all duration-300 border border-emerald-500/40"
      >
        {bookmarked ? (
          <span className="text-amber-400 text-xl drop-shadow-lg">★</span>
        ) : (
          <span className="text-emerald-300 text-xl">☆</span>
        )}
      </button>

      {/* Plant Image Placeholder with Glow */}
      <div className="relative w-full h-40 bg-gradient-to-br from-emerald-900/40 via-green-900/40 to-teal-900/40 rounded-xl mb-4 flex items-center justify-center overflow-hidden border border-emerald-500/30">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-lime-500/10 group-hover:from-emerald-500/20 group-hover:to-lime-500/20 transition-all duration-300"></div>
        <span className="text-6xl transform group-hover:scale-110 transition-all duration-300 relative z-10" style={{ filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.6))' }}>🌿</span>
      </div>

      {/* Plant Info */}
      <h3 className="text-lg font-bold text-transparent bg-gradient-to-r from-emerald-300 to-lime-300 bg-clip-text mb-2 group-hover:from-emerald-200 group-hover:to-lime-200 transition-all">{plant.commonName}</h3>
      <p className="text-emerald-300/80 text-xs italic mb-2">
        {plant.scientificName}
      </p>
      <p className="text-emerald-100/60 text-sm line-clamp-2 mb-3">
        {plant.descriptionShort}
      </p>

      {/* Tags with Gradient */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {plant.tags.slice(0, 3).map((tag, index) => (
          <span
            key={tag}
            className="px-2.5 py-1 bg-gradient-to-r from-emerald-500/20 to-lime-500/20 text-emerald-200 text-xs rounded-full border border-emerald-500/30 backdrop-blur-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* AYUSH Systems */}
      <div className="flex flex-wrap gap-1.5">
        {plant.ayushSystems.slice(0, 2).map((system) => (
          <span
            key={system}
            className="px-2.5 py-1 bg-gradient-to-r from-lime-500/20 to-green-500/20 text-lime-200 text-xs rounded-lg border border-lime-500/30"
          >
            {system}
          </span>
        ))}
      </div>

      {/* Hover overlay with Animated Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/10 via-green-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
    </Link>
  );
}
