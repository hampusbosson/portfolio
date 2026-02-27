import { Html, Text } from "@react-three/drei";
import { sfx } from "../../../audio/sfx";

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
        {/* <meshStandardMaterial
          color="white"
          emissive="white"
          emissiveIntensity={2}
        /> */}
        I build high-performance, interactive web systems.
      </Text>

      <Html transform position={[-2.83, -0.27, 1]} scale={0.25}>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/hampusbosson"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            onPointerEnter={() => sfx.play("hover")}
            className="group flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-2 py-1 text-[10px] font-medium tracking-wide text-white/80 backdrop-blur-md transition-all duration-200 hover:border-white/35 hover:bg-white/12 hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-3 w-3 fill-current transition-transform duration-200 group-hover:scale-105"
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
            className="group flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-2 py-1 text-[10px] font-medium tracking-wide text-white/80 backdrop-blur-md transition-all duration-200 hover:border-white/35 hover:bg-white/12 hover:text-white"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-3 w-3 fill-current transition-transform duration-200 group-hover:scale-105"
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
