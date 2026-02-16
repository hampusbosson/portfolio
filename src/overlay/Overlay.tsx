import { Html } from "@react-three/drei";

interface OverlayProps {
  setActiveScreen: (screen: string) => void;
}

export default function Overlay({ setActiveScreen }: OverlayProps) {
  // useFrame(() => {
  //   if (projectsActive) {

  //   }
  // })
  return (
    <>
      <Html fullscreen>
        <div className="hud-layer">
          <div className="hud">
            <h1 className="hud-title">Hampus Bosson</h1>
            <p className="hud-subtitle">Software Developer</p>
          </div>
          <nav className="hud-nav" aria-label="Main navigation">
            <button onClick={() => setActiveScreen("start")} className="hud-button" type="button">
              Start
            </button>
            <button
              onClick={() => setActiveScreen("projects")}
              className="hud-button"
              type="button"
            >
              Projects
            </button>
            <button className="hud-button" type="button">
              About Me
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
