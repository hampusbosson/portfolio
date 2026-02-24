import Info from "./text/Info";
import Bubbles from "./bubbles/Bubbles";
import { useEffect, useRef, useState } from "react";

interface StartPageProps {
  isActive: boolean;
}

export default function StartPage({ isActive }: StartPageProps) {
  const [showBubbles, setShowBubbles] = useState(isActive);
  const hideTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (hideTimeout.current) {
      window.clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }

    if (isActive) {
      const raf = window.requestAnimationFrame(() => {
        setShowBubbles(true);
      });
      return () => window.cancelAnimationFrame(raf);
    }

    hideTimeout.current = window.setTimeout(() => {
      setShowBubbles(false);
    }, 1000);

    return () => {
      if (hideTimeout.current) {
        window.clearTimeout(hideTimeout.current);
        hideTimeout.current = null;
      }
    };
  }, [isActive]);

  return (
    <>
      <group position={[0, 2.5, 0]}>
        <Info />
        {showBubbles && <Bubbles />}
      </group>
    </>
  );
}
