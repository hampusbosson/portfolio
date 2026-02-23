import { Image, Text, useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { MeshStandardMaterial, SRGBColorSpace } from "three";
import { projects } from "../../content/projects";

const FRAME_BORDER = 0.03;
const FRAME_DEPTH = 0.01;
const BASE_OPEN_W = 2.48;

interface ProjectScreenProps {
  activeIndex: number;
}

// preload image textures
const PROJECT_IMAGE_URLS = projects.map((project) => project.image);
PROJECT_IMAGE_URLS.forEach((url) => useTexture.preload(url));

export default function ProjectScreen({ activeIndex }: ProjectScreenProps) {
  const safeIndex = Math.min(Math.max(activeIndex, 0), projects.length - 1);
  const title = projects[safeIndex].title;
  const imageTextures = useTexture(PROJECT_IMAGE_URLS);
  const imageTexture = imageTextures[safeIndex];

  useEffect(() => {
    for (const texture of imageTextures) {
      texture.colorSpace = SRGBColorSpace;
      texture.needsUpdate = true;
    }
  }, [imageTextures]);

  const imgW = imageTexture?.width ?? 1;
  const imgH = imageTexture?.height ?? 1;

  const { openW, openH, frameW, frameH } = useMemo(() => {
    const imgAspect = imgW / imgH;
    const openW = BASE_OPEN_W;
    const openH = BASE_OPEN_W / imgAspect;
    const frameW = openW + FRAME_BORDER * 2;
    const frameH = openH + FRAME_BORDER * 2;

    return { openW, openH, frameW, frameH };
  }, [imgW, imgH]);

  const frameMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#141414",
        metalness: 0.2,
        roughness: 0.8,
        envMapIntensity: 0.6,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      frameMaterial.dispose();
    };
  }, [frameMaterial]);

  return (
    <group position={[0, 0.75, 0]}>
      <Text position={[-0.7, 0, 0.2]} color={"red"} scale={0.2} fontWeight={"bold"}>
        {title}
      </Text>

      {/* Inset image */}
      <Image
        raycast={() => null}
        toneMapped={false}
        texture={imageTexture}
        position={[0, 0, 0]}
        scale={[openW, openH]}
      />

      {/* Frame bars */}
      <mesh position={[0, (frameH - FRAME_BORDER) / 2, FRAME_DEPTH * 0.5]}>
        <boxGeometry args={[frameW, FRAME_BORDER, FRAME_DEPTH]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      <mesh position={[0, -(frameH - FRAME_BORDER) / 2, FRAME_DEPTH * 0.5]}>
        <boxGeometry args={[frameW, FRAME_BORDER, FRAME_DEPTH]} />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      <mesh position={[(frameW - FRAME_BORDER) / 2, 0, FRAME_DEPTH * 0.5]}>
        <boxGeometry
          args={[FRAME_BORDER, frameH - FRAME_BORDER * 2, FRAME_DEPTH]}
        />
        <primitive object={frameMaterial} attach="material" />
      </mesh>

      <mesh position={[-(frameW - FRAME_BORDER) / 2, 0, FRAME_DEPTH * 0.5]}>
        <boxGeometry
          args={[FRAME_BORDER, frameH - FRAME_BORDER * 2, FRAME_DEPTH]}
        />
        <primitive object={frameMaterial} attach="material" />
      </mesh>
    </group>
  );
}
