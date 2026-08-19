import Image from "next/image";

export function PrincipiumSection() {
  return (
    <section>
      <div className="flex items-center justify-center bg-accent-yellow py-6">
        <svg viewBox="0 0 40 40" className="h-10 w-10 rounded-full border-2 border-black p-2">
          <path
            d="M2 20h5l3-9 4 18 4-22 4 22 3-9h5"
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="grid grid-cols-1 bg-black lg:grid-cols-2">
        <div className="relative aspect-[953/606] bg-zinc-200">
          <Image
            src="/images/77a7d0_039aa077f4094366968c9bb04845de61~mv2.avif"
            alt="杰氏定律 — SK Principium album art"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-4 px-8 py-16 text-center sm:px-14 lg:px-16">
          <div>
            <p className="text-xl font-bold italic text-accent-yellow sm:text-2xl">
              SK Principium
            </p>
            <h2 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
              首张专辑：杰氏定律
            </h2>
          </div>

          <div className="max-w-xl space-y-3 text-base leading-relaxed text-white sm:text-lg">
            <p>传递“平凡创作”与“自由梦想”的理念。</p>
            <p>
              一个从小就爱音乐，爱创作，爱唱歌的少年，通过自己的音乐向世界唱出“Now Everyone can
              Sing”的宣言。
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
            <span className="flex items-center gap-1.5 text-xl font-medium text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path d="M4 15V9M9 18V6M14 20V4M19 15V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              amazon <span className="font-bold">music</span>
            </span>
            <span className="flex items-center gap-1.5 text-xl font-bold text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M6.5 9.8c3-0.9 7-0.7 9.8 1" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                <path d="M6.8 12.6c2.6-0.7 6-0.5 8.4 0.9" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                <path d="M7.2 15.3c2.1-0.5 4.9-0.4 6.9 0.8" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
              </svg>
              Spotify
            </span>
            <span className="flex items-center gap-1.5 text-xl font-bold text-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <rect x="3" y="10" width="2.5" height="4" />
                <rect x="7" y="7" width="2.5" height="10" />
                <rect x="11" y="4" width="2.5" height="16" />
              </svg>
              DEEZER
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
