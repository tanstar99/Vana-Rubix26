import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useKeyboardControls } from '@react-three/drei';
import { RigidBody, CapsuleCollider, RapierRigidBody } from '@react-three/rapier';

const SPEED = 5;
const direction = new Vector3();
const frontVector = new Vector3();
const sideVector = new Vector3();

interface PlayerProps {
    active?: boolean;
}

export function Player({ active = true }: PlayerProps) {
    const ref = useRef<RapierRigidBody>(null);
    const { camera } = useThree();
    const [, getKeys] = useKeyboardControls();

    useFrame(() => {
        if (!active) {
            // Stop movement when npt active
            if (ref.current) {
                const currentVel = ref.current.linvel();
                ref.current.setLinvel({ x: 0, y: currentVel.y, z: 0 }, true);
            }
            return;
        }

        const { forward, backward, left, right } = getKeys();

        // Calculate movement direction
        frontVector.set(0, 0, Number(backward) - Number(forward));
        sideVector.set(Number(left) - Number(right), 0, 0);
        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(camera.rotation);

        // Apply velocity to the rigid body
        if (ref.current) {
            const currentVel = ref.current.linvel();
            ref.current.setLinvel({ x: direction.x, y: currentVel.y, z: direction.z }, true);
        }

        // Sync camera to player position
        if (ref.current) {
            const translation = ref.current.translation();
            camera.position.set(translation.x, translation.y + 1.5, translation.z);
        }
    });

    return (
        <RigidBody ref={ref} colliders={false} mass={1} type="dynamic" position={[0, 10, 0]} enabledRotations={[false, false, false]} canSleep={false}>
            <CapsuleCollider args={[0.75, 0.5]} />
        </RigidBody>
    );
}
