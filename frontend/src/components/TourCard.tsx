import { Link } from 'react-router-dom';
import { Tour } from '../types';

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <Link
      to={`/tour/${tour.id}`}
      className="group relative bg-gradient-to-br from-emerald-900/50 to-green-900/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-emerald-500/40 hover:border-lime-400/60 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-1"
    >
      {/* Cover Image Placeholder */}
      <div className="h-44 bg-gradient-to-br from-emerald-600/40 to-lime-600/40 flex items-center justify-center group-hover:from-emerald-600/50 group-hover:to-lime-600/50 transition-all">
        <span className="text-6xl transform group-hover:scale-110 transition-transform">
          {tour.theme === 'immunity' && '🛡️'}
          {tour.theme === 'digestion' && '🌱'}
          {tour.theme === 'stress' && '🧘'}
          {tour.theme === 'skin' && '✨'}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-emerald-300 to-lime-300 bg-clip-text mb-2">{tour.title}</h3>
        <p className="text-emerald-100/70 text-sm mb-4 line-clamp-2">{tour.description}</p>

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
          <span className="px-3 py-1 bg-lime-500/20 text-lime-200 text-xs rounded-full border border-lime-500/30 capitalize">
            {tour.theme}
          </span>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </Link>
  );
}
