import SetCamera from "./camera/setCamera";
import type { Page } from "./types/types";
import { Environment } from "@react-three/drei";
import StartPage from "./screens/start/StartPage";
import { lazy, Suspense, useEffect } from "react";
import type React from "react";
import { EffectComposer, Vignette } from "@react-three/postprocessing";

const AboutMePage = lazy(() => import("./screens/about-me/AboutMePage"));
const ProjectPage = lazy(() => import("./screens/projects/ProjectPage"));

function preloadSecondaryPages() {
  void import("./screens/about-me/AboutMePage");
  void import("./screens/projects/ProjectPage");
}

interface ExperienceProps {
  activePage: Page;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  onOpenProjectInfo: () => void;
  isProjectInfoOpen: boolean;
  isChatOpen: boolean;
  onBubblePopped: () => void;
}

export default function Experience({
  activePage,
  currentIndex,
  setCurrentIndex,
  onOpenProjectInfo,
  isProjectInfoOpen,
  isChatOpen,
  onBubblePopped,
}: ExperienceProps) {
  useEffect(() => {
    const preload = () => {
      preloadSecondaryPages();
    };

    const idleWindow = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (
          callback: IdleRequestCallback,
          options?: IdleRequestOptions,
        ) => number;
        cancelIdleCallback?: (handle: number) => void;
      };

    if (idleWindow.requestIdleCallback && idleWindow.cancelIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(preload, { timeout: 1500 });
      return () => idleWindow.cancelIdleCallback?.(idleId);
    }

    const timeout = window.setTimeout(preload, 1000);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <>
      <EffectComposer>
        <Vignette offset={0.32} darkness={0.6} eskil={false} />
      </EffectComposer>
      <color attach="background" args={["#191920"]} />
      <fog attach="fog" args={["#191920", 7, 15]} />
      <SetCamera activeScreen={activePage} />
      <StartPage
        isActive={activePage === "start"}
        onBubblePopped={onBubblePopped}
      />
      <Suspense fallback={null}>
        <AboutMePage isActive={activePage === "about"} />
      </Suspense>
      <Suspense fallback={null}>
        <ProjectPage
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          isActive={activePage === "projects"}
          onOpenProjectInfo={onOpenProjectInfo}
          isProjectInfoOpen={isProjectInfoOpen}
          isChatOpen={isChatOpen}
        />
      </Suspense>
      <Environment
        preset={"city"}
        background={false}
        environmentIntensity={0.5}
      />
    </>
  );
}
