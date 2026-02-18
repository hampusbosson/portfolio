import { CameraControls, Stars } from "@react-three/drei";
import { Perf } from "r3f-perf";
import Blackhole from "./models/Blackhole";
import { Suspense, useEffect, useRef, useState } from "react";
import Ship from "./models/Ship";
import * as THREE from "three";
import Projects from "./screens/projects/Projects";

interface ExperienceProps {
  activeScreen: string;
}

export default function Experience({ activeScreen }: ExperienceProps) {
  const [shipStepCommand, setShipStepCommand] = useState<{
    id: number;
    direction: 1 | -1;
  } | null>(null);
  const shipRef = useRef<THREE.Object3D>(null);
  const cameraControlsRef = useRef<CameraControls>(null);

  useEffect(() => {
    if (activeScreen === "projects" && cameraControlsRef.current) {
      cameraControlsRef.current.setPosition(0.7, 0, 1, true); // Move the camera to a new position (x, y, z) with animation
    }
    if (activeScreen === "start" && cameraControlsRef.current) {
      cameraControlsRef.current.setPosition(7, -1.3, 8, true); // Move the camera back to the original position with animation
    }
  }, [activeScreen]);


  const handleShipStep = (direction: 1 | -1) => {
    setShipStepCommand((prev) => ({
      id: (prev?.id ?? 0) + 1,
      direction,
    }));
  };



  return (
    <>
      <CameraControls
        ref={cameraControlsRef}
        enabled={activeScreen !== "projects"}
      />
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
      <ambientLight intensity={0.2} />
      {/* <OrbitControls makeDefault /> */}
      <Suspense>
        <Blackhole />
      </Suspense>
      <Suspense>
        <Ship
          shipRef={shipRef}
          activeScreen={activeScreen}
          shipStepCommand={shipStepCommand}
        />
      </Suspense>
      {activeScreen === "projects" && (
        <Projects onShipStep={handleShipStep} />
      )}
    </>
  );
}
