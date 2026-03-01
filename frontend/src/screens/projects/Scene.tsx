import ProjectScreen from "./screen/ProjectScreen";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import ProjectFloor from "./ProjectFloor";

interface SceneProps {
  currentIndex: number;
  onOpenProjectInfo: () => void;
  isPaused: boolean;
}

export default function Scene({
  currentIndex,
  onOpenProjectInfo,
  isPaused,
}: SceneProps) {
  const screenRef = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  /**
   * ROTATE SCREEN SLIGHTLY ON MOUSE MOVEMENT
   */
  useFrame((_, delta) => {
    if (!screenRef.current) return;

    const targetRotX = pointer.y * -0.05; // tilt up/down
    const targetRotY = pointer.x * 0.05; // tilt left/right

    // Smooth damping
    screenRef.current.rotation.x = THREE.MathUtils.lerp(
      screenRef.current.rotation.x,
      targetRotX,
      4 * delta,
    );

    screenRef.current.rotation.y = THREE.MathUtils.lerp(
      screenRef.current.rotation.y,
      targetRotY,
      4 * delta,
    );

    // move position slightly
    screenRef.current.position.x = THREE.MathUtils.lerp(
      screenRef.current.position.x,
      pointer.x * 0.1,
      3 * delta,
    );
  });

  return (
    <>
      <group position={[0, -0.5, 0]}>
        {/* screen */}
        <group position={[0, 0, 5]} ref={screenRef}>
          <ProjectScreen
            activeIndex={currentIndex}
            onOpenProjectInfo={onOpenProjectInfo}
          />
        </group>
        {/* floor */}
        <ProjectFloor isPaused={isPaused} />
      </group>
    </>
  );
}
