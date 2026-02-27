import type { Position, Bubble, BubbleVariant } from "../types/types";

function randomRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function generateNonOverlappingPosition(
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
export function spawnBubble(existing: Bubble[]): Bubble {
  const id = crypto.randomUUID();
  const radius = 0.3 + Math.random() * 0.3;

  // guarantee bubbles dont end up on top of eachother
  const position = generateNonOverlappingPosition(existing, radius, {
    x: [-0.5, 3],
    y: [-0.5, 0.8],
    z: 1,
  });

  return {
    id,
    radius,
    detail: 8,
    position,
    variant: makeVariant(),
  };
}


