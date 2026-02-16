import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Canvas } from "@react-three/fiber";
//import { KeyboardControls } from '@react-three/drei'
import Experience from "./Experience.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 0, 10],
      }}
    >
      <Experience />
    </Canvas>
  </StrictMode>,
);
