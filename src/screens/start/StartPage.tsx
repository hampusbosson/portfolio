import { DragControls, Float, Text } from "@react-three/drei";
import { useMemo } from "react";
import { WobbleSphere } from "./WobbleSphere";

type Variant = {
  timeOffset: number;
  posFreq: number;
  timeFreq: number;
  strength: number;
  warpPosFreq: number;
  warpTimeFreq: number;
  warpStrength: number;
};

// function for adding randomness to the bubbles
function makeVariant(): Variant {
  const r = () => Math.random();
  return {
    timeOffset: r() * 100,
    posFreq: 0.3 + r() * 0.2,
    timeFreq: 0.1 + r() * 0.1,
    strength: 0.1 + r() * 0.2,
    warpPosFreq: 0.1 + r() * 0.1,
    warpTimeFreq: r() * 0.8,
    warpStrength: r() * 0.1,
  };
}

export default function StartPage() {
  const variants = useMemo(
    () => [makeVariant(), makeVariant(), makeVariant()],
    [],
  );

  return (
    <>
      <group position={[0, 10, 0]}>
        <Text position={[0, 0, 0]} scale={0.5}>Hampus Bosson</Text>
        <Float>
          <group position={[0, 0, 1]}>
            <DragControls autoTransform>
              <WobbleSphere
                radius={0.5}
                detail={10}
                position={[2, 1, 1]}
                variant={variants[0]}
              />
            </DragControls>

            <DragControls autoTransform>
              <WobbleSphere
                radius={0.4}
                detail={10}
                position={[2, -1.5, 0]}
                variant={variants[1]}
              />
            </DragControls>

            <DragControls autoTransform>
              <WobbleSphere
                radius={0.7}
                detail={10}
                position={[-0.5, 0.5, -0]}
                variant={variants[2]}
              />
            </DragControls>
          </group>
        </Float>
      </group>
    </>
  );
}
