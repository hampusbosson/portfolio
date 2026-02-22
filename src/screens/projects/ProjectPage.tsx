import { ScrollControls } from "@react-three/drei";
import { useState } from "react";
import { projects } from "../../content/projects";
import Scene from "./Scene";

export default function ProjectPage() {
  const [currentIndex, setCurrentIndex] = useState(1);

  return (
    <>
      <group position={[0, -2, 0]}>
        <ScrollControls pages={projects.length} damping={0.2}>
          <Scene
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </ScrollControls>
      </group>
    </>
  );
}
