import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Ship() {
  const shipRef = useRef<THREE.Object3D>(null);

  useFrame((_, delta) => {
    // Rotate the ship around the Y-axis
    if (shipRef.current) {
      shipRef.current.rotation.z += delta * -0.25; // Adjust the rotation speed as needed
    }
  });
  const model = useGLTF("/ship-lowres/scene.gltf");

  return (
    <group ref={shipRef} position={[0.25,0,0]}>
      <primitive
        object={model.scene}
        scale={0.01}
        rotation={[0, 1.5, 0]}
        position={[0, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/ship-lowres/scene.gltf");
