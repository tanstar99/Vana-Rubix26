import { Link } from 'react-router-dom';
import { Tour } from '../types';

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <Link
      to={`/tour/${tour.id}`}
      className="group relative bg-gradient-to-br from-amber-900/30 to-emerald-900/30 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:border-amber-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-1"
    >
      {/* Cover Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-amber-600/40 to-emerald-600/40 flex items-center justify-center">
        <span className="text-7xl">
          {tour.theme === 'immunity' && '🛡️'}
          {tour.theme === 'digestion' && '🌱'}
          {tour.theme === 'stress' && '🧘'}
          {tour.theme === 'skin' && '✨'}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{tour.title}</h3>
        <p className="text-white/80 mb-4 line-clamp-2">{tour.description}</p>

        {/* Steps count */}
        <div className="flex items-center gap-4 text-sm text-emerald-300">
          <span className="flex items-center gap-1">
            <span>🌿</span>
            {tour.steps.length} Plants
          </span>
          <span className="flex items-center gap-1">
            <span>⏱️</span>
            {tour.steps.length * 2} min
          </span>
        </div>

        {/* Theme badge */}
        <div className="mt-4">
          <span className="px-3 py-1 bg-amber-500/20 text-amber-200 text-xs rounded-full border border-amber-500/30 capitalize">
            {tour.theme}
          </span>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-amber-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </Link>
  );
}
