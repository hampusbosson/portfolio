type SfxName = "pop" | "hover";

type SfxConfig = {
  url: string;
  poolSize: number;
  volume?: number;
};

const CONFIG: Record<SfxName, SfxConfig> = {
  pop: { url: "/sound/bubble-pop.mp3", poolSize: 6, volume: 1 },
  hover: { url: "/sound/hover-button.mp3", poolSize: 8, volume: 0.15 },
};

class Sfx {
  private pools = new Map<SfxName, HTMLAudioElement[]>();
  private indices = new Map<SfxName, number>();
  private unlocked = false;

  init() {
    // Create pools once
    (Object.keys(CONFIG) as SfxName[]).forEach((name) => {
      const { url, poolSize, volume } = CONFIG[name];
      const pool: HTMLAudioElement[] = [];

      for (let i = 0; i < poolSize; i++) {
        const a = new Audio(url);
        a.preload = "auto";
        if (volume != null) a.volume = volume;
        a.load();
        pool.push(a);
      }

      this.pools.set(name, pool);
      this.indices.set(name, 0);
    });
  }

  unlock() {
    // Call once on first pointerdown/keydown
    this.unlocked = true;
  }

  play(
    name: SfxName,
    opts?: { volume?: number; playbackRate?: number; reset?: boolean },
  ) {
    if (!this.unlocked) return;

    const pool = this.pools.get(name);
    if (!pool || pool.length === 0) return;

    const idx = this.indices.get(name) ?? 0;
    const audio = pool[idx];

    this.indices.set(name, (idx + 1) % pool.length);

    if (opts?.reset !== false) audio.currentTime = 0;
    if (opts?.volume != null) audio.volume = opts.volume;
    if (opts?.playbackRate != null) audio.playbackRate = opts.playbackRate;

    audio.play().catch(() => {});
  }
}

export const sfx = new Sfx();
