import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type Option = {
  label: string;
  tour: string;
};

type Question = {
  id: number;
  question: string;
  options: Option[];
};

const TOUR_ROUTE_MAP: Record<string, string> = {
  immunity: "/tour/immunity-tour",
  digestion: "/tour/digestion-tour",
  stress: "/tour/stress-relief-tour",
  skin: "/tour/skin-health-tour",
};

export default function TourQuestionForm() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/tourQuestions.json")
      .then((res) => res.json())
      .then(setQuestions)
      .catch((err) => console.error("Error loading questions:", err));
  }, []);

  const handleSelect = (option: Option) => {
    setAnswers({ ...answers, [current]: option.tour });
  };

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (current > 0) setCurrent((prev) => prev - 1);
  };

  const handleSubmit = () => {
    const score: Record<string, number> = {};
    Object.values(answers).forEach((tour) => {
      score[tour] = (score[tour] || 0) + 1;
    });

    const suggestedTour = Object.keys(score).reduce((a, b) =>
      score[a] > score[b] ? a : b,
    );

    setResult(suggestedTour);

    setTimeout(() => {
      navigate(TOUR_ROUTE_MAP[suggestedTour]);
    }, 2000);
  };

  if (questions.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <p className="text-white text-center py-6">Loading questions...</p>
      </div>
    );

  if (result)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950">
        <div className="text-center text-white space-y-4 p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
          <h3 className="text-3xl font-bold">
            🎯 Suggested Tour: {result.toUpperCase()}
          </h3>
          <p className="text-emerald-300 text-lg">
            Redirecting you to the best tour for your needs...
          </p>
        </div>
      </div>
    );

  const question = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 px-4">
      {/* Centered Content Wrapper */}
      <div className="w-full max-w-xl flex flex-col items-center">
        {/* Progress Bar Header */}
        <div className="w-full mb-6">
          <h2 className="text-white text-center text-2xl font-bold mb-4">
            Personalized Tour Questionnaire
          </h2>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-emerald-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card - Reduced Size & Compact Padding */}
        <div className="w-full overflow-hidden min-h-[320px]">
          {" "}
          {/* Fixed min-height prevents "jumping" layout */}
          <AnimatePresence mode="wait">
            <motion.div
              key={question.id}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-gradient-to-r from-emerald-900/40 to-teal-900/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl"
            >
              <p className="text-white text-lg font-semibold mb-6">
                {question.question}
              </p>

              <div className="grid grid-cols-1 gap-3">
                {question.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(opt)}
                    className={`p-4 rounded-xl border text-white text-left transition-all duration-200 text-sm md:text-base
                      ${
                        answers[current] === opt.tour
                          ? "bg-emerald-600/50 border-emerald-400 translate-x-1 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation - Better Spacing */}
        <div className="flex items-center justify-between mt-8 w-full gap-4">
          <button
            onClick={handlePrevious}
            disabled={current === 0}
            className={`flex-1 py-3 rounded-xl text-white font-bold transition-all
              ${
                current === 0
                  ? "bg-white/5 opacity-30 cursor-not-allowed"
                  : "bg-white/10 hover:bg-white/20 border border-white/10"
              }`}
          >
            ← Previous
          </button>

          {current === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!answers[current]}
              className={`flex-1 py-3 rounded-xl text-black font-bold bg-gradient-to-r from-emerald-400 to-teal-400 hover:scale-[1.02] active:scale-[0.98] transition-all
                ${!answers[current] ? "opacity-50 grayscale cursor-not-allowed" : ""}`}
            >
              Get My Tour
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!answers[current]}
              className={`flex-1 py-3 rounded-xl text-white font-bold transition-all
                ${
                  !answers[current]
                    ? "bg-gray-700 cursor-not-allowed opacity-50"
                    : "bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-900/20"
                }`}
            >
              Next →
            </button>
          )}
        </div>

        {/* Footer Info */}
        <p className="mt-6 text-white/40 text-xs tracking-widest uppercase font-medium">
          Question {current + 1} of {questions.length}
        </p>
      </div>
    </div>
  );
}