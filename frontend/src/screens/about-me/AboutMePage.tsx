import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import AboutContactForm from "./AboutContactForm";
import * as THREE from "three";

export default function AboutMePage({ isActive }: { isActive?: boolean }) {
  const { size, pointer } = useThree();
  const motionRef = useRef<THREE.Group>(null!);

  const layout = useMemo(() => {
    const isMobile = size.width < 768;

    if (isMobile) {
      return {
        position: [9, -1.62, 7.35] as [number, number, number],
        scale: 0.24,
        distanceFactor: 2.28,
        htmlWidth: 660,
        htmlHeight: 1020,
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
  }, [size.width]);

  /**
   * ROTATE SCREEN SLIGHTLY ON MOUSE MOVEMENT
   */
  // useFrame((_, delta) => {
  //   if (!isActive) return;
  //   if (!motionRef.current) return;

  //   const targetRotX = pointer.y * -0.05; // tilt up/down
  //   const targetRotY = pointer.x * 0.05; // tilt left/right

  //   // Smooth damping
  //   motionRef.current.rotation.x = THREE.MathUtils.lerp(
  //     motionRef.current.rotation.x,
  //     targetRotX,
  //     2 * delta,
  //   );

  //   motionRef.current.rotation.y = THREE.MathUtils.lerp(
  //     motionRef.current.rotation.y,
  //     targetRotY,
  //     2 * delta,
  //   );

  //   // move inner panel slightly without changing root world position
  //   motionRef.current.position.x = THREE.MathUtils.lerp(
  //     motionRef.current.position.x,
  //     pointer.x * 0.08,
  //     3 * delta,
  //   );
  // });

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

          <mesh position={[0, 0, -0.01]}>
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
            <meshBasicMaterial color="black" transparent opacity={0.12} />
          </mesh>
        </group>

        <Html
          transform
          position={[0, 0, 0.03]}
          distanceFactor={layout.distanceFactor}
          style={{
            width: `${layout.htmlWidth}px`,
            height: `${layout.htmlHeight}px`,
            pointerEvents: "auto",
          }}
        >
        <div className="h-full w-full overflow-hidden border border-white/14 text-white shadow-[0_24px_64px_rgba(0,0,0,0.4)]">
            <div className="h-full w-full overflow-y-auto px-6 md:px-10 [scrollbar-color:rgba(255,255,255,0.22)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/22">
              <div className="sticky top-0 z-0 -mx-6 -mt-6 md:-mx-10 md:-mt-9">
                <div className="relative h-[320px] overflow-hidden md:h-[360px]">
                  <img
                    src="/images/location-image.webp"
                    alt="Map background"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/35" />
                </div>
              </div>

              <div className="relative z-10">
                <header className="relative z-20 -mt-[320px] h-[320px] md:-mt-[360px] md:h-[360px]">
                  <div className="absolute bottom-0 left-6 max-w-[55%] translate-y-1/2 md:left-9">
                    <p className="text-[44px] leading-[0.96] font-light tracking-tight text-white md:text-[62px]">
                      Hello,
                      <br />
                      I&apos;m Hampus.
                    </p>
                  </div>

                  <div className="absolute right-6 bottom-0 w-[112px] translate-y-1/2 rounded-2xl border border-white/20 bg-black/20 p-1.5 shadow-[0_24px_38px_rgba(0,0,0,0.45)] backdrop-blur-sm md:right-9 md:w-[200px] md:rounded-3xl md:p-2">
                    <img
                      src="/images/headshot.webp"
                      alt="Hampus portrait"
                      className="h-full w-full rounded-xl object-cover md:rounded-2xl"
                    />
                  </div>
                </header>

                <div className="pointer-events-none relative z-10 -mx-6 -mt-8 h-8 bg-gradient-to-b from-transparent via-[#0c1018]/28 to-[#111722]/92 backdrop-blur-[4px] md:-mx-10 md:-mt-10 md:h-10" />

                <div className="relative z-10 -mt-px -mx-6 bg-[#111722]/92 px-6 pt-28 md:-mx-10 md:px-10 md:pt-40">
                <div className="mx-auto w-full max-w-[980px]">
                <section className="mt-0 border-b border-white/10 pb-8">
                  <p className="text-[34px] leading-tight font-light tracking-tight text-white/92 md:text-[54px]">
                    Frontend Developer focused on performant 3D web experiences.
                  </p>
                  <p className="mt-5 text-[19px] leading-9 text-white/68 md:max-w-[90%]">
                    I&apos;m a software engineer specializing in web development
                    infrastructure. My passion is improving developer experience
                    by creating tools and products that streamline real-world
                    workflows.
                  </p>
                </section>

                <section className="mt-8 grid gap-8 md:grid-cols-[1.35fr_1fr]">
                  <div>
                    <h2 className="text-[16px] font-medium text-white">
                      Profile
                    </h2>
                    <p className="mt-3 text-[16px] leading-8 text-white/82">
                      I design and build interactive web products where visual
                      quality and technical reliability have equal priority. My
                      work sits at the intersection of polished UI, real-time
                      graphics, and performance-aware engineering.
                    </p>
                    <p className="mt-3 text-[16px] leading-8 text-white/78">
                      I prefer clear architecture, deliberate motion, and
                      interfaces that feel intentional. The goal is not only to
                      make things look good, but to make them fast, robust, and
                      maintainable.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h2 className="text-[16px] font-medium text-white">
                        Core Stack
                      </h2>
                      <p className="mt-3 text-[15px] leading-7 text-white/78">
                        React, TypeScript, React Three Fiber, Drei, TailwindCSS,
                        GSAP, Vite
                      </p>
                    </div>
                    <div>
                      <h2 className="text-[16px] font-medium text-white">
                        Principles
                      </h2>
                      <p className="mt-3 text-[15px] leading-7 text-white/78">
                        Performance first, clean structure, strong product
                        thinking.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="mt-8 border-t border-white/10 pt-7">
                  <h2 className="text-[16px] font-medium text-white">
                    Current Focus
                  </h2>
                  <p className="mt-3 text-[16px] leading-8 text-white/80">
                    Building a portfolio platform with immersive 3D interaction,
                    clear storytelling, and production-ready engineering
                    standards.
                  </p>
                </section>

                <AboutContactForm />

                <footer className="mt-8 flex items-center gap-2 border-t border-white/10 pt-7 pb-10">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-white/20 bg-white/[0.06] px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/[0.12]"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-white/20 bg-white/[0.06] px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:bg-white/[0.12]"
                  >
                    LinkedIn
                  </a>
                </footer>
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
