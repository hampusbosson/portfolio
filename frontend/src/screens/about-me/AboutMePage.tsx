import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import AboutContactForm from "./AboutContactForm";
import AboutHeadshot from "./AboutHeadshot";
import * as THREE from "three";
import { useIsMobile } from "../../utils/useIsMobile";

const ABOUT_CAMERA_POSITION = new THREE.Vector3(9, -1.2, 10.5);

function needsAboutHtmlFallbackBrowser() {
  if (typeof navigator === "undefined") return false;

  const userAgent = navigator.userAgent.toLowerCase();
  const isFirefox = userAgent.includes("firefox");
  const isSafari =
    userAgent.includes("safari") &&
    !userAgent.includes("chrome") &&
    !userAgent.includes("chromium") &&
    !userAgent.includes("crios") &&
    !userAgent.includes("fxios") &&
    !userAgent.includes("edg") &&
    !userAgent.includes("android");

  return isFirefox || isSafari;
}

export default function AboutMePage({ isActive }: { isActive?: boolean }) {
  const isMobile = useIsMobile();
  const motionRef = useRef<THREE.Group>(null!);
  const innerFrameRef = useRef<THREE.Mesh>(null);
  const { camera, size } = useThree();

  const needsHtmlFallback = useMemo(() => needsAboutHtmlFallbackBrowser(), []);
  const [fallbackScale, setFallbackScale] = useState(1);
  const [isFallbackMeasured, setIsFallbackMeasured] = useState(false);

  const layout = useMemo(() => {
    if (isMobile) {
      return {
        position: [9, -1.65, 6.5] as [number, number, number],
        scale: 0.23,
        distanceFactor: 2.28,
        htmlWidth: 700,
        htmlHeight: 1105,
        frameOuterW: 4.15,
        frameOuterH: 6.45,
        frameInnerW: 3.97,
        frameInnerH: 6.27,
        frameGlowW: 4.03,
        frameGlowH: 6.33,
      };
    }

    return {
      position: [9, -1.6, 7] as [number, number, number],
      scale: 0.35,
      distanceFactor: 2.54,
      htmlWidth: 1110,
      htmlHeight: 650,
      frameOuterW: 7.2,
      frameOuterH: 4.25,
      frameInnerW: 7.02,
      frameInnerH: 4.07,
      frameGlowW: 7.08,
      frameGlowH: 4.13,
    };
  }, [isMobile]);

  useEffect(() => {
    if (!needsHtmlFallback) {
      setFallbackScale(1);
      setIsFallbackMeasured(true);
      return;
    }

    if (!isActive) {
      setIsFallbackMeasured(false);
      return;
    }

    const mesh = innerFrameRef.current;
    if (!mesh) return;

    let raf = 0;
    let cancelled = false;
    let framesRemaining = 24;

    const measure = () => {
      if (cancelled || !innerFrameRef.current) return;

      const distanceToAboutCamera =
        camera.position.distanceTo(ABOUT_CAMERA_POSITION);

      if (distanceToAboutCamera > 0.25) {
        raf = window.requestAnimationFrame(measure);
        return;
      }

      const currentMesh = innerFrameRef.current;
      currentMesh.updateWorldMatrix(true, false);

      const halfWidth = layout.frameInnerW / 2;
      const halfHeight = layout.frameInnerH / 2;
      const worldMatrix = currentMesh.matrixWorld;
      const corners = [
        new THREE.Vector3(-halfWidth, -halfHeight, 0),
        new THREE.Vector3(halfWidth, -halfHeight, 0),
        new THREE.Vector3(halfWidth, halfHeight, 0),
        new THREE.Vector3(-halfWidth, halfHeight, 0),
      ];

      let minX = Number.POSITIVE_INFINITY;
      let maxX = Number.NEGATIVE_INFINITY;
      let minY = Number.POSITIVE_INFINITY;
      let maxY = Number.NEGATIVE_INFINITY;

      for (const corner of corners) {
        corner.applyMatrix4(worldMatrix).project(camera);

        const x = (corner.x * 0.5 + 0.5) * size.width;
        const y = (-corner.y * 0.5 + 0.5) * size.height;

        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }

      const frameWidthPx = maxX - minX;
      const frameHeightPx = maxY - minY;

      if (frameWidthPx > 0 && frameHeightPx > 0) {
        const scaleX = frameWidthPx / layout.htmlWidth;
        const scaleY = frameHeightPx / layout.htmlHeight;
        const nextScale = Math.min(scaleX, scaleY) * (isMobile ? 1.01 : 1.02);

        setFallbackScale(nextScale);
        setIsFallbackMeasured(true);
      }

      framesRemaining -= 1;
      if (framesRemaining > 0) {
        raf = window.requestAnimationFrame(measure);
      }
    };

    setIsFallbackMeasured(false);
    raf = window.requestAnimationFrame(measure);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
    };
  }, [
    camera,
    isActive,
    needsHtmlFallback,
    isMobile,
    layout.frameInnerH,
    layout.frameInnerW,
    layout.htmlHeight,
    layout.htmlWidth,
    size.height,
    size.width,
  ]);

  return (
    <group
      position={layout.position}
      scale={layout.scale}
      rotation={[-0.1, 0, 0]}
      visible={!!isActive}
    >
      <group ref={motionRef}>
        <group position={[0, 0, 0]}>
          <mesh position={[0, 0, -0.02]}>
            <planeGeometry args={[layout.frameOuterW, layout.frameOuterH]} />
            <meshPhysicalMaterial
              color="#080a0f"
              roughness={0.78}
              metalness={0.16}
            />
          </mesh>

          <mesh ref={innerFrameRef} position={[0, 0, -0.01]}>
            <planeGeometry args={[layout.frameInnerW, layout.frameInnerH]} />
            <meshPhysicalMaterial
              color="#10131a"
              transparent
              opacity={0.78}
              roughness={0.62}
              metalness={0}
              clearcoat={0.35}
              clearcoatRoughness={0.4}
            />
          </mesh>

          <mesh position={[0, 0, 0.002]}>
            <planeGeometry args={[layout.frameGlowW, layout.frameGlowH]} />
            <meshBasicMaterial color="#111722" transparent opacity={1} />
          </mesh>
        </group>

        <Html
          transform={!needsHtmlFallback}
          center={needsHtmlFallback}
          position={[0, 0, 0.03]}
          distanceFactor={!needsHtmlFallback ? layout.distanceFactor : undefined}
          zIndexRange={[20, 0]}
          style={{ pointerEvents: "auto" }}
        >
          <div
            style={
              needsHtmlFallback
                ? {
                    width: `${layout.htmlWidth}px`,
                    height: `${layout.htmlHeight}px`,
                    transform: `scale(${fallbackScale})`,
                    transformOrigin: "center center",
                    opacity: isFallbackMeasured ? 1 : 0,
                    transition: "opacity 320ms ease-out",
                    willChange: "opacity, transform",
                  }
                : {
                    width: `${layout.htmlWidth}px`,
                    height: `${layout.htmlHeight}px`,
                  }
            }
          >
            <div className="h-full w-full overflow-hidden border border-white/14 text-brand-secondary shadow-[0_24px_64px_rgba(0,0,0,0.4)]">
              <div className="h-full w-full overflow-y-auto px-6 md:px-10 [scrollbar-color:rgba(255,255,255,0.22)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/22">
                <div className="sticky top-0 z-0 -mx-6 -mt-6 md:-mx-10 md:-mt-9">
                  <div className="relative h-[320px] overflow-hidden md:h-[360px]">
                    <img
                      src="/images/location-image.webp"
                      alt="Map background"
                      className="h-full w-full object-cover object-[center_72%]"
                    />
                    <div className="absolute inset-0 bg-black/35" />
                  </div>
                </div>

                <div className="relative z-10">
                  <header className="relative z-20 -mt-[320px] h-[320px] md:-mt-[360px] md:h-[360px]">
                    <div className="absolute bottom-0 left-6 max-w-[55%] translate-y-1/2 md:left-9">
                      <p className="text-[50px] leading-[0.96] font-light tracking-tight md:text-[62px]">
                        <span className="text-brand-primary">Hello,</span>
                        <br />
                        <span className="text-brand-secondary">
                          I&apos;m Hampus.
                        </span>
                      </p>
                    </div>

                    <AboutHeadshot />
                  </header>

                  <div className="pointer-events-none relative z-10 -mx-6 -mt-8 h-12 bg-gradient-to-b from-transparent via-[#0c1018]/28 to-[#111722] backdrop-blur-[4px] md:-mx-10 md:-mt-10 md:h-12" />

                  <div className="relative z-10 -mx-6 -mt-px bg-[#111722] px-6 pt-28 md:-mx-10 md:px-10 md:pt-40">
                    <div className="mx-auto w-full max-w-[980px]">
                      <section className="mt-0 border-b border-white/10 pb-8">
                        <p className="text-[42px] leading-tight font-light tracking-tight text-brand-secondary md:text-[54px]">
                          Full-stack developer building ambitious web products
                          with strong backend depth.
                        </p>
                        <p className="mt-5 text-[23px] leading-10 text-brand-muted md:max-w-[90%]">
                          I build full-stack applications with a particular
                          interest in backend architecture, real-time systems,
                          and interactive frontend experiences. The work I enjoy
                          most sits where technical depth, product thinking, and
                          thoughtful UI all need to come together.
                        </p>
                      </section>

                      <section className="mt-8 grid gap-8 md:grid-cols-[1.35fr_1fr]">
                        <div>
                          <h2 className="text-[19px] font-medium text-brand-primary md:text-[16px]">
                            Profile
                          </h2>
                          <p className="mt-3 text-[20px] leading-10 text-brand-muted md:text-[16px] md:leading-8">
                            I have built projects spanning real-time
                            collaboration, 3D editing, security scanning
                            workflows, AI-assisted study tools, and this
                            portfolio platform itself. Across those projects, I
                            usually take ownership end to end: frontend, backend
                            APIs, data modeling, integration work, and the
                            overall product direction.
                          </p>
                          <p className="mt-3 text-[20px] leading-10 text-brand-muted md:text-[16px] md:leading-8">
                            I am especially motivated by products that have real
                            engineering complexity behind them. That includes
                            synchronization, queue-driven workflows,
                            authentication, database-backed systems, and
                            interfaces that still feel clean and intentional
                            despite the technical depth.
                          </p>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h2 className="text-[19px] font-medium text-brand-primary md:text-[16px]">
                              Core Stack
                            </h2>
                            <p className="mt-3 text-[19px] leading-9 text-brand-muted md:text-[15px] md:leading-7">
                              TypeScript, JavaScript, Java, C#, React, Node.js,
                              Express, PostgreSQL
                            </p>
                          </div>
                          <div>
                            <h2 className="text-[19px] font-medium text-brand-primary md:text-[16px]">
                              Principles
                            </h2>
                            <p className="mt-3 text-[19px] leading-9 text-brand-muted md:text-[15px] md:leading-7">
                              Clear architecture, strong product ownership,
                              performance-aware implementation, and thoughtful
                              UX.
                            </p>
                          </div>
                        </div>
                      </section>

                      <section className="mt-8 border-t border-white/10 pt-7">
                        <h2 className="text-[19px] font-medium text-brand-primary md:text-[16px]">
                          Current Focus
                        </h2>
                        <p className="mt-3 text-[20px] leading-10 text-brand-muted md:text-[16px] md:leading-8">
                          Looking for a full-stack role where I can keep growing
                          in backend architecture while building polished,
                          technically ambitious products with a strong team.
                        </p>
                      </section>

                      <AboutContactForm />

                      <footer className="mt-8 flex items-center gap-2 border-t border-white/10 pb-10 pt-7">
                        <a
                          href="https://github.com/hampusbosson"
                          target="_blank"
                          rel="noreferrer"
                          className="appearance-none rounded-lg border border-white/20 bg-white/[0.06] px-3 py-2 text-sm font-medium text-brand-secondary transition-colors hover:bg-white/[0.12]"
                        >
                          GitHub
                        </a>
                        <a
                          href="https://www.linkedin.com/in/hampus-bosson-897815270/"
                          target="_blank"
                          rel="noreferrer"
                          className="appearance-none rounded-lg border border-white/20 bg-white/[0.06] px-3 py-2 text-sm font-medium text-brand-secondary transition-colors hover:bg-white/[0.12]"
                        >
                          LinkedIn
                        </a>
                      </footer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}
