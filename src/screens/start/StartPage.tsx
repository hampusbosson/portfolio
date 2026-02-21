import { Float, Text } from "@react-three/drei";
import { useState } from "react";
import DraggableBubble from "./DraggableBubbe";
import type { BubbleVariant, Bubble } from "../../types/types";
import { generateNonOverlappingPosition } from "../../utils/bubbleUtils";

// function for adding randomness to the bubbles
function makeVariant(): BubbleVariant {
  const r = () => Math.random();
  return {
    timeOffset: r() * 100,
    posFreq: 0.8,
    timeFreq: 0.1 + r() * 0.1,
    strength: 0.1 + r() * 0.1,
    warpPosFreq: 0.1 + r() * 0.1,
    warpTimeFreq: r() * 0.2,
    warpStrength: r() * 0.2,
  };
}

// spawn a new bubble under screen function
function spawnBubble(existing: Bubble[]): Bubble {
  const id = crypto.randomUUID();
  const radius = 0.3 + Math.random() * 0.4;

  // guarantee bubbles dont end up on top of eachother
  const position = generateNonOverlappingPosition(existing, radius, {
    x: [-3, 3],
    y: [-1, 1],
    z: 1,
  });

  return {
    id,
    radius,
    detail: 9,
    position,
    variant: makeVariant(),
  };
}

export default function StartPage() {
  const [bubbles, setBubbles] = useState<Bubble[]>(() => {
    const initial: Bubble[] = [];

    for (let i = 0; i < 3; i++) {
      const bubble = spawnBubble(initial);
      initial.push(bubble);
    }

    return initial;
  });

  const [poppedCounter, setPoppedCounter] = useState<number>(0);

  // spawn new bubble when one is popped
  const handlePopped = (id: string) => {
    setBubbles((prev) => {
      const others = prev.filter((b) => b.id !== id);
      return [...others, spawnBubble(others)];
    });
  };

  return (
    <>
      <group position={[0, 5, 0]}>
        <Text position={[-4, 0.6, 0]} scale={0.4} anchorX={"left"}>
          Hampus Bosson
        </Text>
        <Text position={[-4, 0.2, 0]} scale={0.2} anchorX={"left"}>
          Software Developer
        </Text>
        <Text position={[-4, -0.2, 0]} scale={0.1} anchorX={"left"}>
          bubbles popped: {poppedCounter}
        </Text>

        <Float floatIntensity={1} speed={2}>
          <group>
            {bubbles.map((b) => (
              <DraggableBubble
                setPoppedCounter={setPoppedCounter}
                key={b.id}
                id={b.id}
                radius={b.radius}
                detail={b.detail}
                position={b.position}
                variant={b.variant}
                onPopped={handlePopped}
              />
            ))}
          </group>
        </Float>
      </group>
    </>
  );
}
