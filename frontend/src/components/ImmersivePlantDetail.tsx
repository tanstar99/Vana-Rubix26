import { useState, useEffect, useRef, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Float } from '@react-three/drei';
import { Plant } from '../types';
import * as THREE from 'three';
import BookmarkButton from './BookmarkButton';
import NoteEditor from './NoteEditor';

// CSS Styles for jungle background and fireflies
const styles = `
/* Jungle Background */
.immersive-container {
  background:
    radial-gradient(circle at center,
      rgba(60, 120, 90, 0.55) 0%,
      rgba(20, 40, 30, 0.85) 40%,
      rgba(5, 15, 10, 0.95) 70%),
    linear-gradient(to bottom, #020a05, #06140c);
  animation: forestPulse 18s ease-in-out infinite;
}

@keyframes forestPulse {
  0% { filter: brightness(0.95); }
  50% { filter: brightness(1.05); }
  100% { filter: brightness(0.95); }
}

/* Fireflies */
.fireflies {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 5;
}

.firefly {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #b9ffd8;
  border-radius: 50%;
  box-shadow: 0 0 12px #b9ffd8, 0 0 24px rgba(185, 255, 216, 0.8);
  opacity: 0.8;
  animation: fly 16s infinite ease-in-out;
}

/* Firefly initial positions */
.firefly:nth-child(1) {
  top: 20%;
  left: 15%;
  animation-delay: 0s;
}

.firefly:nth-child(2) {
  top: 60%;
  left: 70%;
  animation-delay: 3s;
}

.firefly:nth-child(3) {
  top: 40%;
  left: 45%;
  animation-delay: 6s;
}

.firefly:nth-child(4) {
  top: 75%;
  left: 30%;
  animation-delay: 9s;
}

.firefly:nth-child(5) {
  top: 30%;
  left: 80%;
  animation-delay: 12s;
}

.firefly:nth-child(6) {
  top: 55%;
  left: 55%;
  animation-delay: 18s;
}

.firefly:nth-child(7) {
  top: 70%;
  left: 90%;
  animation-delay: 14s;
}

.firefly:nth-child(8) {
  top: 50%;
  left: 40%;
  animation-delay: 8s;
}

.firefly:nth-child(9) {
  top: 25%;
  left: 65%;
  animation-delay: 5s;
}

.firefly:nth-child(10) {
  top: 80%;
  left: 20%;
  animation-delay: 11s;
}

.firefly:nth-child(11) {
  top: 15%;
  left: 50%;
  animation-delay: 7s;
}

.firefly:nth-child(12) {
  top: 65%;
  left: 85%;
  animation-delay: 15s;
}

@keyframes fly {
  0% { transform: translate(0, 0); opacity: 0.2; }
  30% { opacity: 1; }
  50% { transform: translate(40px, -60px); }
  80% { opacity: 0.6; }
  100% { transform: translate(-30px, 40px); opacity: 0.2; }
}

/* Fog/Mist layers */
.immersive-container::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 50%),
    linear-gradient(to left, rgba(0, 0, 0, 0.6), transparent 40%),
    linear-gradient(to right, rgba(0, 0, 0, 0.6), transparent 40%);
  z-index: 0;
  pointer-events: none;
}

.immersive-container::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(ellipse at bottom,
      rgba(0, 0, 0, 0.7) 0%,
      transparent 60%);
  pointer-events: none;
  z-index: 1;
}
`;

interface ImmersivePlantDetailProps {
  plantId: string;
  onBack: () => void;
}

// 3D Model Component without auto-rotation
function PlantModel({ modelPath }: { modelPath: string }) {
  try {
    const { scene } = useGLTF(modelPath);
    return (
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <primitive object={scene} scale={2.5} />
      </Float>
    );
  } catch (error) {
    console.error('Error loading 3D model:', error);
    return (
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>
    );
  }
}

// Scroll progress indicator
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-lime-400 to-emerald-500 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

export default function ImmersivePlantDetail({ plantId, onBack }: ImmersivePlantDetailProps) {
  const [plant, setPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Smooth spring animations for scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform values for parallax effects
  const model3dY = useTransform(smoothProgress, [0, 0.2, 0.4], [0, -50, -150]);
  const model3dScale = useTransform(smoothProgress, [0, 0.2, 0.4], [1, 1.2, 0.8]);

  useEffect(() => {
    fetch('/plants.json')
      .then((res) => res.json())
      .then((data: Plant[]) => {
        const foundPlant = data.find((p) => p.id === plantId);
        setPlant(foundPlant || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading plant:', err);
        setLoading(false);
      });
  }, [plantId]);

  // Randomize firefly positions
  useEffect(() => {
    const flies = document.querySelectorAll('.firefly');
    flies.forEach((fly) => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 10;
      const duration = 12 + Math.random() * 10;

      (fly as HTMLElement).style.top = `${top}%`;
      (fly as HTMLElement).style.left = `${left}%`;
      (fly as HTMLElement).style.animationDelay = `${delay}s`;
      (fly as HTMLElement).style.animationDuration = `${duration}s`;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onBack();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full mx-auto mb-6"
          />
          <p className="text-white text-xl font-medium">Loading Experience...</p>
        </motion.div>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Plant not found</h1>
          <button onClick={onBack} className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-slate-200 transition-colors">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="immersive-container bg-black text-white overflow-x-hidden relative">
      <style>{styles}</style>
      <ScrollProgress />

      {/* Fireflies */}
      <div className="fireflies">
        <span className="firefly"></span>
        <span className="firefly"></span>
        <span className="firefly"></span>
        <span className="firefly"></span>
        <span className="firefly"></span>
        <span className="firefly"></span>
        <span className="firefly"></span>
        <span className="firefly"></span>
        <span className="firefly"></span>
        <span className="firefly"></span>
        <span className="firefly"></span>
        <span className="firefly"></span>
      </div>

      {/* Hero Section - Split layout with image */}
      <section className="min-h-screen relative flex items-center overflow-hidden pt-32 pb-16 z-10">
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.button
                  onClick={onBack}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">←</span>
                  <span className="font-medium">Back</span>
                </motion.button>
                <div className="flex-1" />
                <BookmarkButton plantId={plant.id} />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <p className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-2">
                  {plant.scientificName}
                </p>
                <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-br from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent leading-tight">
                  {plant.commonName}
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-slate-300 leading-relaxed"
              >
                {plant.descriptionFull}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap gap-3 pt-4"
              >
                {plant.ayushSystems.map((system) => (
                  <span key={system} className="px-5 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-sm font-medium backdrop-blur-xl">
                    {system}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-wrap gap-2 pt-2"
              >
                {plant.localNames.map((name) => (
                  <span key={name} className="px-3 py-1 text-sm text-slate-400 border border-slate-700 rounded-full">
                    {name}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={`/images/${plantId.charAt(0).toUpperCase() + plantId.slice(1)}_3.jpg`}
                  alt={`${plant.commonName} - Detail`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `/images/${plantId}_1.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              
              {/* Floating stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-emerald-400">{plant.partsUsed.length}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wide">Parts Used</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-400">{plant.therapeuticUses.length}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wide">Benefits</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-400">{plant.medicinalProperties.length}</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wide">Properties</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-emerald-500/10 via-transparent to-transparent blur-3xl"
          />
        </div>
      </section>

      {/* Multimedia Gallery Section */}
      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-10"
          >
            Multimedia Gallery
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <span>📸</span> Plant Gallery
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((num) => (
                  <motion.div
                    key={num}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: num * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative aspect-square rounded-xl overflow-hidden border border-white/10 shadow-xl cursor-pointer"
                    onClick={() => setSelectedImage(`/images/${plantId.charAt(0).toUpperCase() + plantId.slice(1)}_${num}.jpg`)}
                  >
                    <img
                      src={`/images/${plantId.charAt(0).toUpperCase() + plantId.slice(1)}_${num}.jpg`}
                      alt={`${plant.commonName} - Image ${num}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `/images/placeholder.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                      <span className="text-4xl">🔍</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-slate-400 text-sm">Click on any image to view full size</p>
            </motion.div>

            {/* Video Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <span>🎥</span> Educational Video
              </h3>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/h0b-hK9-oqE`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0"
                />
              </div>
              <p className="text-slate-400 text-sm">
                Learn more about {plant.commonName} and its traditional uses in Ayurvedic medicine
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-emerald-400 transition-colors"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Full size plant image"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}

      {/* 3D Model Section */}
      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
              Interactive 3D Model
            </h2>
            
            <div className="h-[500px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900/50 to-black border border-white/10">
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <Suspense fallback={null}>
                  <PlantModel modelPath={`/models/${plantId.charAt(0).toUpperCase() + plantId.slice(1)}.glb`} />
                  <Environment preset="sunset" />
                </Suspense>
                <OrbitControls enableZoom={true} enablePan={false} autoRotate={false} />
              </Canvas>
            </div>
            
            <p className="text-center text-slate-400 mt-4 text-sm">
              Drag to rotate • Scroll to zoom
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Habitat Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-900/20 to-slate-900/30 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6"
            >
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="text-lg font-bold text-blue-300 mb-2">Habitat</h3>
              <p className="text-sm text-slate-400 mb-1">{plant.habitat.region}</p>
              <p className="text-xs text-slate-500">Origin: {plant.habitat.origin}</p>
            </motion.div>

            {/* Cultivation Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-amber-900/20 to-slate-900/30 backdrop-blur-xl border border-amber-500/20 rounded-2xl p-6"
            >
              <div className="text-3xl mb-3">🌾</div>
              <h3 className="text-lg font-bold text-amber-300 mb-2">Cultivation</h3>
              <p className="text-sm text-slate-400 mb-1">{plant.cultivation.climate}</p>
              <p className="text-xs text-slate-500">{plant.cultivation.soil}</p>
            </motion.div>

            {/* Parts Used Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-900/20 to-slate-900/30 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6"
            >
              <div className="text-3xl mb-3">🌱</div>
              <h3 className="text-lg font-bold text-green-300 mb-2">Parts Used</h3>
              <div className="flex flex-wrap gap-2">
                {plant.partsUsed.map((part) => (
                  <span key={part} className="px-2 py-1 bg-green-500/20 text-green-300 rounded-lg text-xs capitalize">
                    {part}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Dosage Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-900/20 to-slate-900/30 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6"
            >
              <div className="text-3xl mb-3">💊</div>
              <h3 className="text-lg font-bold text-purple-300 mb-2">Dosage</h3>
              <p className="text-sm text-slate-400 mb-1">{plant.dosage.form}</p>
              <p className="text-xs text-slate-500">{plant.dosage.amount}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Medicinal Properties Grid */}
      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-10"
          >
            Medicinal Properties
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {plant.medicinalProperties.map((property, index) => (
              <motion.div
                key={property}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-emerald-900/30 to-slate-900/30 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-4 text-center hover:border-emerald-500/50 transition-all"
              >
                <div className="text-3xl mb-2">✨</div>
                <h3 className="text-sm font-bold capitalize text-emerald-300">{property}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Therapeutic Uses - Bento Grid */}
      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-10"
          >
            Health Benefits
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plant.therapeuticUses.map((use, index) => (
              <motion.div
                key={use.condition}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-900/50 to-slate-900/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-emerald-500/50 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{index === 0 ? "🌡️" : index === 1 ? "🧘" : "🫁"}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{use.condition}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{use.benefit}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dosage Guide */}
      <section className="py-12 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-10"
          >
            Usage Guide
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-900/50 to-slate-900/30 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="p-8 text-center border-b md:border-b-0 md:border-r border-white/10">
                <div className="text-4xl mb-4">🍵</div>
                <h3 className="text-lg font-bold mb-2 text-emerald-400">Form</h3>
                <p className="text-slate-300">{plant.dosage.form}</p>
              </div>
              <div className="p-8 text-center border-b md:border-b-0 md:border-r border-white/10">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-bold mb-2 text-emerald-400">Amount</h3>
                <p className="text-slate-300">{plant.dosage.amount}</p>
              </div>
              <div className="p-8 text-center">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-lg font-bold mb-2 text-emerald-400">Frequency</h3>
                <p className="text-slate-300">{plant.dosage.frequency}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Disease Categories */}
      <section className="py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-10"
          >
            Treats Conditions
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {plant.diseaseCategories.map((disease) => (
              <span
                key={disease}
                className="px-6 py-3 bg-gradient-to-r from-emerald-900/30 to-lime-900/30 text-emerald-300 border border-emerald-500/30 rounded-full text-sm font-medium backdrop-blur-xl hover:border-emerald-500/60 hover:scale-105 transition-all capitalize"
              >
                {disease}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Precautions */}
      <section className="py-12 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-8"
          >
            Important Precautions
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-red-900/20 to-slate-900/30 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="text-3xl">⚠️</div>
              <h3 className="text-xl font-bold text-red-300">Please Note</h3>
            </div>
            <ul className="space-y-3">
              {plant.precautions.map((precaution, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-3 text-slate-300"
                >
                  <span className="text-red-400 font-bold">•</span>
                  <span>{precaution}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* My Garden Section - Bookmark & Notes */}
      <section className="py-12 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-10"
          >
            Add to My Garden
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bookmark Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-emerald-900/20 to-slate-900/30 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-8 text-center"
            >
              <div className="text-5xl mb-4">🔖</div>
              <h3 className="text-2xl font-bold mb-4">Bookmark This Plant</h3>
              <p className="text-slate-400 mb-6">Save {plant.commonName} to your personal garden collection for quick access</p>
              <div className="flex justify-center scale-125">
                <BookmarkButton plantId={plant.id} />
              </div>
            </motion.div>

            {/* Notes Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-900/20 to-slate-900/30 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">📝</div>
                <h3 className="text-2xl font-bold">Personal Notes</h3>
              </div>
              <p className="text-slate-400 mb-4 text-sm">Add your observations, growing tips, or usage notes</p>
              <div className="bg-slate-900/50 rounded-2xl overflow-hidden">
                <NoteEditor plantId={plant.id} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-400 bg-clip-text text-transparent">
            Discover More Plants
          </h2>
          <p className="text-lg text-slate-400 mb-6 max-w-2xl mx-auto">
            Continue your journey through Ayurvedic wisdom
          </p>
          <button
            onClick={onBack}
            className="px-10 py-3 bg-gradient-to-r from-emerald-500 to-lime-500 text-black font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
          >
            Back to Plants
          </button>
        </motion.div>
      </section>
    </div>
  );
}
