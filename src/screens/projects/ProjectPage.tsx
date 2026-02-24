import { useEffect, useMemo, useRef } from "react";
import Scene from "./Scene";
import type React from "react";
import { projects } from "../../content/projects";
import { KeyboardControls, type KeyboardControlsEntry } from "@react-three/drei";
import KeyboardIndexController from "./KeyboardIndexController";

interface ProjectPageProps {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  isActive: boolean;
}

export default function ProjectPage({
  currentIndex,
  setCurrentIndex,
  isActive,
}: ProjectPageProps) {
  /**
   * SCROLL CONTROLS FOR PROJECT SCREEN
   */
  const wheelDelta = useRef(0);
  const isCoolingDown = useRef(false);

  useEffect(() => {
    if (!isActive) return;

    const STEP_THRESHOLD = 80;
    const STEP_COOLDOWN_MS = 220;
    const maxIndex = projects.length - 1;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (isCoolingDown.current) return;

      wheelDelta.current += event.deltaY;
      if (Math.abs(wheelDelta.current) < STEP_THRESHOLD) return;

      const direction = wheelDelta.current > 0 ? 1 : -1;
      wheelDelta.current = 0;
      isCoolingDown.current = true;

      setCurrentIndex((prev) =>
        Math.min(maxIndex, Math.max(0, prev + direction)),
      );

      window.setTimeout(() => {
        isCoolingDown.current = false;
      }, STEP_COOLDOWN_MS);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [isActive, setCurrentIndex]);

  /**
   * KEYBOARD CONTROLS MAP FOR PROJECTSCREEN
   */
  const keyMap = useMemo<KeyboardControlsEntry[]>(
    () => [
      { name: "left", keys: ["ArrowLeft", "KeyA"] },
      { name: "right", keys: ["ArrowRight", "KeyD"] },
    ],
    [],
  );

  return (
    <>
      <group position={[0, -2, 0]}>
        <KeyboardControls map={keyMap}>
          <KeyboardIndexController
            isActive={isActive}
            setCurrentIndex={setCurrentIndex}
          />
          <Scene currentIndex={currentIndex} />
        </KeyboardControls>
      </group>
    </>
  );
}
