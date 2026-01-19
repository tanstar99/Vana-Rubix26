import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Plant } from '../types';
import PlantModel from './PlantModel';

interface GardenSceneProps {
  plants: Plant[];
  onPlantClick: (plant: Plant) => void;
}

export default function GardenScene({ plants, onPlantClick }: GardenSceneProps) {
  return (
    <div className="w-full h-[600px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900/50 via-blue-900/30 to-purple-900/50 border border-blue-500/30 shadow-2xl shadow-blue-500/20" style={{ animation: 'scaleIn 0.8s ease-out 0.4s both' }}>
      <Canvas
        camera={{ position: [10, 8, 10], fov: 50 }}
        shadows
      >
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          color="#60a5fa"
        />
        <pointLight position={[-10, 10, -10]} intensity={0.8} color="#8b5cf6" />
        <pointLight position={[10, 5, 10]} intensity={0.6} color="#ec4899" />
        <spotLight position={[0, 15, 0]} intensity={0.5} color="#3b82f6" angle={0.3} penumbra={1} />

        {/* Futuristic Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial 
            color="#0f172a" 
            roughness={0.7}
            metalness={0.3}
            emissive="#1e3a8a"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Plants */}
        {plants.map((plant) => (
          <PlantModel key={plant.id} plant={plant} onClick={onPlantClick} />
        ))}

        {/* Environment and controls */}
        <Environment preset="night" />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />

        {/* Futuristic Grid helper */}
        <gridHelper args={[20, 20, '#3b82f6', '#1e40af']} position={[0, -0.49, 0]} />
        
        {/* Additional atmospheric fog */}
        <fog attach="fog" args={['#0f172a', 10, 30]} />
      </Canvas>
    </div>
  );
}
