import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface ShipProps {
  shipRef: React.RefObject<THREE.Object3D | null>;
  activeScreen: string;
}

export default function Ship({ shipRef, activeScreen }: ShipProps) {
  const snapTargetRef = useRef<number | null>(null);
  const wasSnapModeRef = useRef(false);

  // 12 equal orientations around a circle => 30deg per module.
  const SNAP_STEP = Math.PI / 6;
  // Keep 0 by default; tune only if the model needs a fixed visual alignment offset.
  const SNAP_OFFSET = 0;
  const SNAP_EPSILON = 0.001;
  const SNAP_SMOOTHNESS = 10;

  useFrame((_, delta) => {
    if (!shipRef.current) {
      return;
    }

    const isSnapMode = activeScreen === "projects";

    if (!isSnapMode) {
      wasSnapModeRef.current = false;
      snapTargetRef.current = null;
      shipRef.current.rotation.z += delta * -0.25;
      return;
    }

    if (!wasSnapModeRef.current || snapTargetRef.current === null) {
      const current = shipRef.current.rotation.z;
      const nearestStep = Math.round((current - SNAP_OFFSET) / SNAP_STEP);
      snapTargetRef.current = nearestStep * SNAP_STEP + SNAP_OFFSET;
      wasSnapModeRef.current = true;
    }

    const target = snapTargetRef.current;
    if (target === null) {
      return;
    }

    const next = THREE.MathUtils.damp(
      shipRef.current.rotation.z,
      target,
      SNAP_SMOOTHNESS,
      delta,
    );

    if (Math.abs(target - next) < SNAP_EPSILON) {
      shipRef.current.rotation.z = target;
      return;
    }

    shipRef.current.rotation.z = next;
  });

  const model = useGLTF("/ship-lowres/scene.gltf");

  return (
    <group ref={shipRef} position={[0.6, 0, 0]} rotation={[0, 0.5, 0]}>
      <primitive
        object={model.scene}
        scale={0.01}
        rotation={[0, Math.PI / 2, 0]}
      />
    </group>
  );
}

useGLTF.preload("/ship-lowres/scene.gltf");
