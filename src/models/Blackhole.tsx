import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect } from "react";

export default function Blackhole() {
  const model = useGLTF("/blackhole/scene.gltf");
  const animations = useAnimations(model.animations, model.scene);

  useEffect(() => {
    const action = animations.actions["Take 001"];
    if (action) { 
      action.timeScale = 0.3; // Adjust the speed of the animation 
      action.play();
    }
  }, [animations]);

  return (
    <>
      <primitive
        object={model.scene}
        rotation={[0.15, 0, 0]}
        position={[-8, -0.7, 0]}
        scale={5}
      />
    </>
  );
}

useGLTF.preload("/blackhole/scene.gltf");
