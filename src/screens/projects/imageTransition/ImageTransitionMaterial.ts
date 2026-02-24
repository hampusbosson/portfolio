import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import type { ThreeElement } from "@react-three/fiber";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragment = /* glsl */ `
  varying vec2 vUv;

  uniform sampler2D uFrom;
  uniform sampler2D uTo;
  uniform float uProgress;
  uniform float uSize;

  float rand(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
  }

  void main() {
    vec2 uv = vUv;
    float r = rand(vec2(0.0, uv.y));
    float m = smoothstep(
      0.0,
      -uSize,
      uv.x * (1.0 - uSize) + uSize * r - (uProgress * (1.0 + uSize))
    );

    vec4 fromC = texture2D(uFrom, uv);
    vec4 toC   = texture2D(uTo, uv);

    gl_FragColor = mix(fromC, toC, m);
  }
`;

export const ImageTransitionMaterial = shaderMaterial(
  {
    uFrom: null as THREE.Texture | null,
    uTo: null as THREE.Texture | null,
    uProgress: 0,
    uSize: 0.3,
  },
  vertex,
  fragment,
);

extend({ ImageTransitionMaterial });

// TYPESCRIPT R3F FIX
declare module "@react-three/fiber" {
  interface ThreeElements {
    imageTransitionMaterial: ThreeElement<typeof ImageTransitionMaterial>;
  }
}
