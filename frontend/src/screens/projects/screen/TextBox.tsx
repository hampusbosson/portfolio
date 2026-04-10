import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { sfx } from "../../../audio/sfx";
import { useIsMobile } from "../../../utils/useIsMobile";

function TextBox({
  title,
  activeIndex,
  onInfoClick,
  onGithubClick,
}: {
  title: string;
  activeIndex: number;
  onInfoClick: () => void;
  onGithubClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const titleMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const infoMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const githubMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const infoRef = useRef<THREE.Mesh>(null!);
  const githubRef = useRef<THREE.Mesh>(null!);
  const infoHovered = useRef(false);
  const githubHovered = useRef(false);
  const isMobile = useIsMobile();

  const mobileConfig = {
    groupPosition: [0.05, 0.8, 2.5] as [number, number, number],
    showButtons: true,
    titleScale: 0.15,
    infoPosition: [0, -0.22, 0] as [number, number, number],
    infoScale: 0.105,
    githubPosition: [0.5, -0.22, 0] as [number, number, number],
    githubScale: 0.105,
  };

  const desktopConfig = {
    groupPosition: [-0.7, 0, 0] as [number, number, number],
    showButtons: true,
    titleScale: 0.2,
    infoPosition: [0, -0.32, 0] as [number, number, number],
    infoScale: 0.105,
    githubPosition: [0.5, -0.32, 0] as [number, number, number],
    githubScale: 0.105,
  };

  const config = isMobile ? mobileConfig : desktopConfig;

  const startX = -1.6;
  const targetX = -1.0;
  const y = 0.4;
  const z = 0.2;

  const progress = useRef(1); // 0..1
  const allowAnimate = useRef(true);
  const hoverAnimating = useRef(false);
  const delayTimeout = useRef<number | null>(null);


  useEffect(() => {
    allowAnimate.current = false;
    progress.current = 0;

    // reset start pose immediately
    if (groupRef.current) groupRef.current.position.set(startX, y, z);
    if (titleMatRef.current) titleMatRef.current.opacity = 0;
    if (infoMatRef.current) infoMatRef.current.opacity = 0;
    if (githubMatRef.current) githubMatRef.current.opacity = 0;

    if (delayTimeout.current) window.clearTimeout(delayTimeout.current);
    allowAnimate.current = true;
  }, [activeIndex]);
  

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (!allowAnimate.current && !hoverAnimating.current) return;

    // advance 0..1 (tweak speed here)
    if (allowAnimate.current) {
      progress.current = Math.min(1, progress.current + delta * 3.0);
    }

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

    if (progress.current >= 1) {
      allowAnimate.current = false;
    }

    const infoSettled = !infoRef.current
      || Math.abs(infoRef.current.scale.x - (infoHovered.current ? 0.114 : 0.105)) < 0.0005;
    const githubSettled = !githubRef.current
      || Math.abs(githubRef.current.scale.x - (githubHovered.current ? 0.114 : 0.105)) < 0.0005;

    hoverAnimating.current = !(infoSettled && githubSettled);
  });

  useEffect(() => {
    return () => {
      if (delayTimeout.current) window.clearTimeout(delayTimeout.current);
      document.body.style.cursor = "default";
    };
  }, []);

  return (
    <group position={config.groupPosition}>
      <group ref={groupRef} position={[targetX, y, z]}>
      <Text
        onClick={() => {}}
        position={[0, 0, 0]}
        color="white"
        scale={config.titleScale}
        fontWeight="bold"
        anchorX="left"
        outlineWidth={0.02}
        outlineColor="black"
        outlineBlur={0.1}
      >
        <meshBasicMaterial ref={titleMatRef} transparent opacity={1} />
        {title}
      </Text>

      {config.showButtons && (
        <>
          <Text
            ref={infoRef}
            onClick={onInfoClick}
            onPointerOver={() => {
              if (!infoHovered.current) sfx.play("hover");
              infoHovered.current = true;
              hoverAnimating.current = true;
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              infoHovered.current = false;
              hoverAnimating.current = true;
              if (!githubHovered.current) document.body.style.cursor = "default";
            }}
            position={config.infoPosition}
            color="#e9f8ff"
            scale={config.infoScale}
            anchorX="left"
            outlineWidth={0.014}
            outlineColor="#000000"
          >
            <meshBasicMaterial ref={infoMatRef} transparent opacity={1} />
            [ Info ]
          </Text>

          <Text
            ref={githubRef}
            onClick={onGithubClick}
            onPointerOver={() => {
              if (!githubHovered.current) sfx.play("hover");
              githubHovered.current = true;
              hoverAnimating.current = true;
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              githubHovered.current = false;
              hoverAnimating.current = true;
              if (!infoHovered.current) document.body.style.cursor = "default";
            }}
            position={config.githubPosition}
            color="#c39449"
            scale={config.githubScale}
            anchorX="left"
            outlineWidth={0.014}
            outlineColor="#000000"
          >
            <meshBasicMaterial ref={githubMatRef} transparent opacity={1} />
            [ GitHub ]
          </Text>
        </>
      )}
      </group>
    </group>
  );
}

export default TextBox;
