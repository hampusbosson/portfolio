import { useFrame } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";

import wobbleVertexShader from "./shaders/wobble/vertex.glsl";
import wobbleFragmentShader from "./shaders/wobble/fragment.glsl";

type WobbleSphereProps = {
  radius?: number;
  detail?: number;
  position?: THREE.Vector3 | [number, number, number];
  variant: {
    timeOffset: number;
    posFreq: number;
    timeFreq: number;
    strength: number;
    warpPosFreq: number;
    warpTimeFreq: number;
    warpStrength: number;
  };
};

export function WobbleSphere({
  radius = 2.5,
  detail = 10,
  position,
  variant,
}: WobbleSphereProps) {
  // Uniforms (stable references)
  const uniforms = useMemo(
    () => ({
      uTime: new THREE.Uniform(0),
      uPositionFrequency: new THREE.Uniform(variant.posFreq),
      uTimeFrequency: new THREE.Uniform(variant.timeFreq),
      uStrength: new THREE.Uniform(variant.strength),
      uWarpPositionFrequency: new THREE.Uniform(variant.warpPosFreq),
      uWarpTimeFrequency: new THREE.Uniform(variant.warpTimeFreq),
      uWarpStrength: new THREE.Uniform(variant.warpStrength),
      uColorA: new THREE.Uniform(new THREE.Color("#000000")),
      uColorB: new THREE.Uniform(new THREE.Color("#000000")),
    }),
    [variant],
  );

  // Geometry
  const geometry = useMemo(() => {
    let g = new THREE.IcosahedronGeometry(radius, detail);
    g = mergeVertices(g);
    g.computeTangents();
    return g;
  }, [radius, detail]);

  // Material
  const material = useMemo(() => {
    return new CustomShaderMaterial({
      baseMaterial: THREE.MeshPhysicalMaterial,
      vertexShader: wobbleVertexShader,
      fragmentShader: wobbleFragmentShader,
      uniforms,

      metalness: 0, // IMPORTANT: must be 0
      roughness: 0, // small roughness softens reflections
      color: "#ffffff",

      transparent: true,
      opacity: 0.4,
      transmission: 0,
      ior: 1, // very close to air (1.0) → soft bubble look
      thickness: 0, // thin surfa

      envMapIntensity: 0, // remove reflections
      clearcoat: 0,
    });
  }, [uniforms]);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime() + variant.timeOffset;
  });

  return (
    <mesh
      geometry={geometry}
      position={position}
    >
      <primitive object={material} attach="material" />
    </mesh>
  );
}
