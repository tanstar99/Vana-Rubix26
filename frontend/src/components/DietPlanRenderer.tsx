import { useState } from "react";
import { ChevronDown, ChevronRight, ShoppingBag, ChefHat, Utensils } from "lucide-react";
import ReactMarkdown from "react-markdown";

type MealSection = "breakfast" | "lunch" | "dinner";

interface Dish {
    dish: string;
    recipe: string;
}

interface DietPlanData {
    breakfast: Dish[];
    lunch: Dish[];
    dinner: Dish[];
}

interface DietPlanRendererProps {
    planJson: string;
}

export default function DietPlanRenderer({ planJson }: DietPlanRendererProps) {
    const [openSection, setOpenSection] = useState<MealSection | null>("breakfast");
    const [openDish, setOpenDish] = useState<string | null>(null);

    let dietData: DietPlanData | null = null;
    try {
        dietData = JSON.parse(planJson);
    } catch (e) {
        console.error("Failed to parse diet plan JSON", e);
    }

    if (!dietData) {
        return (
            <div className="text-red-400 bg-red-900/20 p-4 rounded-lg">
                Could not load diet plan structure.
            </div>
        );
    }

    const sections: { id: MealSection; title: string, icon: any }[] = [
        { id: "breakfast", title: "Breakfast", icon: "🍳" },
        { id: "lunch", title: "Lunch", icon: "🍛" },
        { id: "dinner", title: "Dinner", icon: "🥗" },
    ];

    const handleOrder = (dishName: string) => {
        const query = encodeURIComponent(dishName);
        // Opens Zomato search for the dish
        window.open(`https://www.zomato.com/search?q=${query}`, '_blank');
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-4">
            {sections.map((section) => (
                <div key={section.id} className="border border-emerald-500/30 rounded-2xl overflow-hidden bg-slate-900/60 backdrop-blur-sm transition-all duration-300">

                    {/* Section Header */}
                    <button
                        onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                        className={`w-full flex items-center justify-between p-6 text-xl font-bold transition-colors ${openSection === section.id
                            ? "bg-gradient-to-r from-emerald-900/50 to-teal-900/50 text-emerald-300"
                            : "hover:bg-emerald-900/20 text-emerald-100"
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{section.icon}</span>
                            {section.title}
                        </div>
                        {openSection === section.id ? <ChevronDown /> : <ChevronRight />}
                    </button>

                    {/* Section Content (Dishes) */}
                    {openSection === section.id && (
                        <div className="p-4 space-y-3 bg-black/20 animate-fade-in">
                            {dietData && dietData[section.id]?.map((item, idx) => (
                                <div key={idx} className="border-b border-white/10 last:border-0 pb-3 last:pb-0">
                                    {/* Dish Header */}
                                    <button
                                        onClick={() => setOpenDish(openDish === item.dish ? null : item.dish)}
                                        className="w-full text-left py-2 px-3 rounded-lg hover:bg-white/5 flex items-center justify-between group transition-colors"
                                    >
                                        <span className="font-semibold text-lg text-emerald-50 group-hover:text-emerald-300">
                                            {item.dish}
                                        </span>
                                        <div className="flex items-center gap-2 text-sm text-emerald-500/60 group-hover:text-emerald-400">
                                            <ChefHat size={16} />
                                            {openDish === item.dish ? "Hide Recipe" : "View Recipe"}
                                        </div>
                                    </button>

                                    {/* Recipe Details */}
                                    {openDish === item.dish && (
                                        <div className="mt-2 p-4 bg-black/40 rounded-xl text-emerald-100/80 leading-relaxed text-sm animate-slide-down">
                                            <div className="flex gap-2 mb-3 items-start">
                                                <Utensils className="mt-1 flex-shrink-0 text-amber-400" size={16} />
                                                <div className="prose prose-invert prose-sm max-w-none">
                                                    <ReactMarkdown>{item.recipe}</ReactMarkdown>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleOrder(item.dish)}
                                                className="mt-3 w-full py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-red-900/30"
                                            >
                                                <ShoppingBag size={18} />
                                                Order Now
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {(!dietData || !dietData[section.id] || dietData[section.id].length === 0) && (
                                <div className="text-center text-white/40 py-4 italic">
                                    No suggestions available.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
