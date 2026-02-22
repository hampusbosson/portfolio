import { Float, MeshReflectorMaterial, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import ProjectScreen from "./ProjectDisplay";
import type React from "react";
import { projects } from "../../content/projects";
import Minimap from "./Minimap";

interface SceneProps {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Scene({ currentIndex, setCurrentIndex }: SceneProps) {
  const scroll = useScroll();

  useFrame(() => {
    const raw = scroll.offset; // 0 → 1
    const index = Math.round(raw * (projects.length - 1));

    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  });

  return (
    <>
      <group position={[0, -0.5, 0]}>
        <Float floatIntensity={0.1} floatingRange={[0.1, 0.1]} rotationIntensity={0.1}>
          <ProjectScreen activeIndex={currentIndex} />
        </Float>

        <Minimap currentIndex={currentIndex} />

        {/* floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[80, 50]} />
          <MeshReflectorMaterial
            blur={[20, 10]} // much lower blur
            resolution={1024}
            mixBlur={0.4}
            mixStrength={40}
            roughness={0.25}
            depthScale={0.8}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.2}
            color="#ffffff" // slightly lighter dark
            metalness={0.9} // strong reflectivity
          />
        </mesh>
      </group>
    </>
  );
}
