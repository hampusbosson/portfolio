import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.tsx";
import SceneOverlay from "./overlay/sceneOverlay.tsx";
import { useState } from "react";
import type { Page } from "./types/types.ts";

export default function App() {
  const [activePage, setActivePage] = useState<Page>("start");

  return (
    <div className="relative h-screen w-screen">
      <Canvas
        frameloop="always"
        dpr={1.5}
        gl={{ powerPreference: "high-performance" }}
        camera={{
          fov: 30,
          near: 0.1,
          far: 200,
          position: [0, 0, 5],
        }}
      >
        <Experience activePage={activePage}/>
      </Canvas>

      <SceneOverlay setActivePage={setActivePage}/>
    </div>
  );
}
