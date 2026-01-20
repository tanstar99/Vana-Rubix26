import { RigidBody } from '@react-three/rapier';

export function Ground() {
    return (
        <RigidBody type="fixed">
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#1a2e1a" roughness={0.8} />
            </mesh>
        </RigidBody>
    );
}
