import { MeshReflectorMaterial } from "@react-three/drei";
import ProjectScreen from "./ProjectScreen";

interface SceneProps {
  currentIndex: number;
}

export default function Scene({ currentIndex }: SceneProps) {

  return (
    <>
      <group position={[0, -0.5, 0]}>
        <group position={[0, 0, 6]}>
          <ProjectScreen activeIndex={currentIndex} /> 
        </group>
        {/* floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[80, 50]} />
          <MeshReflectorMaterial
            envMapIntensity={0}
            blur={[20, 10]} // much lower blur
            resolution={1024}
            mixBlur={0.4}
            mixStrength={40}
            roughness={0.35}
            depthScale={0.8}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.2}
            color="#1a1a1f" // slightly lighter dark
            metalness={0}
          />
        </mesh>
      </group>
    </>
  );
}
