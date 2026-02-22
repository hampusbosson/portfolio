import { Text } from "@react-three/drei";

const INFO_FONT_URL =
  "https://cdn.jsdelivr.net/npm/@fontsource/sora@5.1.1/files/sora-latin-600-normal.woff";

function Info() {
  return (
    <group>
      <Text
        font={INFO_FONT_URL}
        position={[-3.8, 0.7, 0]}
        scale={0.42}
        anchorX="left"
        color="white"
      >
        Hampus Bosson
      </Text>

      <Text
        font={INFO_FONT_URL}
        position={[-3.8, 0.35, 0]}
        scale={0.22}
        anchorX="left"
        color="white"
        fillOpacity={0.9}
      >
        Software Developer
      </Text>

      <Text
        font={INFO_FONT_URL}
        position={[-3.8, 0.05, 0]}
        scale={0.12}
        anchorX="left"
        color="white"
        fillOpacity={0.75}
      >
        I build high-performance, interactive web systems.
      </Text>
    </group>
  );
}

export default Info;
