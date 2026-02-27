import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.tsx";
import SceneOverlay from "./overlay/sceneOverlay.tsx";
import { useEffect, useState } from "react";
import type { Page } from "./types/types.ts";
import MinimapOverlay from "./screens/projects/Minimap.tsx";
import ControlsOverlay from "./screens/projects/ControlsOverlay.tsx";
import { Perf } from "r3f-perf";
import ProjectInfoOverlay from "./screens/projects/ProjectInfoOverlay.tsx";
import { sfx } from "./audio/sfx.ts";
import AssistantOrbOverlay from "./overlay/AssistantOrbOverlay.tsx";

export default function App() {
  const [activePage, setActivePage] = useState<Page>("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false);

  useEffect(() => {
    sfx.init();

    const unlock = () => {
      sfx.unlock();
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, []);

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
          position: [0, 0, 0],
        }}
      >
        <Experience
          activePage={activePage}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onOpenProjectInfo={() => setIsProjectInfoOpen(true)}
        />
        <Perf position="hidden" />
      </Canvas>
      <SceneOverlay activePage={activePage} setActivePage={setActivePage} />
      <AssistantOrbOverlay />
      {activePage === "projects" && (
        <>
          <ControlsOverlay />
          <MinimapOverlay
            currentIndex={currentIndex}
            onSelect={setCurrentIndex}
          />
          {isProjectInfoOpen && (
            <ProjectInfoOverlay
              currentIndex={currentIndex}
              onClose={() => setIsProjectInfoOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
