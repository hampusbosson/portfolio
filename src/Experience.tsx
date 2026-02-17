import { CameraControls, Stars } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Blackhole from "./models/Blackhole";
import { Suspense, useEffect, useRef, useState } from "react";
import Ship from "./models/Ship";
import Overlay from "./overlay/Overlay";
import * as THREE from "three";
import Projects from "./screens/Projects";

export default function Experience() {
  const [activeScreen, setActiveScreen] = useState("start");
  const [showProjects, setShowProjects] = useState(false);
  const shipRef = useRef<THREE.Object3D>(null);
  const cameraControlsRef = useRef<CameraControls>(null);


  const handleSetActiveScreen = (screen: string) => {
    if (activeScreen !== "projects") {
      setShowProjects(false);
    }
    setActiveScreen(screen);
  };

  useEffect(() => {
    if (activeScreen === "projects" && cameraControlsRef.current) {
      cameraControlsRef.current.setPosition(0.7, 0, 1, true); // Move the camera to a new position (x, y, z) with animation
    }
    if (activeScreen === "start" && cameraControlsRef.current) {
      cameraControlsRef.current.setPosition(7, -1.3, 8, true); // Move the camera back to the original position with animation
    }
  }, [activeScreen]);


  useEffect(() => {
    if (activeScreen !== "projects") {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowProjects(true);
    }, 1200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activeScreen]);

  return (
    <>
      <CameraControls ref={cameraControlsRef} enabled={false} />
      <Overlay setActiveScreen={handleSetActiveScreen} />
      <Perf position="bottom-right" />
      <Stars
        radius={20}
        depth={30}
        count={2000}
        factor={2}
        saturation={10}
        fade
        speed={1.5}
      />
      <directionalLight position={[5, 0, 3]} intensity={2} />
      <ambientLight intensity={1.5} />
      {/* <OrbitControls makeDefault /> */}
      <Suspense>
        <Blackhole />
      </Suspense>
      <Suspense>
        <Ship shipRef={shipRef} activeScreen={activeScreen} />
      </Suspense>
      {activeScreen === "projects" && showProjects && <Projects />}
    </>
  );
}
