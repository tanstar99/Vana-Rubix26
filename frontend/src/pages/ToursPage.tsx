import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TourCard from "../components/TourCard";
import TourPlayer from "../components/TourPlayer";
import TourQuestionForm from "../components/tourQuestionForm";
import DietPlanRenderer from "../components/DietPlanRenderer";
import { Tour, Plant } from "../types";

export default function ToursPage() {
  const { tourId } = useParams<{ tourId?: string }>();
  const navigate = useNavigate();

  const [tours, setTours] = useState<Tour[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  // Diet Plan State
  const [dietLoading, setDietLoading] = useState(false);
  const [dietPlan, setDietPlan] = useState<string | null>(null);

  const generateDietPlan = async () => {
    if (!selectedTour) return;

    setDietLoading(true);
    setDietPlan(null);

    try {
      // 1. Gather plant IDs from the tour steps
      const tourPlantNames = selectedTour.steps.map(s => s.plantId);

      // 2. Call Backend
      const response = await fetch("http://localhost:5000/api/diet/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plantNames: tourPlantNames }),
      });

      const data = await response.json();

      if (data.plan) {
        setDietPlan(data.plan);
      } else {
        alert("Could not generate a plan at this time.");
      }
    } catch (error) {
      console.error("Error generating diet plan:", error);
      alert("Failed to generate diet plan. Please try again.");
    } finally {
      setDietLoading(false);
    }
  };

  useEffect(() => {
    Promise.all([
      fetch("/tours.json").then((res) => res.json()),
      fetch("/plants.json").then((res) => res.json()),
    ])
      .then(([toursData, plantsData]) => {
        setTours(toursData);
        setPlants(plantsData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setLoading(false);
      });
  }, []);

  const selectedTour = tourId ? tours.find((t) => t.id === tourId) : null;

  if (loading) {
    return (
      <div
        className="min-h-screen bg-slate-950 bg-cover bg-center bg-fixed relative overflow-hidden"
        style={{ backgroundImage: "url('/images/hero.png')" }}
      >
        <div className="absolute inset-0 bg-black/80" />
        <div className="min-h-screen flex items-center justify-center relative z-10">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-pulse" style={{ filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.8))' }}>🎯</div>
            <div className="text-2xl bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent font-semibold">Loading tours...</div>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
     SINGLE TOUR VIEW
  ========================== */
  if (selectedTour) {
    return (
      <div
        className="min-h-screen bg-slate-950 bg-cover bg-center bg-fixed pt-32 pb-16 px-4 relative overflow-hidden"
        style={{ backgroundImage: "url('/images/hero.png')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="max-w-5xl mx-auto space-y-10 relative z-10">
          <button
            onClick={() => navigate("/tours")}
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <span className="text-xl">←</span>
            Back to Tours
          </button>

          <div className="text-center space-y-4">
            <div className="text-7xl">
              {selectedTour.theme === "immunity" && "🛡️"}
              {selectedTour.theme === "digestion" && "🌱"}
              {selectedTour.theme === "stress" && "🧘"}
              {selectedTour.theme === "skin" && "✨"}
            </div>

            <h1 className="text-4xl font-bold text-white">
              {selectedTour.title}
            </h1>

            <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
              {selectedTour.description}
            </p>
            {/* Diet Plan Button */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={generateDietPlan}
                disabled={dietLoading}
                className="px-6 py-3 rounded-full font-bold text-white shadow-lg bg-gradient-to-r from-teal-500 to-emerald-600 hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {dietLoading ? "Creating Plan... 👩‍🍳" : "Create Diet Plan 🥗"}
              </button>
            </div>

            {/* Diet Plan Result */}
            {dietPlan && (
              <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-8 border border-emerald-500/30 text-left max-w-4xl mx-auto mt-8 animate-fade-in">
                <h3 className="text-3xl font-bold text-emerald-300 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 to-lime-200">
                  🌿 Your Herbal Diet Plan
                </h3>

                <DietPlanRenderer planJson={dietPlan} />

              </div>
            )}
          </div>

          <TourPlayer tour={selectedTour} plants={plants} />
        </div>
      </div >
    );
  }

  /* =========================
     TOURS LIST VIEW
  ========================== */
  return (
    <div
      className="min-h-screen relative overflow-hidden px-4"
    >
      {/* Overlay */}

      {/* PUSH CONTENT BELOW NAVBAR */}
      <div className="relative z-10 pt-36 pb-24 min-h-screen flex justify-center">
        <div className="w-full max-w-6xl flex flex-col items-center gap-20">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-bold text-white font-['Cinzel']">
              <span className="bg-gradient-to-r pl-5 from-emerald-400 via-lime-400 to-green-400 bg-clip-text text-transparent neon-text">
                Guided Tours
              </span>
            </h1>

            <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
              Explore{" "}
              <span className="text-lime-400 font-semibold">
                themed collections
              </span>{" "}
              of medicinal plants for specific health benefits
            </p>
          </div>

          {/* HOW IT WORKS & QUESTIONNAIRE - SIDE BY SIDE */}
          <div className={`w-full grid gap-8 transition-all duration-500 ${showQuestionnaire ? 'grid-cols-1 lg:grid-cols-2 max-w-7xl' : 'grid-cols-1 max-w-4xl'
            }`}>
            {/* HOW IT WORKS */}
            <div className="bg-gradient-to-r from-emerald-900/40 to-green-900/40 backdrop-blur-xl rounded-2xl border border-emerald-500/40 p-8 h-fit">
              <h2 className="text-2xl font-bold text-emerald-300 mb-8 text-center">
                How Tours Work
              </h2>

              <div className="space-y-6 text-white/80">
                {/* POINT 1 WITH BUTTON */}
                <div className="flex gap-4">
                  <span className="text-2xl flex-shrink-0">1️⃣</span>
                  <div className="space-y-3">
                    <p>
                      Either explore tours manually or get a personalized tour
                      recommendation based on your health needs.
                    </p>

                    {!showQuestionnaire && (
                      <button
                        onClick={() => setShowQuestionnaire(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                                   bg-gradient-to-r from-emerald-500 to-lime-500
                                   text-white font-semibold hover:scale-105 transition shadow-lg"
                      >
                        Get Personalized Tour
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-2xl flex-shrink-0">2️⃣</span>
                  <span>
                    Follow a step-by-step journey through selected medicinal
                    plants
                  </span>
                </div>

                <div className="flex gap-4">
                  <span className="text-2xl flex-shrink-0">3️⃣</span>
                  <span>
                    Learn about each plant's benefits and traditional uses
                  </span>
                </div>

                <div className="flex gap-4">
                  <span className="text-2xl flex-shrink-0">4️⃣</span>
                  <span>
                    Bookmark plants you find interesting for later reference
                  </span>
                </div>
              </div>
            </div>

            {/* QUESTIONNAIRE (ONLY AFTER CLICK) */}
            {showQuestionnaire && (
              <div className="bg-gradient-to-r from-slate-900/60 to-emerald-900/60 backdrop-blur-xl rounded-2xl border border-emerald-500/40 p-8 h-fit">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-emerald-300">
                    Personalized Tour
                  </h2>
                  <button
                    onClick={() => setShowQuestionnaire(false)}
                    className="text-emerald-300 hover:text-emerald-200 transition"
                  >
                    ✕
                  </button>
                </div>

                <TourQuestionForm />
              </div>
            )}
          </div>

          {/* TOUR CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}