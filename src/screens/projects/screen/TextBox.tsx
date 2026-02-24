import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const SWAP_DELAY_MS = 280;

function TextBox({
  title,
  activeIndex,
}: {
  title: string;
  activeIndex: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const titleMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const infoMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const githubMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const infoRef = useRef<THREE.Mesh>(null!);
  const githubRef = useRef<THREE.Mesh>(null!);
  const infoHovered = useRef(false);
  const githubHovered = useRef(false);

  // animation state
  const startX = -1.6;
  const targetX = -1.0;
  const y = 0.4;
  const z = 0.2;

  const progress = useRef(1); // 0..1
  const prevIndex = useRef(activeIndex);
  const allowAnimate = useRef(true);
  const delayTimeout = useRef<number | null>(null);


  useEffect(() => {
    // trigger when index changes
    if (prevIndex.current === activeIndex) return;
    prevIndex.current = activeIndex;

    allowAnimate.current = false;
    progress.current = 0;

    // reset start pose immediately
    if (groupRef.current) groupRef.current.position.set(startX, y, z);
    if (titleMatRef.current) titleMatRef.current.opacity = 0;
    if (infoMatRef.current) infoMatRef.current.opacity = 0;
    if (githubMatRef.current) githubMatRef.current.opacity = 0;

    if (delayTimeout.current) window.clearTimeout(delayTimeout.current);
    delayTimeout.current = window.setTimeout(() => {
      allowAnimate.current = true;
    }, SWAP_DELAY_MS);
  }, [activeIndex, startX]);
  

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (!allowAnimate.current) return;

    // advance 0..1 (tweak speed here)
    progress.current = Math.min(1, progress.current + delta * 3.0);

    // ease-out cubic
    const t = 1 - Math.pow(1 - progress.current, 3);

    // slide
    groupRef.current.position.x = THREE.MathUtils.lerp(startX, targetX, t);

    // fade
    if (titleMatRef.current) titleMatRef.current.opacity = t;
    if (infoMatRef.current) {
      const hoverOpacity = infoHovered.current ? 1 : 0.86;
      infoMatRef.current.opacity = t * hoverOpacity;
    }
    if (githubMatRef.current) {
      const hoverOpacity = githubHovered.current ? 1 : 0.86;
      githubMatRef.current.opacity = t * hoverOpacity;
    }

    if (infoRef.current) {
      const target = infoHovered.current ? 0.114 : 0.105;
      const s = THREE.MathUtils.lerp(infoRef.current.scale.x, target, 1 - Math.exp(-16 * delta));
      infoRef.current.scale.setScalar(s);
    }

    if (githubRef.current) {
      const target = githubHovered.current ? 0.114 : 0.105;
      const s = THREE.MathUtils.lerp(githubRef.current.scale.x, target, 1 - Math.exp(-16 * delta));
      githubRef.current.scale.setScalar(s);
    }
  });

  useEffect(() => {
    return () => {
      if (delayTimeout.current) window.clearTimeout(delayTimeout.current);
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <group position={[-0.7, 0, 0]}>
      <group ref={groupRef} position={[targetX, y, z]}>
      <Text
        onClick={() => {}}
        position={[0, 0, 0]}
        color="white"
        scale={0.2}
        fontWeight="bold"
        anchorX="left"
        outlineWidth={0.02}
        outlineColor="black"
        outlineBlur={0.1}
      >
        <meshBasicMaterial ref={titleMatRef} transparent opacity={1} />
        {title}
      </Text>

      <Text
        ref={infoRef}
        onClick={() => {}}
        onPointerOver={() => {
          infoHovered.current = true;
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          infoHovered.current = false;
          if (!githubHovered.current) document.body.style.cursor = "default";
        }}
        position={[0, -0.32, 0]}
        color="#e9f8ff"
        scale={0.105}
        anchorX="left"
        outlineWidth={0.014}
        outlineColor="#000000"
      >
        <meshBasicMaterial ref={infoMatRef} transparent opacity={1} />
        [ Info ]
      </Text>

      <Text
        ref={githubRef}
        onClick={() => {}}
        onPointerOver={() => {
          githubHovered.current = true;
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          githubHovered.current = false;
          if (!infoHovered.current) document.body.style.cursor = "default";
        }}
        position={[0.5, -0.32, 0]}
        color="#c39449"
        scale={0.105}
        anchorX="left"
        outlineWidth={0.014}
        outlineColor="#000000"
      >
        <meshBasicMaterial ref={githubMatRef} transparent opacity={1} />
        [ GitHub ]
      </Text>
      </group>
    </group>
  );
}

export default TextBox;
