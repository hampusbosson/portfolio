import { useEffect, useState } from "react";
import { sfx } from "../../audio/sfx";
import { PROJECT_DETAILS } from "../../content/projectDetails";
import { projects } from "../../content/projects";
import { useEscapeKey } from "../../utils/useEscapeKey";

interface ProjectInfoOverlayProps {
  currentIndex: number;
  onClose: () => void;
  isEscapeEnabled?: boolean;
}

export default function ProjectInfoOverlay({
  currentIndex,
  onClose,
  isEscapeEnabled = true,
}: ProjectInfoOverlayProps) {
  const safeIndex = Math.min(Math.max(currentIndex, 0), projects.length - 1);
  const project = projects[safeIndex];
  const details = PROJECT_DETAILS[project.id];
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    setActiveMediaIndex(0);
    setIsLightboxOpen(false);
  }, [project.id]);

  useEscapeKey(() => {
    if (isLightboxOpen) {
      setIsLightboxOpen(false);
      return;
    }

    onClose();
  }, isEscapeEnabled);

  const media = details.media;
  const activeMedia = media[Math.min(activeMediaIndex, media.length - 1)];

  const handlePrevMedia = () => {
    setActiveMediaIndex((current) =>
      current === 0 ? media.length - 1 : current - 1,
    );
  };

  const handleNextMedia = () => {
    setActiveMediaIndex((current) =>
      current === media.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="pointer-events-auto absolute inset-0 bg-black/66 backdrop-blur-md"
        onClick={onClose}
      />

      <section
        className="pointer-events-auto relative z-10 flex h-full w-full max-w-6xl flex-col px-6 pb-8 pt-8 text-white md:px-12 md:pb-10 md:pt-10"
        onWheelCapture={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-x-[12%] top-[18%] h-[34vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(195,148,73,0.14)_0%,rgba(16,18,24,0)_70%)] blur-3xl" />

        <div className="relative mt-2 min-h-0 flex-1 overflow-y-auto rounded-[28px] border border-white/12 bg-[#0f131a]/92 p-6 shadow-[0_16px_48px_rgba(0,0,0,0.36)] [scrollbar-color:rgba(255,255,255,0.24)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-[3px] [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-white/24 [&::-webkit-scrollbar-thumb:hover]:bg-white/36 md:p-8">
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
            <div className="max-w-3xl">
              <p className="text-brand-primary text-[10px] font-medium tracking-[0.18em] uppercase">
                Project Case Study
              </p>
              <h2 className="mt-2 text-[30px] font-semibold leading-tight text-brand-secondary md:text-[38px]">
                {project.title}
              </h2>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-brand-muted">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.12em] text-white/62">
                <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
                  {details.role}
                </span>
                <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5">
                  {details.timeline}
                </span>
                {details.award ? (
                  <span className="rounded-full border border-brand-primary/30 bg-brand-primary/10 px-3 py-1.5 text-brand-primary">
                    {details.award}
                  </span>
                ) : null}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              onPointerEnter={() => sfx.play("hover")}
              className="rounded-full border border-white/18 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/86 transition-colors hover:bg-white/[0.1]"
            >
              Close
            </button>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-8">
              <section>
                <h3 className="text-sm font-medium tracking-[0.12em] text-brand-primary uppercase">
                  Media
                </h3>
                <div className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    onPointerEnter={() => sfx.play("hover")}
                    className="block w-full hover:cursor-pointer"
                  >
                    <img
                      src={activeMedia.src}
                      alt={activeMedia.alt}
                      className="aspect-video w-full object-cover transition-transform duration-200 hover:scale-[1.01]"
                    />
                  </button>
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <p className="text-sm leading-7 text-white/68">
                    {activeMedia.caption}
                  </p>
                  {media.length > 1 ? (
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrevMedia}
                        onPointerEnter={() => sfx.play("hover")}
                        className="rounded-full border border-white/18 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/84 transition-colors hover:bg-white/[0.1]"
                      >
                        Prev
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMedia}
                        onPointerEnter={() => sfx.play("hover")}
                        className="rounded-full border border-white/18 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/84 transition-colors hover:bg-white/[0.1]"
                      >
                        Next
                      </button>
                    </div>
                  ) : null}
                </div>
                {media.length > 1 ? (
                  <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {media.map((item, index) => (
                      <button
                        key={`${item.src}-${index}`}
                        type="button"
                        onClick={() => setActiveMediaIndex(index)}
                        onPointerEnter={() => sfx.play("hover")}
                        className={`overflow-hidden rounded-xl border transition-colors ${
                          index === activeMediaIndex
                            ? "border-brand-primary/40"
                            : "border-white/10 hover:border-white/22"
                        }`}
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="aspect-video w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                ) : null}
              </section>

              <section>
                <h3 className="text-sm font-medium tracking-[0.12em] text-brand-primary uppercase">
                  Overview
                </h3>
                <div className="mt-3 space-y-4">
                  {details.overview.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-[15px] leading-8 text-white/82"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-sm font-medium tracking-[0.12em] text-brand-primary uppercase">
                  Why It Stands Out
                </h3>
                <p className="mt-3 rounded-2xl border border-brand-primary/20 bg-brand-primary/8 px-4 py-4 text-[15px] leading-8 text-brand-secondary">
                  {details.standout}
                </p>
              </section>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-sm font-medium tracking-[0.12em] text-brand-primary uppercase">
                  Stack
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {details.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-2 text-sm text-white/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-sm font-medium tracking-[0.12em] text-brand-primary uppercase">
                  Key Features
                </h3>
                <div className="mt-3 space-y-3">
                  {details.features.map((item) => (
                    <p
                      key={item}
                      className="border-l border-white/12 pl-4 text-[15px] leading-7 text-white/80"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-sm font-medium tracking-[0.12em] text-brand-primary uppercase">
                  Technical Challenges
                </h3>
                <div className="mt-3 space-y-3">
                  {details.challenges.map((item) => (
                    <p
                      key={item}
                      className="border-l border-brand-primary/25 pl-4 text-[15px] leading-7 text-white/80"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </section>

              <section className="border-t border-white/10 pt-6">
                <h3 className="text-sm font-medium tracking-[0.12em] text-brand-primary uppercase">
                  Links
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.githubLink ? (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      onPointerEnter={() => sfx.play("hover")}
                      className="rounded-lg border border-white/20 bg-white/8 px-3 py-2 text-sm font-medium text-white/92 transition-colors hover:bg-white/16"
                    >
                      GitHub
                    </a>
                  ) : null}
                  {project.demoLink ? (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noreferrer"
                      onPointerEnter={() => sfx.play("hover")}
                      className="rounded-lg border border-brand-primary/30 bg-brand-primary/12 px-3 py-2 text-sm font-medium text-brand-secondary transition-colors hover:bg-brand-primary/18"
                    >
                      Live Demo
                    </a>
                  ) : null}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      {isLightboxOpen ? (
        <div className="pointer-events-auto absolute inset-0 z-20 flex items-center justify-center p-4 md:p-8">
          <div
            className="absolute inset-0 bg-black/82 backdrop-blur-sm"
            onClick={() => setIsLightboxOpen(false)}
          />

          <div className="relative z-10 flex w-full max-w-7xl flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm leading-7 text-white/72">
                {activeMedia.caption}
              </p>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                onPointerEnter={() => sfx.play("hover")}
                className="rounded-full border border-white/18 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/86 transition-colors hover:bg-white/[0.1]"
              >
                Close
              </button>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/50">
              <img
                src={activeMedia.src}
                alt={activeMedia.alt}
                className="max-h-[78vh] w-full object-contain"
              />
            </div>

            {media.length > 1 ? (
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handlePrevMedia}
                  onPointerEnter={() => sfx.play("hover")}
                  className="rounded-full border border-white/18 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/84 transition-colors hover:bg-white/[0.1]"
                >
                  Previous Image
                </button>
                <span className="text-sm text-white/58">
                  {activeMediaIndex + 1} / {media.length}
                </span>
                <button
                  type="button"
                  onClick={handleNextMedia}
                  onPointerEnter={() => sfx.play("hover")}
                  className="rounded-full border border-white/18 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/84 transition-colors hover:bg-white/[0.1]"
                >
                  Next Image
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
