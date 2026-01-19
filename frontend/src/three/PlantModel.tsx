import { useRef, useState } from 'react';
import { Mesh } from 'three';
import { Plant } from '../types';

interface PlantModelProps {
  plant: Plant;
  onClick: (plant: Plant) => void;
}

export default function PlantModel({ plant, onClick }: PlantModelProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <group position={[plant.gardenPlacement.x, plant.gardenPlacement.y, plant.gardenPlacement.z]}>
      {/* Futuristic cone as plant representation */}
      <mesh
        ref={meshRef}
        onClick={() => onClick(plant)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.3 : 1}
      >
        <coneGeometry args={[0.5, 1.5, 8]} />
        <meshStandardMaterial 
          color={hovered ? '#60a5fa' : '#3b82f6'} 
          emissive={hovered ? '#3b82f6' : '#1e40af'}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Neon Marker sphere on top */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial 
          color={hovered ? '#ec4899' : '#8b5cf6'} 
          emissive={hovered ? '#ec4899' : '#8b5cf6'} 
          emissiveIntensity={hovered ? 1.2 : 0.8}
          toneMapped={false}
        />
      </mesh>
      
      {/* Glowing ring at base when hovered */}
      {hovered && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
          <ringGeometry args={[0.6, 0.8, 32]} />
          <meshBasicMaterial color="#8b5cf6" opacity={0.5} transparent />
        </mesh>
      )}

      {/* Label when hovered */}
      {hovered && (
        <group position={[0, 2, 0]}>
          {/* You can add text here if needed using @react-three/drei's Text component */}
        </group>
      )}
    </group>
  );
}
