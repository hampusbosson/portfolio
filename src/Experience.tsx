import { OrbitControls, Stars } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Blackhole from "./models/Blackhole";
import { Suspense } from "react";
import Ship from "./models/Ship";
import Overlay from "./overlay/Overlay";

export default function Experience() {
  return (
    <>
      <Overlay />
      <Perf position="bottom-right" />
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
      <Suspense>
        <Blackhole />
      </Suspense>
      <Suspense>
        <Ship />
      </Suspense>
    </>
  );
}
