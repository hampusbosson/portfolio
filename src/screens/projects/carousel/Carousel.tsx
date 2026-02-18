import { useRef, useState } from "react";
import CarouselItem from "./CarouselItem";
import { images } from "./settings";
import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as Three from "three";
import { CarouselProvider } from "./context";
import { useCarousel } from "./useCarousel";
import CarouselItemText from "./CarouselItemText";

interface CarouselProps {
  onShipStep: (direction: 1 | -1) => void;
}

function Carousel({ onShipStep }: CarouselProps) {
  const rootGroupRef = useRef<Three.Group | null>(null);
  const htmlOverlayRef = useRef<HTMLDivElement>(null);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const prevFrameProgressRef = useRef(0);
  const lastShipStepIndexRef = useRef(0);
  const overlayXRef = useRef(-100);
  const overlayOpacityRef = useRef(0);
  const focusedIndexRef = useRef(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const textures = useTexture(images);
  const { viewport } = useThree();

  const { settings, activeIndex } = useCarousel();

  const handleWheel = (e: WheelEvent) => {
    if (activeIndex !== null) {
      return;
    }
    // Continuous wheel scrolling for smooth, website-like feel.
    const delta = e.deltaY * 0.07;
    targetProgressRef.current = Three.MathUtils.clamp(
      targetProgressRef.current + delta,
      0,
      100,
    );
  };

  useFrame((_, delta) => {
    const group = rootGroupRef.current;
    if (!group) return; // ref not ready yet

    const items = group.children;
    const totalItems = items.length;
    if (totalItems === 0) return;
    const maxIndex = totalItems - 1;
    const progressStep = maxIndex === 0 ? 0 : 100 / maxIndex;
    targetProgressRef.current = Three.MathUtils.clamp(
      targetProgressRef.current,
      0,
      100,
    );

    currentProgressRef.current = Three.MathUtils.damp(
      currentProgressRef.current,
      targetProgressRef.current,
      7,
      delta,
    );
    const scrollSpeed =
      currentProgressRef.current - prevFrameProgressRef.current;
    prevFrameProgressRef.current = currentProgressRef.current;

    if (progressStep > 0) {
      const currentStep = Three.MathUtils.clamp(
        Math.round(currentProgressRef.current / progressStep),
        0,
        maxIndex,
      );
      const deltaSteps = currentStep - lastShipStepIndexRef.current;
      if (deltaSteps !== 0) {
        const direction: 1 | -1 = deltaSteps > 0 ? 1 : -1;
        for (let i = 0; i < Math.abs(deltaSteps); i += 1) {
          onShipStep(direction === 1 ? -1 : 1);
        }
        lastShipStepIndexRef.current = currentStep;
      }
    }

    const progress = Three.MathUtils.clamp(currentProgressRef.current, 0, 100);
    const center = (progress / 100) * (totalItems - 1);
    const nearestIndex = Three.MathUtils.clamp(
      Math.round(center),
      0,
      maxIndex,
    );
    if (nearestIndex !== focusedIndexRef.current) {
      focusedIndexRef.current = nearestIndex;
      setFocusedIndex(nearestIndex);
    }

    items.forEach((item, index) => {
      const distance = index - center;
      const absDistance = Math.abs(distance);
      const y = -distance * (settings.height + settings.itemGap);
      const z = -Math.abs(distance) * 0.5;
      const scale = Three.MathUtils.lerp(2.5, 1.7, Math.min(absDistance, 1));
      item.visible = absDistance <= 2;
      if (activeIndex !== null) {
        item.visible = activeIndex === index;
      }
      item.position.x = Three.MathUtils.damp(item.position.x, 0, 10, delta);
      item.position.y = Three.MathUtils.damp(item.position.y, y, 10, delta);
      item.position.z = Three.MathUtils.damp(item.position.z, z, 10, delta);
      item.scale.x = Three.MathUtils.damp(item.scale.x, scale, 10, delta);
      item.scale.y = Three.MathUtils.damp(item.scale.y, scale, 10, delta);
      item.scale.z = Three.MathUtils.damp(item.scale.z, scale, 10, delta);

      const material = (item.children[0] as Three.Mesh)
        .material as Three.ShaderMaterial;
      material.uniforms.uGrayOverlay.value.x = 0.7;
      material.uniforms.uGrayOverlay.value.y = 0.7;
      material.uniforms.uGrayOverlay.value.z = 0.7;
      material.uniforms.uGrayOverlay.value.w = Three.MathUtils.damp(
        material.uniforms.uGrayOverlay.value.w,
        absDistance < 0.5 ? 0 : 0.7,
        10,
        delta,
      );

      material.uniforms.uDistance.value = Three.MathUtils.damp(
        material.uniforms.uDistance.value,
        absDistance > 0.25 ? 1 : 0,
        10,
        delta,
      );
      material.uniforms.uScrollSpeed.value = Three.MathUtils.damp(
        material.uniforms.uScrollSpeed.value,
        scrollSpeed,
        12,
        delta,
      );

      material.uniforms.uTime.value = performance.now() / 1000;
    });

    group.rotation.x = Three.MathUtils.damp(
      group.rotation.x,
      settings.rotation[0],
      8,
      delta,
    );
    group.rotation.y = Three.MathUtils.damp(
      group.rotation.y,
      settings.rotation[1],
      8,
      delta,
    );
    group.rotation.z = Three.MathUtils.damp(
      group.rotation.z,
      settings.rotation[2],
      8,
      delta,
    );

    group.position.x = Three.MathUtils.damp(
      group.position.x,
      settings.position[0],
      8,
      delta,
    );
    group.position.y = Three.MathUtils.damp(
      group.position.y,
      settings.position[1],
      8,
      delta,
    );
    group.position.z = Three.MathUtils.damp(group.position.z, 0, 8, delta);

    const overlay = htmlOverlayRef.current;

    if (overlay) {
      const targetX = activeIndex !== null ? 0 : -100;
      const targetOpacity = activeIndex !== null ? 1 : 0;
      overlayXRef.current = Three.MathUtils.damp(
        overlayXRef.current,
        targetX,
        10,
        delta,
      );
      overlayOpacityRef.current = Three.MathUtils.damp(
        overlayOpacityRef.current,
        targetOpacity,
        10,
        delta,
      );
      overlay.style.transform = `translate(calc(-50% + ${overlayXRef.current}vw), -50%)`;
      overlay.style.opacity = String(overlayOpacityRef.current);
    }
  });

  return (
    <>
      <CarouselItemText
        htmlOverlayRef={htmlOverlayRef}
        activeIndex={activeIndex}
      />
      <group>
        <mesh onWheel={(e) => handleWheel(e.nativeEvent)} position={[0, 0, -1]}>
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        <group ref={rootGroupRef}>
          {textures.map((texture, index) => (
            <CarouselItem
              key={index}
              index={index}
              texture={texture}
              isFocused={index === focusedIndex}
            />
          ))}
        </group>
      </group>
    </>
  );
}

interface WrappedCarouselProps {
  onShipStep: (direction: 1 | -1) => void;
}

export const WrappedCarousel = ({ onShipStep }: WrappedCarouselProps) => {
  return (
    <CarouselProvider>
      <Carousel onShipStep={onShipStep} />
    </CarouselProvider>
  );
};
