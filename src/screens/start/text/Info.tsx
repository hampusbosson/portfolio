import React from "react";
import { Text } from "@react-three/drei";

function Info() {
  return (
    <group>
      <Text position={[-4, 0.6, 0]} scale={0.4} anchorX={"left"}>
        Hampus Bosson
      </Text>
      <Text position={[-4, 0.2, 0]} scale={0.2} anchorX={"left"}>
        Software Developer
      </Text>
    </group>
  );
}

export default Info;
