import { DragControls } from "@react-three/drei";
import React, { useRef } from "react";
import { WobbleSphere } from "./WobbleSphere";
import * as THREE from "three";
import type { BubbleVariant } from "../../types/types";

interface DraggableBubbeProps {
  setPoppedCounter: React.Dispatch<React.SetStateAction<number>>;
  id: string;
  onPopped: (id: string) => void;
  radius?: number;
  detail?: number;
  position?: THREE.Vector3 | [number, number, number];
  variant: BubbleVariant;
}

export default function DraggableBubble(props: DraggableBubbeProps) {
  const dragged = useRef(false);

  return (
    <DragControls
      autoTransform
      onDragStart={() => {
        dragged.current = true;
      }}
      onDragEnd={() => {
        // allow click again next tick
        requestAnimationFrame(() => (dragged.current = false));
      }}
    >
      <WobbleSphere
        {...props}
        onPopped={() => props.onPopped(props.id)}
        shouldPop={() => !dragged.current} // gate pop
        setPoppedCounter={props.setPoppedCounter}
      />
    </DragControls>
  );
}
