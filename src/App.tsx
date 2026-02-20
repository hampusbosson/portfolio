import { Canvas } from "@react-three/fiber";
//import Experience from "./Experience.tsx";
// import { useState } from "react";
import ExperienceNew from "./ExperienceNew.tsx";

export default function App() {

  return (
    <Canvas
      frameloop="always"
      dpr={1.5}
      gl={{ powerPreference: "high-performance" }}
      camera={{
        fov: 70,
        near: 0.1,
        far: 200,
        position: [0, 0, 2],
      }}
    >
      <ExperienceNew />
    </Canvas>
    // </>
  );
}
