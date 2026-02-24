
import { useKeyboardControls } from "@react-three/drei";
import { useEffect } from "react";
import type React from "react";
import { projects } from "../../content/projects";

type ProjectControls = "left" | "right";

type KeyboardIndexControllerProps = {
  isActive: boolean;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
};

export default function KeyboardIndexController({
  isActive,
  setCurrentIndex,
}: KeyboardIndexControllerProps) {
  const [subscribe] = useKeyboardControls<ProjectControls>();

  useEffect(() => {
    if (!isActive) return;
    const maxIndex = projects.length - 1;

    const unsubLeft = subscribe(
      (state) => state.left,
      (pressed) => {
        if (!pressed) return;
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      },
    );

    const unsubRight = subscribe(
      (state) => state.right,
      (pressed) => {
        if (!pressed) return;
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
      },
    );

    return () => {
      unsubLeft();
      unsubRight();
    };
  }, [isActive, setCurrentIndex, subscribe]);

  return null;
}
