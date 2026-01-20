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
    <div className="w-full flex flex-col">
      {/* Progress Bar */}
      <div className="w-full mb-4">
        <div className="w-full h-1.5 bg-emerald-900/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-400 to-lime-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="mt-2 text-emerald-300/60 text-xs text-center">
          Question {current + 1} of {questions.length}
        </p>
      </div>

      {/* Question Card */}
      <div className="w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <p className="text-white text-base font-semibold mb-4">
              {question.question}
            </p>

            <div className="space-y-2.5">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt)}
                  className={`w-full p-3 rounded-lg border text-white text-left transition-all duration-200 text-sm
                    ${
                      answers[current] === opt.tour
                        ? "bg-emerald-600/40 border-emerald-400/60 shadow-lg shadow-emerald-500/20"
                        : "bg-slate-800/40 border-emerald-700/30 hover:bg-slate-700/50 hover:border-emerald-500/40"
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 w-full gap-3">
        <button
          onClick={handlePrevious}
          disabled={current === 0}
          className={`flex-1 py-2.5 rounded-lg text-white text-sm font-semibold transition-all
            ${
              current === 0
                ? "bg-slate-800/30 opacity-30 cursor-not-allowed"
                : "bg-slate-800/50 hover:bg-slate-700/60 border border-emerald-700/30"
            }`}
        >
          ← Previous
        </button>

        {current === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={!answers[current]}
            className={`flex-1 py-2.5 rounded-lg text-white text-sm font-bold bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 transition-all shadow-lg
              ${!answers[current] ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Get My Tour 🎯
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!answers[current]}
            className={`flex-1 py-2.5 rounded-lg text-white text-sm font-semibold transition-all
              ${
                !answers[current]
                  ? "bg-slate-800/40 cursor-not-allowed opacity-40"
                  : "bg-emerald-600/60 hover:bg-emerald-600/80 border border-emerald-500/40 shadow-lg"
              }`}
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}