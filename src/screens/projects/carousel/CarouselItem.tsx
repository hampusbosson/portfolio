import React, { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useCarousel } from "./useCarousel";
import { useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import gsap from "gsap";
interface CarouselItemProps {
  index: number;
  texture: THREE.Texture;
  isFocused: boolean;
}

function CarouselItem({ index, texture, isFocused }: CarouselItemProps) {
  const { settings, setActiveIndex, activeIndex } = useCarousel();
  const [isActive, setIsActive] = React.useState(false);
  const { width, height } = settings;

  useEffect(() => {
    setIsActive(activeIndex === index);
  }, [activeIndex, index]);

  const { viewport } = useThree();

  const shaderArgs = useMemo(() => {
    const uniforms = {
      uTex: { value: texture },
      uGrayOverlay: { value: new THREE.Vector4(0, 0, 0, 0) },
      uTime: { value: 0 },
      uScrollSpeed: { value: 0 },
      uDistance: { value: 0 },
      uProgress: { value: 0 },
      uEnableParallax: { value: settings.enableParallax },
      uEnableFloating: { value: settings.enableFloating },
      uZoomScale: {
        value: { x: viewport.width / width, y: viewport.height / height },
      },
      uIsActive: { value: isActive },
    };
    // animate uProgress based on isActive
    gsap.to(uniforms.uProgress, {
      value: isActive ? 1 : 0,
      duration: 1,
      ease: "power3.out",
    });
    const vertexShader = /* glsl */ `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uScrollSpeed;
        uniform float uDistance;
        uniform vec2 uZoomScale;
        uniform float uProgress;
        uniform bool uIsActive;
        uniform bool uEnableParallax;
        uniform bool uEnableFloating;
        float PI = 3.14159265359;
        void main() {
            vUv= uv;
            vUv = uv;
            vec3 pos=position;
            if(!uIsActive && uEnableFloating){
                pos.y+=sin(PI * uTime)*0.1;
            }
            // deformation
            pos.y+=sin(PI*vUv.x)*uScrollSpeed*0.7;
            pos.z+=cos(PI*vUv.y)*uScrollSpeed*0.7;

            if(uEnableParallax){
              // offset which allows to scale from the center
               vec2 offset = (vUv - vec2(0.5)) ;
               
              vUv = offset * 0.7 + vec2(0.5);

           
            vUv += offset * uDistance * 0.3;

            // animation for active
            float angle =uProgress*PI/2.;
            float wave= cos(angle);
            float c = sin(length(vUv-vec2(0.5)*PI)*15. +uProgress*12.)*0.5+0.5;
            pos.x*=mix(1.0, uZoomScale.x+wave*c, uProgress);
            pos.y*=mix(1.0, uZoomScale.y+wave*c, uProgress);
            }


            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
        `,
      fragmentShader = /* glsl */ `
                varying vec2 vUv;
                uniform sampler2D uTex;
                uniform vec4 uGrayOverlay;
                void main() {
                    vec3 texColor= texture2D(uTex, vUv).rgb;
                    texColor= mix(texColor,uGrayOverlay.rgb,uGrayOverlay.a);
                    gl_FragColor = vec4(texColor, 1.0);
                }
                
            `;

    return {
      uniforms,
      vertexShader,
      fragmentShader,
    };
  }, [
    texture,
    settings.enableParallax,
    settings.enableFloating,
    viewport.width,
    viewport.height,
    width,
    height,
    isActive,
  ]);

  return (
    <group
      onClick={() => {
        if (!isFocused) {
          return;
        }
        if (isActive) {
          setActiveIndex(null);
        } else {
          setActiveIndex(index);
        }
      }}
    >
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[settings.width, settings.height, 30, 30]} />
        <shaderMaterial args={[shaderArgs]} />
      </mesh>
      <group position={[-5.5, 2, -9.5]}>
        <Text
          fontSize={0.7}
          anchorY="middle"
          anchorX="left"
          position={[0, 0.25, 0]}
          color="white"
        >
          Proxy Inspector
        </Text>
        <Text
          fontSize={0.25}
          anchorY="middle"
          anchorX="left"
          maxWidth={settings.width * 0.8}
          textAlign="center"
          position={[0, -0.4, 0]}
          color="white"
        >
          HTTP forward proxy monitor
        </Text>
      </group>
    </group>
  );
}

export default CarouselItem;
