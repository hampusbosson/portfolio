import { MeshReflectorMaterial } from "@react-three/drei";
import ProjectScreen from "./screen/ProjectScreen";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

interface SceneProps {
  currentIndex: number;
  onOpenProjectInfo: () => void;
}

export default function Scene({ currentIndex, onOpenProjectInfo }: SceneProps) {
  const screenRef = useRef<THREE.Group>(null!);
  const { pointer } = useThree();

  /**
   * ROTATE SCREEN SLIGHTLY ON MOUSE MOVEMENT
   */
  useFrame((_, delta) => {
    if (!screenRef.current) return;

    const targetRotX = pointer.y * -0.1; // tilt up/down
    const targetRotY = pointer.x * 0.1; // tilt left/right

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
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[80, 50]} />
          <MeshReflectorMaterial
            envMapIntensity={0}
            blur={[50, 50]}
            resolution={1024}
            mixBlur={0.2}
            mixStrength={80}
            roughness={1}
            depthScale={1.5}
            minDepthThreshold={0.1}
            maxDepthThreshold={1.4}
            color="#050505"
            metalness={0.5}
          />
        </mesh>
      </group>
    </>
  );
}
