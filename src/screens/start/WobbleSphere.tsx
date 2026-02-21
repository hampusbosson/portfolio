import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import type { BubbleVariant } from "../../types/types";

import wobbleVertexShader from "./shaders/wobble/vertex.glsl";
import wobbleFragmentShader from "./shaders/wobble/fragment.glsl";

interface WobbleSphereProps {
  radius?: number;
  detail?: number;
  position?: THREE.Vector3 | [number, number, number];
  variant: BubbleVariant;
  shouldPop?: () => boolean;
  onPopped: () => void;
  setPoppedCounter: React.Dispatch<React.SetStateAction<number>>;
}

export function WobbleSphere({
  radius = 2.5,
  detail = 10,
  position,
  variant,
  shouldPop,
  onPopped,
  setPoppedCounter,
}: WobbleSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [popping, setPopping] = useState(false);
  const [popped, setPopped] = useState(false);
  const entrance = useRef(0);
  const started = useRef(false);
  const notified = useRef(false);

  /**
   * bubble-pop sound
   */
  const popSound = useMemo(() => {
    const audio = new Audio("/sound/bubble-pop.mp3");
    audio.volume = 1;
    audio.load();
    return audio;
  }, []);

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
      opacity: 0.85,
      transmission: 0,
      ior: 1, // very close to air (1.0) → soft bubble look
      thickness: 0, // thin surfa

      envMapIntensity: 0, // remove reflections
      clearcoat: 0,
    });
  }, [uniforms]);

  // cleanup geometry and material when popping
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  // prevent memory leak from sound
  useEffect(() => {
    return () => {
      popSound.pause();
    };
  }, [popSound]);

  useFrame((state, delta) => {
    uniforms.uTime.value = state.clock.getElapsedTime() + variant.timeOffset;

    if (!meshRef.current) return;

    /**
     * ENTRANCE ANIMATION
     */
    if (!started.current) {
      // start below screen
      const startY = -8; // below camera
      const targetY = Array.isArray(position)
        ? position[1]
        : (position?.y ?? 0);

      // advance progress
      entrance.current += delta * (0.5 + variant.timeFreq);

      // ease out cubic
      const t = 1 - Math.pow(1 - entrance.current, 3);

      const currentY = THREE.MathUtils.lerp(startY, targetY, t);

      meshRef.current.position.set(
        Array.isArray(position) ? position[0] : (position?.x ?? 0),
        currentY,
        Array.isArray(position) ? position[2] : (position?.z ?? 0),
      );

      if (entrance.current >= 1) {
        started.current = true;
      }
    }

    // Hover scale (only when not popping)
    if (!popping) {
      const target = hovered ? 1.25 : 1;
      const s = THREE.MathUtils.lerp(
        meshRef.current.scale.x,
        target,
        10 * delta,
      );
      meshRef.current.scale.setScalar(s);
    } else {
      // Pop animation: quick expand then collapse
      const t = (meshRef.current.userData.popT ?? 0) + delta;
      meshRef.current.userData.popT = t;

      // 0..1 over ~0.25s
      const duration = 0.25;
      const p = Math.min(1, t / duration);

      // easeOut then easeIn
      const grow = 1 + 0.8 * (1 - Math.pow(1 - Math.min(p * 1.3, 1), 3)); // up to ~1.8
      const shrink = Math.pow(1 - Math.max(0, (p - 0.25) / 0.75), 3); // to 0
      const s = grow * shrink;

      meshRef.current.scale.setScalar(Math.max(0.0001, s));

      //fade out while popping (opacity)
      material.opacity = 0.7 * shrink;

      if (p >= 1 && !notified.current) {
        notified.current = true;
        setPopped(true);
        onPopped?.();
        setPoppedCounter((prev) => prev + 1);
      }
    }
  });

  if (popped) return null;

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={position}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
      onClick={(e) => {
        // do not stopPropagation; let DragControls work
        if (shouldPop && !shouldPop()) return;
        if (!popping) {
          setPopping(true);
          meshRef.current.userData.popT = 0;

          //play bubble-pop sound
          popSound.currentTime = 0;
          // random pitch each pop
          popSound.playbackRate = 0.9 + Math.random() * 0.3;
          // randomize volume
          popSound.volume = 0.8 + Math.random() * 0.2;
          popSound.play().catch((err) => {
            console.log("Audio play blocked:", err);
          });
        }
      }}
    >
      <primitive object={material} attach="material" />
    </mesh>
  );
}
