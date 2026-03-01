import { MeshReflectorMaterial, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import { RepeatWrapping, SRGBColorSpace } from "three";

interface ProjectFloorProps {
  isPaused: boolean;
}

const TILE_X = 10;
const TILE_Y = 5;

export default function ProjectFloor({ isPaused }: ProjectFloorProps) {
  const [baseColorMap, normalMap] = useTexture([
    "/textures/slate_floor_1k/slate_floor_diff_1k.jpg",
    "/textures/slate_floor_1k/slate_floor_nor_gl_1k.jpg",
  ]);

  useEffect(() => {
    baseColorMap.colorSpace = SRGBColorSpace;
    [baseColorMap, normalMap].forEach((texture) => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(TILE_X, TILE_Y);
      texture.needsUpdate = true;
    });
  }, [baseColorMap, normalMap]);

  return (
    <group>
      {/* Rocky base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[30, 20]}/>
        <meshStandardMaterial
          map={baseColorMap}
          normalMap={normalMap}
          roughness={0.8}
          metalness={1}
          envMapIntensity={0}
          color="#000000"
        />
      </mesh>

      {/* Planar reflective film (reflects scene) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.02, 0]}
        renderOrder={2}
      >
        <planeGeometry args={[40, 20]} />
        <MeshReflectorMaterial
          mirror={1}
          envMapIntensity={0}
          resolution={isPaused ? 256 : 1024}
          blur={isPaused ? [0, 0] : [10, 4]}
          mixBlur={0.2}
          mixStrength={1.5}
          depthScale={0.6}
          minDepthThreshold={0.35}
          maxDepthThreshold={1.25}
          reflectorOffset={0.015}
          roughness={0.65}
          metalness={1}
          color="#cfd6df"
          transparent
          opacity={0.15}
          depthWrite={false}
          dithering
        />
      </mesh>
    </group>
  );
}
