import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TourCard from "../components/TourCard";
import TourPlayer from "../components/TourPlayer";
import TourQuestionForm from "../components/tourQuestionForm";
import { Tour, Plant } from "../types";

export default function ToursPage() {
  const { tourId } = useParams<{ tourId?: string }>();
  const navigate = useNavigate();

  const [tours, setTours] = useState<Tour[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

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
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-950 flex items-center justify-center">
        <div className="text-white text-2xl">Loading tours...</div>
      </div>
    );
  }

  /* =========================
     SINGLE TOUR VIEW
  ========================== */
  if (selectedTour) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 to-emerald-950 pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto space-y-10">
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
          </div>

          <TourPlayer tour={selectedTour} plants={plants} />
        </div>
      </div>
    );
  }

  /* =========================
     TOURS LIST VIEW
  ========================== */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 relative overflow-hidden px-4">
      {/* Background */}
      <div className="absolute inset-0 particles-bg"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* PUSH CONTENT BELOW NAVBAR */}
      <div className="relative z-10 pt-36 pb-24 min-h-screen flex justify-center">
        <div className="w-full max-w-6xl flex flex-col items-center gap-20">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-bold text-white font-['Cinzel']">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent neon-text">
                🎯 Guided Tours
              </span>
            </h1>

            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Explore{" "}
              <span className="text-purple-400 font-semibold">
                themed collections
              </span>{" "}
              of medicinal plants for specific health benefits
            </p>
          </div>

          {/* HOW IT WORKS */}
          <div className="w-full max-w-4xl bg-gradient-to-r from-amber-900/30 to-emerald-900/30 backdrop-blur-md rounded-2xl border border-amber-500/30 p-12">
            <h2 className="text-2xl font-bold text-white mb-10 text-center">
              How Tours Work
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-16 text-white/80">
              {/* POINT 1 WITH BUTTON */}
              <div className="flex gap-4">
                <span className="text-2xl">1️⃣</span>
                <div className="space-y-3">
                  <p>
                    Either explore tours manually or get a personalized tour
                    recommendation based on your health needs.
                  </p>

                  <button
                    onClick={() => setShowQuestionnaire(true)}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg
                               bg-gradient-to-r from-emerald-500 to-teal-500
                               text-black font-semibold hover:scale-105 transition"
                  >
                    🎯 Get Personalized Tour
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">2️⃣</span>
                <span>
                  Follow a step-by-step journey through selected medicinal
                  plants
                </span>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">3️⃣</span>
                <span>
                  Learn about each plant's benefits and traditional uses
                </span>
              </div>

              <div className="flex gap-4">
                <span className="text-2xl">4️⃣</span>
                <span>
                  Bookmark plants you find interesting for later reference
                </span>
              </div>
            </div>
          </div>

          {/* QUESTIONNAIRE (ONLY AFTER CLICK) */}
          {showQuestionnaire && (
            <div
              className="w-full max-w-2xl bg-gradient-to-r from-slate-900/50 to-blue-900/50
                backdrop-blur-md rounded-2xl border border-white/10 p-6 mx-auto"
            >
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Personalized Tour Questionnaire
              </h2>

              <TourQuestionForm />
            </div>
          )}

          {/* TOUR CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 place-items-center">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="w-full max-w-sm p-4 flex justify-center"
              >
                <TourCard tour={tour} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}