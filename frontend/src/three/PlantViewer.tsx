import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';

export default function PlantViewer() {
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden bg-gradient-to-b from-emerald-900/30 to-green-900/30">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 5]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <spotLight position={[-5, 5, 2]} intensity={0.5} color="#fbbf24" />

        {/* Plant model placeholder - simple tree shape */}
        <group>
          {/* Trunk */}
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.2, 0.3, 1, 8]} />
            <meshStandardMaterial color="#8b4513" roughness={0.8} />
          </mesh>

          {/* Foliage - cone shape */}
          <mesh position={[0, 1.5, 0]}>
            <coneGeometry args={[0.8, 1.5, 8]} />
            <meshStandardMaterial color="#22c55e" roughness={0.6} />
          </mesh>

          {/* Additional foliage layers */}
          <mesh position={[0, 2.2, 0]}>
            <coneGeometry args={[0.6, 1.2, 8]} />
            <meshStandardMaterial color="#16a34a" roughness={0.6} />
          </mesh>
        </group>

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <circleGeometry args={[3, 32]} />
          <meshStandardMaterial color="#1a4d2e" roughness={0.9} />
        </mesh>

        {/* Environment and controls */}
        <Environment preset="forest" />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={8}
          autoRotate
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
}
