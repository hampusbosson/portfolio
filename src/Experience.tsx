import { OrbitControls, Stars } from "@react-three/drei";
import { Perf } from "r3f-perf";

export default function Experience() {
  return (
    <>
      <Perf position="top-left" showGraph deepAnalyze />
      <Stars
        radius={20}
        depth={30}
        count={2000}
        factor={2}
        saturation={10}
        fade
        speed={1.5}
      />
      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />
      <OrbitControls makeDefault />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="white" />
      </mesh>
    </>
  );
}
