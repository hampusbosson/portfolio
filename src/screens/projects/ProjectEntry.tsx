type ProjectEntryProps = {
  title: string
  description: string
  index: number
}

const ProjectEntry = ({ title, description, index }: ProjectEntryProps) => {
  return (
    <article className="min-w-0 flex-[0_0_var(--slide-size)] pl-(--slide-spacing)">
      <div className="h-(--slide-height) w-full rounded-2xl border border-white/15 bg-black/10" />

      <div className="mt-3 rounded-xl border border-white/20 bg-black/45 p-4 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm">
        <p className="text-[11px] font-medium tracking-[0.14em] text-white/60 uppercase">
          Slide {index + 1}
        </p>
        <h3 className="mt-1 text-base font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-white/80">{description}</p>
      </div>
    </article>
  )
}

export default ProjectEntry
