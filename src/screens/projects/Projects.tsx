import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { WrappedCarousel } from "./carousel/Carousel";
import { useEffect, useState } from "react";

interface ProjectsProps {
  onShipStep: (direction: 1 | -1) => void;
}

export default function Projects({ onShipStep }: ProjectsProps) {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 1000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <Html
      fullscreen
      zIndexRange={[70, 50]}
      style={{ pointerEvents: "none", zIndex: 200 }}
    >
      <div
        className={`
          absolute inset-0 flex items-center justify-center
          transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
      >
        <div className="pointer-events-auto h-full w-full">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            dpr={[1, 2]}
            className="h-full w-full rounded-2xl"
          >
            <WrappedCarousel onShipStep={onShipStep} />
          </Canvas>
        </div>
      </div>
    </Html>
  );
}
