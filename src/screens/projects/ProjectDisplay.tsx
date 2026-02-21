import { Image, Text, useTexture } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { MeshStandardMaterial } from "three";
import { projects } from "../../content/projects";

const FRAME_BORDER = 0.03;
const FRAME_DEPTH = 0.01;
const BASE_OPEN_W = 2.48;

interface ProjectScreenProps {
  activeIndex: number;
}

export default function ProjectScreen({ activeIndex }: ProjectScreenProps) {
  const title = projects[activeIndex].title;
  //const description = projects[activeIndex].description;
  const imageString = projects[activeIndex].image;
  const imageTexture = useTexture(imageString);

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

      {/* Inset image (slightly behind frame front) */}
      <Image
        raycast={() => null}
        texture={imageTexture}
        position={[0, 0, 0]}
        scale={[openW, openH]}
      />

      {/* Frame bars (slim bezel) */}
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
