import type { Position } from "../types/types";

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function generateNonOverlappingPosition(
  existing: { position: Position; radius: number }[],
  newRadius: number,
  bounds: {
    x: [number, number];
    y: [number, number];
    z: number;
  },
  padding = 0.3,
  maxAttempts = 30,
): Position {
  let attempts = 0;

  while (attempts < maxAttempts) {
    const candidate: Position = [
      randomRange(bounds.x[0], bounds.x[1]),
      randomRange(bounds.y[0], bounds.y[1]),
      bounds.z,
    ];

    const overlaps = existing.some((b) => {
      const dx = b.position[0] - candidate[0];
      const dy = b.position[1] - candidate[1];
      const dist = Math.sqrt(dx * dx + dy * dy);

      // dynamic spacing based on radii
      return dist < b.radius + newRadius + padding;
    });

    if (!overlaps) return candidate;

    attempts++;
  }

  // fallback if too crowded
  return [
    randomRange(bounds.x[0], bounds.x[1]),
    randomRange(bounds.y[0], bounds.y[1]),
    bounds.z,
  ];
}


