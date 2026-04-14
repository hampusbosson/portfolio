import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.tsx";
import SceneOverlay from "./overlay/sceneOverlay.tsx";
import { Suspense, lazy, useEffect, useState } from "react";
import type { Page } from "./types/types.ts";
import MinimapOverlay from "./screens/projects/Minimap.tsx";
import ControlsOverlay from "./screens/projects/ControlsOverlay.tsx";
import { sfx } from "./audio/sfx.ts";
import AssistantOrbOverlay from "./overlay/chat/AssistantOrbOverlay.tsx";
import MobileProjectControls from "./screens/projects/MobileProjectControls.tsx";
import { projects } from "./content/projects.ts";
import { useIsMobile } from "./utils/useIsMobile.ts";
import LoadingOverlay from "./overlay/LoadingOverlay.tsx";
import ProjectInfoOverlay from "./screens/projects/ProjectInfoOverlay.tsx";

const ChatOverlay = lazy(() => import("./overlay/chat/ChatOverlay.tsx"));

function OverlayFallback() {
  return (
    <div className="fixed inset-0 z-[135] bg-black/72 backdrop-blur-md" />
  );
}

export default function App() {
  const isMobile = useIsMobile();
  const [activePage, setActivePage] = useState<Page>("start");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [bubblePopCount, setBubblePopCount] = useState(0);

  /** INIT SOUND */
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
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black">
      <div
        className="absolute left-0 top-0 w-full"
        style={{
          height: isMobile
            ? "var(--mobile-scene-height, 100dvh)"
            : "100dvh",
        }}
      >
        <Canvas
          frameloop="always"
          dpr={[1.25, 1.5]}
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
            isProjectInfoOpen={isProjectInfoOpen}
            isChatOpen={isChatOpen}
            onBubblePopped={() => setBubblePopCount((prev) => prev + 1)}
          />
        </Canvas>
      </div>
      <LoadingOverlay />
      <SceneOverlay activePage={activePage} setActivePage={setActivePage} />
      {activePage === "start" && bubblePopCount > 0 ? (
        <div
          className={`pointer-events-none fixed z-[55] ${
            isMobile ? "bottom-6 left-6" : "top-6 right-6"
          }`}
        >
          <p className="text-sm font-medium tracking-wide text-white/82">
            Bubbles popped: {bubblePopCount}
          </p>
        </div>
      ) : null}
      <AssistantOrbOverlay
        activePage={activePage}
        onOpenChat={() => setIsChatOpen(true)}
      />
      <Suspense fallback={isChatOpen ? <OverlayFallback /> : null}>
        <ChatOverlay isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </Suspense>
      {activePage === "projects" && (
        <>
          {isMobile ? (
            <MobileProjectControls
              currentIndex={currentIndex}
              totalProjects={projects.length}
              onPrev={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              onNext={() =>
                setCurrentIndex((prev) =>
                  Math.min(projects.length - 1, prev + 1),
                )
              }
            />
          ) : (
            <>
              <ControlsOverlay />
              <MinimapOverlay
                currentIndex={currentIndex}
                onSelect={setCurrentIndex}
              />
            </>
          )}
          {isProjectInfoOpen && (
            <ProjectInfoOverlay
              currentIndex={currentIndex}
              onClose={() => setIsProjectInfoOpen(false)}
              isEscapeEnabled={!isChatOpen}
            />
          )}
        </>
      )}
    </div>
  );
}
