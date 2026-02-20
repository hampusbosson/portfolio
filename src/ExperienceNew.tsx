import { useState } from "react";
import ProjectPage from "./screens/projectsV2/ProjectPage";
import { Perf } from "r3f-perf";
import { Html } from "@react-three/drei";
import SetCamera from "./camera/setCamera";

export default function ExperienceNew() {
  const [activePage, setActivePage] = useState<string>("start");

  return (
    <>
      <Html position={[0, 10, 0]} center distanceFactor={10}>
        <div className="w-[320px] p-4 flex flex-col gap-4 bg-black/40">
          <p className="text-white whitespace-nowrap">start screen</p>
          <button onClick={() => setActivePage('projects')} className="cursor-pointer text-white border border-white/30 px-3 py-2 rounded">
            Projects
          </button>
        </div>
      </Html>
      <SetCamera activeScreen={activePage}/>
      <Perf position="bottom-right" />
      {/* <OrbitControls makeDefault /> */}
      <ProjectPage />
    </>
  );
}
