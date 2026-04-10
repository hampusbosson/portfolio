import type { Position, Bubble, BubbleVariant } from "../types/types";

type BubbleSpawnBounds = {
  x: [number, number];
  y: [number, number];
  z: number;
};

type BubbleSpawnConfig = {
  radius: [number, number];
  bounds: BubbleSpawnBounds;
};

type SpawnBubbleOptions = {
  isMobile?: boolean;
};

const DESKTOP_BUBBLE_CONFIG: BubbleSpawnConfig = {
  radius: [0.3, 0.6],
  bounds: {
    x: [-0.5, 3],
    y: [-0.5, 0.8],
    z: 1,
  },
};

const MOBILE_BUBBLE_CONFIG: BubbleSpawnConfig = {
  radius: [0.2, 0.4],
  bounds: {
    x: [-0.8, 0.8],
    y: [-1.5, 0],
    z: 1,
  },
};

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
  maxAttempts = 120,
): Position {
  let attempts = 0;
  let bestCandidate: Position | null = null;
  let bestClearance = Number.NEGATIVE_INFINITY;

  while (attempts < maxAttempts) {
    const candidate: Position = [
      randomRange(bounds.x[0], bounds.x[1]),
      randomRange(bounds.y[0], bounds.y[1]),
      bounds.z,
    ];

    let minClearance = Number.POSITIVE_INFINITY;

    const overlaps = existing.some((b) => {
      const dx = b.position[0] - candidate[0];
      const dy = b.position[1] - candidate[1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      const clearance = dist - (b.radius + newRadius + padding);

      minClearance = Math.min(minClearance, clearance);

      // dynamic spacing based on radii
      return clearance < 0;
    });

    if (!overlaps) return candidate;

    if (minClearance > bestClearance) {
      bestClearance = minClearance;
      bestCandidate = candidate;
    }

    attempts++;
  }

  // fallback to the least-overlapping candidate if the space gets crowded
  if (bestCandidate) {
    return bestCandidate;
  }

  return [
    (bounds.x[0] + bounds.x[1]) / 2,
    (bounds.y[0] + bounds.y[1]) / 2,
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
export function spawnBubble(
  existing: Bubble[],
  options: SpawnBubbleOptions = {},
): Bubble {
  const id = crypto.randomUUID();
  const config = options.isMobile
    ? MOBILE_BUBBLE_CONFIG
    : DESKTOP_BUBBLE_CONFIG;
  const radius = randomRange(config.radius[0], config.radius[1]);

  // guarantee bubbles dont end up on top of eachother
  const position = generateNonOverlappingPosition(
    existing,
    radius,
    config.bounds,
  );

  return {
    id,
    radius,
    detail: 8,
    position,
    variant: makeVariant(),
  };
}
