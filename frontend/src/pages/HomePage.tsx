import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div 
      className="min-h-screen relative overflow-x-hidden selection:bg-pink-500/30"
    >
      
      {/* --- BACKGROUND EFFECTS (reduced for visibility) --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 animate-pulse delay-1000" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-5xl mb-27 mx-auto text-center">
          
          {/* Floating Icon */}
          <div className="mb-8 inline-block animate-bounce duration-[3000ms]">
            <span className="text-7xl lg:text-8xl" style={{ filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.3))' }}></span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold font-serif tracking-tight mb-6 pl-5 leading-tight text-white">
            VANA
          </h1>
          <br />
          <p className="text-lg md:text-2xl text-slate-200 max-w-3xl pl-5 mx-auto leading-relaxed mb-12">
            Explore the ancient wisdom of <span className="text-emerald-300 font-medium">AYUSH</span> medicinal plants through an immersive <span className="text-lime-300 font-medium">3D experience</span>.
          </p>
          <br />

          {/* Action Buttons */}
          <div className="flex flex-col pl-6 sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              to="/garden"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white text-lg font-semibold rounded-xl shadow-lg shadow-emerald-900/20 transition-all hover:-translate-y-1 hover:shadow-emerald-500/30 flex items-center justify-center gap-2"
            >
              <span>🏛️</span> Enter Garden
            </Link>

            <Link
              to="/plants"
              className="w-full sm:w-auto px-8 py-4 bg-slate-800/50 backdrop-blur-md border border-emerald-700/50 hover:bg-slate-700/50 text-white text-lg font-semibold rounded-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <span>📚</span> Explore Plants
            </Link>
            
             <Link
              to="/tours"
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-lime-600 to-emerald-600 hover:from-lime-500 hover:to-emerald-500 text-white text-lg font-semibold rounded-xl shadow-lg shadow-lime-900/20 transition-all hover:-translate-y-1 hover:shadow-lime-500/30 flex items-center justify-center gap-2"
            >
              <span>🎯</span> Start Tour
            </Link>
          </div>
          
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Why Explore Vana?</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-lime-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feat, idx) => (
              <FeatureCard key={idx} {...feat} />
            ))}
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.grad} bg-clip-text text-transparent mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-sm md:text-base font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA FOOTER --- */}
      <section className="relative z-10 py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Explore <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-400">
              Nature's Pharmacy?
            </span>
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
             Start your journey into the world of traditional herbal medicine today.
          </p>
          
          <Link
            to="/garden"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 text-xl font-bold rounded-full hover:scale-105 hover:bg-emerald-50 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
          >
            Begin Your Journey <span>→</span>
          </Link>
        </div>
      </section>

    </div>
  );
}

/* --- COMPONENTS & DATA --- */

function FeatureCard({ icon, title, desc, colorClass }: { icon: string, title: string, desc: string, colorClass: string }) {
  return (
    <div className={`group relative p-8 bg-slate-900/40 border border-white/5 hover:border-white/10 rounded-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden`}>
      {/* Hover Glow Background */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${colorClass}`} />
      
      <div className="relative z-10">
        <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 leading-relaxed text-sm md:text-base">
          {desc}
        </p>
      </div>
    </div>
  );
}

const features = [
  {
    icon: "🌳",
    title: "3D Garden View",
    desc: "Walk through our virtual garden to find medicinal plants in their natural habitats.",
    colorClass: "from-emerald-500 to-green-500"
  },
  {
    icon: "🔍",
    title: "Detailed Profiles",
    desc: "Deep dive into scientific data, medicinal properties, and cultivation techniques.",
    colorClass: "from-lime-500 to-emerald-500"
  },
  {
    icon: "🎓",
    title: "Guided Tours",
    desc: "Curated paths focusing on immunity, digestion, stress relief and natural healing.",
    colorClass: "from-green-500 to-teal-500"
  },
  {
    icon: "⭐",
    title: "Bookmarks",
    desc: "Save your favorite plants and create your own collection of herbal knowledge.",
    colorClass: "from-teal-500 to-cyan-500"
  },
  {
    icon: "🏥",
    title: "AYUSH Systems",
    desc: "Learn how plants are used across Ayurveda, Unani, Siddha and Homeopathy.",
    colorClass: "from-emerald-500 to-lime-500"
  },
  {
    icon: "💬",
    title: "AI Assistant",
    desc: "Have a question? Our smart assistant helps you find remedies instantly.",
    colorClass: "from-lime-500 to-green-500"
  }
];

const stats = [
  { value: "8+", label: "Medicinal Plants", grad: "from-emerald-400 to-green-400" },
  { value: "4", label: "Guided Tours", grad: "from-lime-400 to-emerald-400" },
  { value: "5", label: "AYUSH Systems", grad: "from-green-400 to-teal-400" },
  { value: "100%", label: "Natural Healing", grad: "from-teal-400 to-emerald-400" },
];