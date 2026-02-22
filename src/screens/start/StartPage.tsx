import Info from "./text/Info";
import Bubbles from "./bubbles/Bubbles";

export default function StartPage() {


  return (
    <>
      <group position={[-10, 2.5, 0]}>
        <Info />
        <Bubbles />
      </group>
    </>
  );
}
