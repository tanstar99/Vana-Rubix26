import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PointerLockControls, KeyboardControls, Environment } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Player } from '../three/game/Player';
import { PlantSystem } from '../three/game/Plants';
import { Ground } from '../three/game/Ground';
import { Greenhouse } from '../three/game/Greenhouse';
import PlantDetailView from '../components/PlantDetailView';

// Map 3D plant names to the IDs used in your routing/database
const PLANT_ID_MAP: Record<string, string> = {
  'Tulsi': 'tulsi',
  'Turmeric': 'turmeric',
  'Neem': 'neem',
  'Amla': 'amla',
  'Giloy': 'giloy',
  'Ashwagandha': 'ashwagandha',
  'Brahmi': 'brahmi',
  'Ginger': 'ginger',
  'Aloe Vera': 'aloe-vera'
};

export default function GardenPage() {
  const [locked, setLocked] = useState(false);
  const [hoveredPlant, setHoveredPlant] = useState<string | null>(null);
  const [selectedPlantId, setSelectedPlantId] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseDown = () => {
      if (locked && hoveredPlant) {
        // If we clicked on a plant, open the overlay
        const plantId = PLANT_ID_MAP[hoveredPlant];
        if (plantId) {
          document.exitPointerLock();
          setSelectedPlantId(plantId);
        }
      } else if (!locked && !hoveredPlant && !selectedPlantId) {
        // Lock pointer if clicking to resume game, ONLY if not viewing details
        // This logic is partially handled by PointerLockControls onLock, but often needs manual trigger safely
      }
    };

    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, [locked, hoveredPlant, selectedPlantId]);

  const handleCloseDetails = () => {
    setSelectedPlantId(null);
    // Automatically re-lock pointer to resume game experience? 
    // Typically games wait for user to click again to lock, so we leave it unlocked.
  };

  return (
    <div className="w-full h-screen relative bg-[#1a1a1a]">
      {/* Keyboard Controls Wrapper */}
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
          { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
          { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
          { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
          { name: 'jump', keys: ['Space'] },
        ]}
      >
        {/* 
                   When details are open, we probably want to pause physics or just ignore inputs.
                   The KeyboardControls will still capture inputs unless we disable them or the component unmounts.
                   However, since we are overlaying, the canvas is still there. 
                */}
        <Canvas shadows camera={{ fov: 50 }}>
          {/* Atmospheric Lighting */}
          <Environment preset="forest" background blur={0.6} />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
          <fog attach="fog" args={['#1a2e1a', 10, 50]} />

          <Physics gravity={[0, -9.81, 0]}>
            <Player active={!selectedPlantId} />
            <Ground />
            <Greenhouse />
          </Physics>

          {/* Only show hover effects if we aren't viewing details */}
          {!selectedPlantId && (
            <PlantSystem hoveredPlant={hoveredPlant} setHoveredPlant={setHoveredPlant} />
          )}

          {!selectedPlantId && (
            <PointerLockControls
              onLock={() => setLocked(true)}
              onUnlock={() => setLocked(false)}
            />
          )}
        </Canvas>

        {/* UI Overlay */}

        {/* Crosshair (Hide when details are open) */}
        {!selectedPlantId && (
          <div
            className={`absolute top-1/2 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 z-50 ${hoveredPlant ? 'bg-amber-400 scale-150 shadow-[0_0_10px_#fbbf24]' : 'bg-white shadow-[0_0_4px_rgba(0,0,0,0.5)]'}`}
          />
        )}

        {/* Plant Label (Hide when details are open) */}
        {!selectedPlantId && (
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 pointer-events-none transition-all duration-300 ease-in-out border border-amber-400/30 shadow-lg px-6 py-3 rounded-full bg-black/60 backdrop-blur-md text-amber-400 text-lg font-medium tracking-wide
                        ${hoveredPlant ? 'top-[58%] opacity-100' : 'top-[60%] opacity-0'}`}
          >
            {hoveredPlant} <span className="text-xs opacity-70 ml-2">(Click to Open)</span>
          </div>
        )}

        {/* Plant Detail Overlay */}
        {selectedPlantId && (
          <PlantDetailView
            plantId={selectedPlantId}
            onBack={handleCloseDetails}
            isOverlay={true}
          />
        )}

        {/* Instructions */}
        {!locked && !selectedPlantId && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white bg-white/10 backdrop-blur-md border border-white/20 p-10 rounded-3xl shadow-2xl z-40 max-w-lg w-full">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-br from-green-300 to-emerald-500 bg-clip-text text-transparent drop-shadow-sm font-serif">
              Herbal Garden
            </h1>
            <p className="text-lg opacity-80 font-light mb-8">Experience the serenity.</p>

            <div className="flex justify-center gap-2 mb-8">
              {['W', 'A', 'S', 'D'].map((key) => (
                <span key={key} className="inline-block bg-white/20 border border-white/10 rounded-md px-3 py-1 font-semibold text-sm backdrop-blur-sm">
                  {key}
                </span>
              ))}
              <span className="self-center ml-2 text-sm opacity-70">to Move</span>
            </div>

            <p className="text-sm opacity-60 animate-pulse">Click to Start</p>
          </div>
        )}
      </KeyboardControls>
    </div>
  );
}
