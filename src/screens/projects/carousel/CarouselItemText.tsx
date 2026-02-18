import React from "react";
import { Html } from "@react-three/drei";

interface CarouselItemTextProps {
  htmlOverlayRef: React.RefObject<HTMLDivElement | null>;
  activeIndex: number | null;
}

function CarouselItemText({
  htmlOverlayRef,
  activeIndex
}: CarouselItemTextProps) {
  return (
    <Html>
      <div
        ref={htmlOverlayRef}
        className="absolute left-1/2 top-1/2"
        style={{ transform: "translate(calc(-50% - 100vw), -50%)", opacity: 0 }}
      >
        <div className="relative flex w-[min(80vw,560px)] flex-col items-start justify-center rounded-xl border border-white bg-black p-6 opacity-80">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Some interesting details
          </h2>
          <p className="text-white">project: {activeIndex}</p>
          <p className="mb-4 text-white">
            {" "}
            Details about the selected card will be displayed here. Details
            about the selected card will be displayed here. Details about the
            selected card will be displayed here.
          </p>
        </div>
      </div>
    </Html>
  );
}

export default CarouselItemText;
