import { useEffect, useRef } from "react";
import { CameraControls } from "@react-three/drei";

interface SetCameraProps {
  activeScreen: string;
}

function SetCamera({ activeScreen }: SetCameraProps) {
  //const { camera } = useThree();
  const cameraControlsRef = useRef<CameraControls>(null);

  useEffect(() => {
    if (activeScreen === "start" && cameraControlsRef.current) {
      cameraControlsRef.current.moveTo(0, 10, 3, true);
    }
    if (activeScreen === "projects" && cameraControlsRef.current) {
      cameraControlsRef.current.moveTo(0, 0.2, 0, true);
    }
  }, [activeScreen]);

  return <CameraControls ref={cameraControlsRef} enabled={false} />;
}

export default SetCamera;
