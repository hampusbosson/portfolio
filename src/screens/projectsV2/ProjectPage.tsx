import {
  MeshReflectorMaterial,
  useTexture,
  Environment,
} from "@react-three/drei";
import ProjectDisplay from "./ProjectDisplay";


export default function ProjectPage() {
  const imageTexture = useTexture("/sneaker-store.png");

  return (
    <>
      <color attach="background" args={["#191920"]} />
      <fog attach="fog" args={["#191920", 0, 25]} />
      <group position={[0, -0.5, 0]}>
        <ProjectDisplay imageTexture={imageTexture} />
        {/** floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[100, 50]}
            resolution={512}
            mixBlur={1}
            mixStrength={40}
            roughness={0.9}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#050505"
            metalness={0.5}
          />
        </mesh>
      </group>
      <Environment preset="city" />
    </>
  );
}
