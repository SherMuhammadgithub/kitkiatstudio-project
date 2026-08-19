import Image from "next/image";

export function SecondAlbumSection() {
  return (
    <section className="grid grid-cols-1 bg-black lg:min-h-[70vh] lg:grid-cols-2">
      <div className="relative min-h-[60vh] lg:min-h-full">
        <Image
          src="/images/0c5054_720d7c8fd8324960bed39f5e34e23a1f~mv2.avif"
          alt="S大调与K小调 — S Major &amp; K Minor album art"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="relative flex flex-col items-center justify-center gap-8 px-8 py-20 text-center sm:px-14 lg:px-16">
        <div className="relative">
          <span
            aria-hidden
            className="absolute -right-2 -top-10 h-24 w-24 rounded-full border-2 border-pink-400 sm:h-28 sm:w-28"
          />
          <p className="text-base font-semibold italic text-pink-400 sm:text-lg">
            S Major &amp; K Minor
          </p>
          <h2 className="mt-1 text-3xl font-bold text-white sm:text-4xl">
            2022年专辑：S大调与K小调
          </h2>
        </div>

        <div className="max-w-xl space-y-4 text-base leading-relaxed sm:text-lg">
          <p>
            <span className="relative font-medium text-pink-400">
              跳出框框的思维
              <span
                aria-hidden
                className="absolute left-1/2 top-1/2 -z-10 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/70 sm:h-12 sm:w-12"
              />
            </span>
            <span className="text-white">，“创作无上限，音乐无上限”。</span>
          </p>
          <p className="text-white">
            正如《拓展你的人生地图》所要表达的意义。地图不是疆域，只有正确地认识到音乐思维模型的局限，才能发挥出音乐本身的确实意义。
          </p>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-xl font-medium text-white">
            amazon <span className="font-bold">music</span>
          </span>
          <span className="flex items-center gap-1.5 text-xl font-bold text-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
              <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path
                d="M6.5 9.8c3-0.9 7-0.7 9.8 1"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M6.8 12.6c2.6-0.7 6-0.5 8.4 0.9"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M7.2 15.3c2.1-0.5 4.9-0.4 6.9 0.8"
                stroke="currentColor"
                strokeWidth="1.4"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
            Spotify
          </span>
        </div>

        <button
          type="button"
          disabled
          className="w-fit cursor-default rounded bg-accent-yellow px-8 py-4 text-base font-semibold text-black sm:text-lg"
        >
          音乐特辑购买链接
        </button>
      </div>
    </section>
  );
}
