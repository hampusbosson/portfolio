import { Text } from "@react-three/drei";

const INFO_FONT_URL =
  "https://cdn.jsdelivr.net/npm/@fontsource/sora@5.1.1/files/sora-latin-600-normal.woff";

export default function AboutMePage({ isActive }: { isActive?: boolean }) {
  if (!isActive) return null;

  return (
    <group position={[9, 1.5, 0]}>
      {/* Cursor trail behind text */}

      {/* Text */}
      <Text
        font={INFO_FONT_URL}
        position={[-1.8, 0.6, 0.2]}
        anchorX="left"
        fontSize={0.45}
        color="white"
      >
        About me
      </Text>
      <Text
        font={INFO_FONT_URL}
        position={[-1.8, 0.1, 0.2]}
        anchorX="left"
        fontSize={0.18}
        color="white"
        fillOpacity={0.85}
      >
        Computer Science Graduate · Stockholm
      </Text>
    </group>
  );
}
