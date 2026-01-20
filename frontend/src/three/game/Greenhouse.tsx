import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

export function Greenhouse() {
    const { scene } = useGLTF('/models/greenhouse.glb');
    return (
        <RigidBody type="fixed" colliders="trimesh">
            <primitive object={scene} scale={[1, 1, 1]} position={[0, 0, 0]} />
        </RigidBody>
    )
}
