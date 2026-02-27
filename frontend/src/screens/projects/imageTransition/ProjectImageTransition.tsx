import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import "./ImageTransitionMaterial";

const DURATION = 0.6;

type Props = {
  activeIndex: number;
  textures: THREE.Texture[];
  width: number;
  height: number;
};

export default function ProjectImageTransition({
  activeIndex,
  textures,
  width,
  height,
}: Props) {
  type TransitionMaterial = THREE.ShaderMaterial & {
    uFrom: THREE.Texture | null;
    uTo: THREE.Texture | null;
    uProgress: number;
    uSize: number;
  };

  const matRef = useRef<TransitionMaterial | null>(null);
  const fromIndexRef = useRef(activeIndex);
  const toIndexRef = useRef(activeIndex);

  const tRef = useRef(1);
  const animating = useRef(false);

  const getTexture = useCallback(
    (index: number) =>
      textures[Math.min(Math.max(index, 0), Math.max(0, textures.length - 1))] ?? null,
    [textures],
  );

  useEffect(() => {
    // Keep uniforms stable if textures array changes.
    if (!matRef.current) return;
    const current = getTexture(toIndexRef.current);
    matRef.current.uFrom = current;
    matRef.current.uTo = current;
    matRef.current.uProgress = 1;
  }, [getTexture]);

  // Trigger transition when active index changes.
  useEffect(() => {
    if (activeIndex === toIndexRef.current) return;
    if (!matRef.current) return;

    fromIndexRef.current = toIndexRef.current;
    toIndexRef.current = activeIndex;
    tRef.current = 0;
    animating.current = true;

    matRef.current.uFrom = getTexture(fromIndexRef.current);
    matRef.current.uTo = getTexture(toIndexRef.current);
    matRef.current.uProgress = 0;
  }, [activeIndex, getTexture]);

  useFrame((_, dt) => {
    if (!animating.current || !matRef.current) return;

    tRef.current = Math.min(1, tRef.current + dt / DURATION);
    matRef.current.uProgress = tRef.current;

    if (tRef.current >= 1) {
      animating.current = false;
      fromIndexRef.current = toIndexRef.current;
    }
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[width, height]} />
      <imageTransitionMaterial
        ref={matRef}
        uFrom={getTexture(activeIndex)}
        uTo={getTexture(activeIndex)}
        uProgress={1}
        uSize={0.3}
        transparent
        toneMapped={false}
      />
    </mesh>
  );
}
