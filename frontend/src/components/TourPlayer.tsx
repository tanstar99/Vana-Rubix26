import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tour, Plant } from '../types';

interface TourPlayerProps {
  tour: Tour;
  plants: Plant[];
}

export default function TourPlayer({ tour, plants }: TourPlayerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const sortedSteps = [...tour.steps].sort((a, b) => a.order - b.order);
  const currentStepData = sortedSteps[currentStep];
  const currentPlant = plants.find((p) => p.id === currentStepData?.plantId);

  const handleNext = () => {
    if (currentStep < sortedSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleViewPlant = () => {
    if (currentPlant) {
      navigate(`/plant/${currentPlant.id}`);
    }
  };

  if (!currentPlant) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-8">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-white/80 mb-2">
          <span>Step {currentStep + 1} of {sortedSteps.length}</span>
          <span>{Math.round(((currentStep + 1) / sortedSteps.length) * 100)}%</span>
        </div>
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-500"
            style={{ width: `${((currentStep + 1) / sortedSteps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Plant display */}
      <div className="text-center mb-6">
        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-emerald-600/30 to-green-700/30 rounded-full flex items-center justify-center mb-4">
          <span className="text-7xl">🌿</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{currentPlant.commonName}</h3>
        <p className="text-emerald-300 italic">{currentPlant.scientificName}</p>
      </div>

      {/* Narration */}
      <div className="bg-white/5 rounded-xl p-6 mb-6">
        <p className="text-white/90 text-lg leading-relaxed">
          {currentStepData.narrationText}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {currentPlant.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-emerald-500/20 text-emerald-200 text-sm rounded-full border border-emerald-500/30"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-4">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="py-3 px-6 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        <button
          onClick={handleViewPlant}
          className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all"
        >
          View Full Details
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === sortedSteps.length - 1}
          className="py-3 px-6 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
