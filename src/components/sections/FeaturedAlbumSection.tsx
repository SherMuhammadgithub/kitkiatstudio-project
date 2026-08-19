import Image from "next/image";

const PLATFORMS = [
  "Spotify (Coming Soon)",
  "Apple Music (Coming Soon)",
  "网易云音乐 (Coming Soon)",
  "Youtube Music (Coming Soon)",
  "JOOX (Coming Soon)",
  "KK Box (Coming Soon)",
  "Line Music (Coming Soon)",
  "QQ 音乐 (Coming Soon)",
  "YouTube Lyrics Music (Coming Soon)",
  "Tidal (Coming Soon)",
];

const COLORS = [
  "bg-teal-200 text-teal-900",
  "bg-emerald-200 text-emerald-900",
  "bg-sky-200 text-sky-900",
];

export function FeaturedAlbumSection() {
  return (
    <section className="grid grid-cols-1 bg-black lg:grid-cols-2">
      <div className="flex flex-col justify-center gap-6 px-6 py-16 sm:px-12 lg:py-20">
        <div>
          <p className="text-lg font-medium text-white sm:text-xl">2025年专辑</p>
          <h2 className="mt-1 text-3xl font-bold text-white sm:text-4xl">代码21项目</h2>
          <p className="mt-2 text-lg text-zinc-300 sm:text-xl">The Code 21 Project</p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {PLATFORMS.map((label, i) => (
            <button
              key={label}
              type="button"
              disabled
              title={label}
              className={`cursor-default rounded px-3 py-2.5 text-left text-xs font-medium sm:text-sm ${COLORS[i % COLORS.length]}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative min-h-[50vh] bg-zinc-100 lg:min-h-full">
        <Image
          src="/images/music-hero-1.avif"
          alt="代码21项目 — The Code 21 Project album cover"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
