import { Float } from "@react-three/drei";
import type { Bubble } from "../../../types/types";
import { spawnBubble } from "../../../utils/bubbleUtils";
import { useState } from "react";
import DraggableBubble from "./DraggableBubbe";
import { useIsMobile } from "../../../utils/useIsMobile";

function Bubbles() {
  const isMobile = useIsMobile();
  const [bubbles, setBubbles] = useState<Bubble[]>(() => {
    const initial: Bubble[] = [];

    for (let i = 0; i < 2; i++) {
      const bubble = spawnBubble(initial, { isMobile });
      initial.push(bubble);
    }

    return initial;
  });

  const [poppedCounter, setPoppedCounter] = useState<number>(0);

  console.log(poppedCounter); //implement real counter later

  // spawn new bubble when one is popped
  const handlePopped = (id: string) => {
    setBubbles((prev) => {
      const others = prev.filter((b) => b.id !== id);
      return [...others, spawnBubble(others, { isMobile })];
    });
  };
  return (
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
  );
}

export default Bubbles;
