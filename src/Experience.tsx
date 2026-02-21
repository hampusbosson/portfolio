import ProjectPage from "./screens/projects/ProjectPage";
import { Perf } from "r3f-perf";
import SetCamera from "./camera/setCamera";
import type { Page } from "./types/types";
import { Environment } from "@react-three/drei";
import StartPage from "./screens/start/StartPage";

interface ExperienceProps {
  activePage: Page;
}

export default function Experience({ activePage }: ExperienceProps) {
  return (
    <>
      <color attach="background" args={["#191920"]} />
      <fog attach="fog" args={["#191920", 0, 25]} />
      <SetCamera activeScreen={activePage} />
      <Perf position="bottom-right" />
      <StartPage />
      <ProjectPage />
      <Environment preset="city" />
    </>
  );
}
