import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sparkles, useGLTF, Clone, Float } from '@react-three/drei';
import * as THREE from 'three';

interface PlantProps {
    name: string;
    position: [number, number, number];
    isHovered: boolean;
}

const PLANTS: { name: string; position: [number, number, number] }[] = [
    { name: 'Tulsi', position: [-3, 0, -6] },
    { name: 'Turmeric', position: [3, 0, -6] },
    { name: 'Neem', position: [-3, 0, -10] },
    { name: 'Amla', position: [3, 0, -10] },
    { name: 'Giloy', position: [-3, 0, -3] },
    { name: 'Ashwagandha', position: [3, 0, -14] },
    { name: 'Brahmi', position: [-3, 0, -18] },
    { name: 'Ginger', position: [3, 0, -18] },
    { name: 'Aloe Vera', position: [0, 0, -22] },
];

function Plant({ name, position, isHovered }: PlantProps) {
    const group = useRef<THREE.Group>(null);
    // Ensure the path to the model is correct relative to the public folder
    const { scene } = useGLTF('/models/plant.glb');

    // Smooth scale effect
    useFrame((_state, delta) => {
        if (group.current) {
            const targetScale = isHovered ? 0.3 : 0.25;
            group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
        }
    });

    return (
        <group ref={group} position={position} scale={[0.25, 0.25, 0.25]}>
            {/* Interaction Hitbox - Transparent Cylinder */}
            <mesh position={[0, 0.75, 0]} userData={{ isPlant: true, name: name }}>
                <cylinderGeometry args={[0.6, 0.6, 1.5, 8]} />
                <meshBasicMaterial transparent opacity={0.0} color="red" depthWrite={false} />
            </mesh>

            <Clone object={scene} />

            {/* Hover Effects */}
            {isHovered && (
                <>
                    <pointLight position={[0, 2, 0]} intensity={2} distance={3} color="#fbbf24" />
                    <Float speed={4} rotationIntensity={0.5} floatIntensity={0.5}>
                        <Sparkles
                            count={30}
                            scale={2}
                            size={6}
                            speed={0.8}
                            opacity={1}
                            color="#fbbf24"
                            position={[0, 1, 0]}
                        />
                    </Float>
                </>
            )}
        </group>
    );
}

interface PlantSystemProps {
    hoveredPlant: string | null;
    setHoveredPlant: (name: string | null) => void;
}

export function PlantSystem({ hoveredPlant, setHoveredPlant }: PlantSystemProps) {
    const { camera, scene } = useThree();
    const raycaster = useRef(new THREE.Raycaster());

    // Create a center vector for the raycaster
    const center = new THREE.Vector2(0, 0);

    useFrame(() => {
        // Cast ray from center of screen
        raycaster.current.setFromCamera(center, camera);

        // Intersect with all objects in the scene
        // We filter by checking userData.isPlant
        const intersects = raycaster.current.intersectObjects(scene.children, true);

        // Find the first object that is a plant
        const plantHit = intersects.find(hit => hit.object.userData.isPlant);

        if (plantHit) {
            if (hoveredPlant !== plantHit.object.userData.name) {
                setHoveredPlant(plantHit.object.userData.name);
            }
        } else {
            if (hoveredPlant !== null) {
                setHoveredPlant(null);
            }
        }
    });

    return (
        <group>
            {PLANTS.map((plant) => (
                <Plant
                    key={plant.name}
                    {...plant}
                    isHovered={hoveredPlant === plant.name}
                />
            ))}
        </group>
    );
}
