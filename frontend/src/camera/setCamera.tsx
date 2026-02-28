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
      cameraControlsRef.current.setLookAt(0, 2.5, 8, 0, 2.5, 0, true);
    }
    if (activeScreen === "projects" && cameraControlsRef.current) {
      cameraControlsRef.current.setLookAt(0, -1.2, 10.5, 0, -2.2, 0, true);
    } 
    if (activeScreen === "about" && cameraControlsRef.current) {
      cameraControlsRef.current.setLookAt(9, 1.5, 9, 9, 1.5, 0, true);
    } 

  }, [activeScreen]);

  return <CameraControls ref={cameraControlsRef} enabled={false} />;
}

export default SetCamera;
