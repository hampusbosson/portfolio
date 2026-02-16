import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

export default function Overlay() {
  const [projectsActive, setProjectsActive] = useState(false);

  // useFrame(() => {
  //   if (projectsActive) {

  //   }
  // })

  const handleProjectsClick = () => {
    setProjectsActive(!projectsActive);
  }

  return (
    <>
      <Html fullscreen>
        <div className="hud-layer">
          <div className="hud">
            <h1 className="hud-title">Hampus Bosson</h1>
            <p className="hud-subtitle">Software Developer</p>
          </div>
          <nav className="hud-nav" aria-label="Main navigation">
            <button onClick={handleProjectsClick} className="hud-button" type="button">
              Projects
            </button>
            <button className="hud-button" type="button">
              About
            </button>
            <button className="hud-button" type="button">
              Ask Me a Question
            </button>
          </nav>
        </div>
      </Html>
    </>
  );
}
