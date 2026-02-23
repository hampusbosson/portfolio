import ProjectPage from "./screens/projects/ProjectPage";
import { Perf } from "r3f-perf";
import SetCamera from "./camera/setCamera";
import type { Page } from "./types/types";
import { Environment } from "@react-three/drei";
import StartPage from "./screens/start/StartPage";
import type React from "react";

interface ExperienceProps {
  activePage: Page;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Experience({
  activePage,
  currentIndex,
  setCurrentIndex,
}: ExperienceProps) {
  return (
    <>
      <color attach="background" args={["#191920"]} />
      <fog attach="fog" args={["#191920", 7, 15]} />
      <SetCamera activeScreen={activePage} />
      <Perf position="bottom-right" />
      <StartPage />
      <ProjectPage
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        isActive={activePage === "projects"}
      />
      <Environment preset="city" background={false} />
    </>
  );
}
