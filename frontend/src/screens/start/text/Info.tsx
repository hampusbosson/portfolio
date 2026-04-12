import { Html, Text } from "@react-three/drei";
import { useMemo } from "react";
import { sfx } from "../../../audio/sfx";
import { INFO_FONT_URL } from "../../../content/fonts";
import { useIsMobile } from "../../../utils/useIsMobile";

type Vec3 = [number, number, number];

const scaleVec3 = (v: Vec3, factor: number): Vec3 => [
  v[0] * factor,
  v[1] * factor,
  v[2] * factor,
];

const BASE_TEXT_LAYOUT = {
  groupPosition: [0, 0, 0] as Vec3,

  namePosition: [-3.8, 0.7, 0] as Vec3,
  nameScale: 0.42,

  rolePosition: [-3.8, 0.3, 0] as Vec3,
  roleScale: 0.22,

  taglinePosition: [-3.8, 0, 0] as Vec3,
  taglineScale: 0.12,
};

function createScaledTextLayout(
  base: typeof BASE_TEXT_LAYOUT,
  options: {
    size: number;
    groupPosition?: Vec3;
  },
) {
  const { size, groupPosition = base.groupPosition } = options;

  return {
    groupPosition,
    namePosition: scaleVec3(base.namePosition, size),
    nameScale: base.nameScale * size,

    rolePosition: scaleVec3(base.rolePosition, size),
    roleScale: base.roleScale * size,

    taglinePosition: scaleVec3(base.taglinePosition, size),
    taglineScale: base.taglineScale * size,
  };
}

const BUTTONS_LAYOUT_DESKTOP = {
  position: [-2.68, -0.45, 1] as Vec3,
  scale: 0.8,
};

const BUTTONS_LAYOUT_MOBILE = {
  position: [-0.35, -0.0, 1] as Vec3,
  scale: 0.65,
};

function Info() {
  const isMobile = useIsMobile();

  const textLayout = useMemo(() => {
    return isMobile
      ? createScaledTextLayout(BASE_TEXT_LAYOUT, {
          size: 0.5,
          groupPosition: [1, 0.3, 0],
        })
      : createScaledTextLayout(BASE_TEXT_LAYOUT, {
          size: 1,
          groupPosition: [0.1, 0, 0],
        });
  }, [isMobile]);

  const buttonsLayout = isMobile
    ? BUTTONS_LAYOUT_MOBILE
    : BUTTONS_LAYOUT_DESKTOP;

const buttonClassName =
  "group flex items-center gap-1 rounded-md border border-white/15 bg-white/5 px-1.5 py-0.75 text-[9px] font-medium tracking-wide text-white/80 backdrop-blur-md transition-all duration-200 hover:border-white/35 hover:bg-white/12 hover:text-white";

const iconClassName =
  "h-2.5 w-2.5 fill-current transition-transform duration-200 group-hover:scale-105";

  return (
    <group>
      <group position={textLayout.groupPosition}>
        <Text
          font={INFO_FONT_URL}
          position={textLayout.namePosition}
          scale={textLayout.nameScale}
          anchorX="left"
        >
          Hampus Bosson
        </Text>

        <Text
          font={INFO_FONT_URL}
          position={textLayout.rolePosition}
          scale={textLayout.roleScale}
          anchorX="left"
          color="white"
          fillOpacity={0.9}
        >
          Software Developer
        </Text>

        <Text
          font={INFO_FONT_URL}
          position={textLayout.taglinePosition}
          scale={textLayout.taglineScale}
          anchorX="left"
          color="white"
          fillOpacity={0.75}
        >
          I build high-performance, interactive web systems.
        </Text>
      </group>

      <Html
        transform
        occlude="blending"
        position={buttonsLayout.position}
        scale={buttonsLayout.scale}
        zIndexRange={[20, 0]}
        distanceFactor={4}
        wrapperClass="pointer-events-auto"
        material={<meshBasicMaterial transparent opacity={0} />}
      >
        <div
          className="flex items-center gap-2"
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          <a
            href="https://github.com/hampusbosson"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            onPointerEnter={() => sfx.play("hover")}
            className={buttonClassName}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className={iconClassName}
            >
              <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.57v-2.16c-3.34.72-4.04-1.42-4.04-1.42-.55-1.4-1.35-1.77-1.35-1.77-1.1-.76.08-.75.08-.75 1.22.08 1.86 1.25 1.86 1.25 1.08 1.86 2.83 1.32 3.52 1.01.11-.79.42-1.32.76-1.63-2.67-.3-5.48-1.34-5.48-5.95 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.62-2.81 5.64-5.49 5.94.43.37.82 1.1.82 2.22v3.29c0 .31.22.69.82.57A12 12 0 0 0 12 .5" />
            </svg>
            <span>GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            onPointerEnter={() => sfx.play("hover")}
            className={buttonClassName}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className={iconClassName}
            >
              <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9.5h4v11H3v-11Zm7 0h3.83v1.5h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.09v5.47h-4v-4.85c0-1.16-.02-2.66-1.62-2.66-1.63 0-1.88 1.27-1.88 2.58v4.93h-4v-11Z" />
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </Html>
    </group>
  );
}

export default Info;