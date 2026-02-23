import { useEffect, useState } from "react";
import { projects } from "../../content/projects";
import { motion } from "framer-motion";

interface MinimapProps {
  currentIndex: number;
  onSelect?: (index: number) => void;
}

export default function MinimapOverlay({
  currentIndex,
  onSelect,
}: MinimapProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsVisible(true), 650); // 1s delay
    return () => window.clearTimeout(timeout);
  }, []);

  if (!isVisible) return null;

  const SLOT_H = 35;
  const GAP = 12;

  const INACTIVE_W = 12;
  const HOVER_W = 125; // smaller than active
  const ACTIVE_W = 125;

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div
        className={`pointer-events-auto fixed left-1/2 bottom-8 -translate-x-1/2 transition-all duration-500 ease-out ${
          isVisible ? "translate-y-0" : "translate-y-2"
        }`}
      >
        <div className="rounded-2xl border border-white/20 bg-white/10 px-3 py-2.5 shadow-[0_14px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <motion.div
            className="flex items-center"
            style={{ gap: GAP }}
            layout
            transition={{ type: "spring", stiffness: 420, damping: 40 }}
          >
            {projects.map((p, i) => {
              const active = i === currentIndex;
              const hovered = i === hoveredIndex;
              const expanded = active || hovered;

              const width = active ? ACTIVE_W : hovered ? HOVER_W : INACTIVE_W;

              return (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => onSelect?.(i)}
                  onHoverStart={() => setHoveredIndex(i)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className={[
                    "rounded-xl border transition-all duration-50",
                    "flex items-center justify-start overflow-hidden",
                    active
                      ? "border-white/60 bg-white text-black shadow-[0_0_18px_rgba(255,255,255,0.35)]"
                      : hovered
                        ? "border-white/40 bg-white/60 text-black"
                        : "border-white/15 bg-white/15 text-white",
                  ].join(" ")}
                  style={{ height: SLOT_H }}
                  layout
                  animate={{ width }}
                  transition={{ type: "spring", stiffness: 420, damping: 55 }}
                  aria-label={`Go to project ${i + 1}`}
                >
                  <motion.span
                    className={[
                      "ml-2 mr-3 flex gap-1 whitespace-nowrap text-[12px] font-medium tracking-wide",
                      active || hovered ? "text-black" : "text-white/85",
                    ].join(" ")}
                    initial={false}
                    animate={{
                      opacity: expanded ? 1 : 0,
                      x: expanded ? 0 : -9,
                    }}
                    transition={{ duration: 0.35 }}
                  >
                    <span className="font-normal">{i + 1}.</span>
                    <span>{p.shortTitle}</span>
                  </motion.span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
