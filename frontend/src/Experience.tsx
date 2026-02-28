import ProjectPage from "./screens/projects/ProjectPage";
import SetCamera from "./camera/setCamera";
import type { Page } from "./types/types";
import { Environment } from "@react-three/drei";
import StartPage from "./screens/start/StartPage";
import AboutMePage from "./screens/about-me/AboutMePage";
import type React from "react";
import { EffectComposer, Vignette } from "@react-three/postprocessing";

interface ExperienceProps {
  activePage: Page;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  onOpenProjectInfo: () => void;
  isProjectInfoOpen: boolean;
}

export default function Experience({
  activePage,
  currentIndex,
  setCurrentIndex,
  onOpenProjectInfo,
  isProjectInfoOpen,
}: ExperienceProps) {
  return (
    <>
      <EffectComposer>
        <Vignette offset={0.32} darkness={0.5} eskil={false} />
      </EffectComposer>
      <color attach="background" args={["#191920"]} />
      <fog attach="fog" args={["#191920", 7, 15]} />
      <SetCamera activeScreen={activePage} />
      <StartPage isActive={activePage === "start"} />
      <AboutMePage isActive={activePage === "about"} />
      <ProjectPage
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        isActive={activePage === "projects"}
        onOpenProjectInfo={onOpenProjectInfo}
        isProjectInfoOpen={isProjectInfoOpen}
      />
      <Environment
        preset={"city"}
        background={false}
        environmentIntensity={0.5}
      />
    </>
  );
}
