import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TourCard from '../components/TourCard';
import TourPlayer from '../components/TourPlayer';
import { Tour } from '../types';
import { usePlants } from '../hooks/usePlants';

export default function ToursPage() {
  const { tourId } = useParams<{ tourId?: string }>();
  const navigate = useNavigate();
  const [tours, setTours] = useState<Tour[]>([]);
  const [toursLoading, setToursLoading] = useState(true);
  const { plants, loading: plantsLoading } = usePlants();

  useEffect(() => {
    fetch('/tours.json')
      .then((res) => res.json())
      .then((data) => {
        setTours(data);
        setToursLoading(false);
      })
      .catch((err) => {
        console.error('Error loading tours:', err);
        setToursLoading(false);
      });
  }, []);

  const loading = toursLoading || plantsLoading;

  const selectedTour = tourId ? tours.find((t) => t.id === tourId) : null;

  const handleBackToTours = () => {
    navigate('/tours');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-950 flex items-center justify-center">
        <div className="text-white text-2xl">Loading tours...</div>
      </div>
    );
  }

  // If a specific tour is selected
  if (selectedTour) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-950 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={handleBackToTours}
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 transition-colors"
          >
            <span>←</span> Back to Tours
          </button>

          {/* Tour Header */}
          <div className="text-center mb-8">
            <div className="text-7xl mb-4">
              {selectedTour.theme === 'immunity' && '🛡️'}
              {selectedTour.theme === 'digestion' && '🌱'}
              {selectedTour.theme === 'stress' && '🧘'}
              {selectedTour.theme === 'skin' && '✨'}
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{selectedTour.title}</h1>
            <p className="text-xl text-emerald-200">{selectedTour.description}</p>
          </div>

          {/* Tour Player */}
          <TourPlayer tour={selectedTour} plants={plants} />
        </div>
      </div>
    );
  }

  // Tours listing
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 particles-bg"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
          <h1 className="text-6xl font-bold text-white mb-4 font-['Cinzel']">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent neon-text">
              🎯 Guided Tours
            </span>
          </h1>
          <p className="text-xl text-blue-200">
            Explore <span className="text-purple-400 font-semibold">themed collections</span> of medicinal plants for specific health benefits
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-gradient-to-r from-amber-900/30 to-emerald-900/30 backdrop-blur-md rounded-2xl border border-amber-500/30 p-8">
          <h2 className="text-2xl font-bold text-white mb-4">How Tours Work</h2>
          <div className="space-y-3 text-white/80">
            <p className="flex items-start gap-3">
              <span className="text-2xl">1️⃣</span>
              <span>Choose a tour based on your health interest</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-2xl">2️⃣</span>
              <span>Follow the step-by-step journey through selected medicinal plants</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-2xl">3️⃣</span>
              <span>Learn about each plant's benefits and traditional uses</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-2xl">4️⃣</span>
              <span>Bookmark plants you find interesting for later reference</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
