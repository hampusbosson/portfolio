import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { projects } from "../../content/projects";

interface MinimapProps {
    currentIndex: number;
}

export default function Minimap({currentIndex}: MinimapProps) {
  const ref = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    ref.current.children.forEach((child, i) => {
      const scaleY = i === currentIndex ? 1.5 : 0.5;
      easing.damp(child.scale, "y", scaleY, 0.2, delta);
    });
  });

  return (
    <group ref={ref} position={[0, -0, 0.5]}>
      {projects.map((_, i) => (
        <mesh key={i} position={[i * 0.4 - projects.length * 0.2, 0, 0]}>
          <boxGeometry args={[0.2, 0.5, 0.05]} />
          <meshStandardMaterial color="white" />
        </mesh>
      ))}
    </group>
  );
}
