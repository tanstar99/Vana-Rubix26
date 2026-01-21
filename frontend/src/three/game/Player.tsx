import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useKeyboardControls } from '@react-three/drei';
import { RigidBody, CapsuleCollider, RapierRigidBody } from '@react-three/rapier';
import { useAppStore } from '../../store/useAppStore';

const WALK_SPEED = 5;
const RUN_SPEED = 12; // Increased run speed
const BOB_SPEED = 12;
const BOB_AMPLITUDE = 0.08;

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

    const { playerPosition, setPlayerPosition } = useAppStore();
    const posRef = useRef<[number, number, number]>(playerPosition);
    const bobTimer = useRef(0);

    useEffect(() => {
        return () => {
            if (posRef.current) {
                setPlayerPosition(posRef.current);
            }
        };
    }, [setPlayerPosition]);

    useFrame((_, delta) => {
        if (!active) {
            // Stop movement when not active
            if (ref.current) {
                const currentVel = ref.current.linvel();
                ref.current.setLinvel({ x: 0, y: currentVel.y, z: 0 }, true);
            }
            return;
        }

        const { forward, backward, left, right, run } = getKeys();

        // Calculate movement direction
        frontVector.set(0, 0, Number(backward) - Number(forward));
        sideVector.set(Number(left) - Number(right), 0, 0);
        direction.subVectors(frontVector, sideVector).normalize();

        const speed = run ? RUN_SPEED : WALK_SPEED;
        direction.multiplyScalar(speed).applyEuler(camera.rotation);

        // Apply velocity to the rigid body
        if (ref.current) {
            const currentVel = ref.current.linvel();
            ref.current.setLinvel({ x: direction.x, y: currentVel.y, z: direction.z }, true);
        }

        // Head Bob Logic
        if (forward || backward || left || right) {
            bobTimer.current += delta * (run ? BOB_SPEED * 1.5 : BOB_SPEED);
        } else {
            // Reset bob smoothly or just reset to 0 for now
            bobTimer.current = 0;
        }

        // Sync camera to player position
        if (ref.current) {
            const translation = ref.current.translation();
            posRef.current = [translation.x, translation.y, translation.z];

            const bobOffset = (forward || backward || left || right)
                ? Math.sin(bobTimer.current) * BOB_AMPLITUDE
                : 0;

            camera.position.set(
                translation.x,
                translation.y + 1.5 + bobOffset,
                translation.z
            );
        }
    });

    return (
        <RigidBody ref={ref} colliders={false} mass={1} type="dynamic" position={playerPosition} enabledRotations={[false, false, false]} canSleep={false}>
            <CapsuleCollider args={[0.75, 0.5]} />
        </RigidBody>
    );
}