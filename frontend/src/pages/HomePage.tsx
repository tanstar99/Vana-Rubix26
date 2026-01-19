import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 particles-bg"></div>
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-24 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-12" style={{ animation: 'fadeInUp 1s ease-out' }}>
            {/* Floating Icon */}
            <div className="py-8" style={{ animation: 'float 6s ease-in-out infinite' }}>
              <span className="text-8xl md:text-9xl block filter drop-shadow-2xl">🌿</span>
            </div>
            
            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white font-['Cinzel'] neon-text leading-tight px-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Virtual Herbal Garden
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl text-blue-200 max-w-4xl mx-auto leading-relaxed px-4" style={{ animation: 'fadeInUp 1s ease-out 0.3s both' }}>
              Explore the ancient wisdom of <span className="text-purple-400 font-semibold">AYUSH</span> medicinal plants through an immersive <span className="text-pink-400 font-semibold">3D</span> experience
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 px-4" style={{ animation: 'fadeInUp 1s ease-out 0.6s both' }}>
              <Link
                to="/garden"
                className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="text-3xl">🏛️</span> Enter Garden
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              </Link>
              <Link
                to="/plants"
                className="group relative px-10 py-5 bg-slate-800/50 backdrop-blur-xl hover:bg-slate-700/50 text-white text-xl font-semibold rounded-2xl border-2 border-blue-500/50 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:scale-105 shadow-lg hover:shadow-purple-500/30"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="text-3xl">📚</span> Explore Plants
                </span>
              </Link>
              <Link
                to="/tours"
                className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-500 to-rose-600 hover:from-purple-500 hover:via-pink-400 hover:to-rose-500 text-white text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 hover:-translate-y-2 hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span className="text-3xl">🎯</span> Start Tour
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights Section */}
      <div className="relative py-24 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="group bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-12 border border-blue-500/30 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/30" style={{ animation: 'scaleIn 0.6s ease-out 0.8s both' }}>
              <div className="text-7xl mb-8 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))' }}>🌳</div>
              <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mb-5">3D Garden View</h3>
              <p className="text-blue-200/80 text-lg leading-relaxed">
                Explore medicinal plants in an interactive 3D environment
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-12 border border-purple-500/30 hover:border-pink-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/30" style={{ animation: 'scaleIn 0.6s ease-out 0.9s both' }}>
              <div className="text-7xl mb-8 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" style={{ filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))' }}>🔍</div>
              <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-5">Detailed Plant Profiles</h3>
              <p className="text-purple-200/80 text-lg leading-relaxed">
                Learn about medicinal properties, usage, and cultivation
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-12 border border-pink-500/30 hover:border-rose-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/30" style={{ animation: 'scaleIn 0.6s ease-out 1s both' }}>
              <div className="text-7xl mb-8 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" style={{ filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))' }}>🎓</div>
              <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text mb-5">Guided Tours</h3>
              <p className="text-pink-200/80 text-lg leading-relaxed">
                Follow themed tours for immunity, digestion, and stress relief
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-12 border border-cyan-500/30 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/30" style={{ animation: 'scaleIn 0.6s ease-out 1.1s both' }}>
              <div className="text-7xl mb-8 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" style={{ filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.5))' }}>⭐</div>
              <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text mb-5">Personal Bookmarks</h3>
              <p className="text-cyan-200/80 text-lg leading-relaxed">
                Save favorite plants and add personal notes
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-12 border border-indigo-500/30 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/30" style={{ animation: 'scaleIn 0.6s ease-out 1.2s both' }}>
              <div className="text-7xl mb-8 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" style={{ filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.5))' }}>🏥</div>
              <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text mb-5">AYUSH Systems</h3>
              <p className="text-indigo-200/80 text-lg leading-relaxed">
                Discover plants from Ayurveda, Unani, Siddha, and more
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group bg-slate-900/40 backdrop-blur-2xl rounded-3xl p-12 border border-violet-500/30 hover:border-fuchsia-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/30" style={{ animation: 'scaleIn 0.6s ease-out 1.3s both' }}>
              <div className="text-7xl mb-8 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" style={{ filter: 'drop-shadow(0 0 20px rgba(167, 139, 250, 0.5))' }}>💬</div>
              <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text mb-5">Chat Assistant</h3>
              <p className="text-violet-200/80 text-lg leading-relaxed">
                Get instant answers about medicinal plants and remedies
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-32 px-6 bg-gradient-to-r from-slate-900/70 via-blue-900/50 to-purple-900/70 backdrop-blur-xl border-y border-blue-500/20 my-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="relative max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
          <div className="group" style={{ animation: 'fadeInUp 0.8s ease-out 1.4s both' }}>
            <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6 transform group-hover:scale-110 transition-transform duration-300">8+</div>
            <div className="text-blue-200 text-xl">Medicinal Plants</div>
          </div>
          <div className="group" style={{ animation: 'fadeInUp 0.8s ease-out 1.5s both' }}>
            <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 transform group-hover:scale-110 transition-transform duration-300">4</div>
            <div className="text-purple-200 text-xl">Guided Tours</div>
          </div>
          <div className="group" style={{ animation: 'fadeInUp 0.8s ease-out 1.6s both' }}>
            <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-6 transform group-hover:scale-110 transition-transform duration-300">5</div>
            <div className="text-pink-200 text-xl">AYUSH Systems</div>
          </div>
          <div className="group" style={{ animation: 'fadeInUp 0.8s ease-out 1.7s both' }}>
            <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6 transform group-hover:scale-110 transition-transform duration-300">100%</div>
            <div className="text-cyan-200 text-xl">Natural Healing</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative py-32 px-6 z-10 pb-40">
        <div className="max-w-5xl mx-auto text-center space-y-10" style={{ animation: 'scaleIn 1s ease-out 1.8s both' }}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent neon-text">
              Ready to Explore Nature's Pharmacy?
            </span>
          </h2>
          <p className="text-2xl md:text-3xl text-blue-200/80 max-w-3xl mx-auto leading-relaxed">
            Start your journey into the world of <span className="text-purple-400 font-semibold">traditional herbal medicine</span>
          </p>
          <Link
            to="/garden"
            className="inline-block group relative px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-4">
              Begin Your Journey 
              <span className="transform group-hover:translate-x-2 transition-transform duration-300 text-3xl">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition-opacity duration-500"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
