export function BeliefSection() {
  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(255,255,255,0.06),transparent_55%),radial-gradient(circle_at_85%_60%,rgba(255,255,255,0.04),transparent_50%)]"
      />

      <div className="relative mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-6 sm:px-8 md:grid-cols-2">
        <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-sm sm:min-h-[340px]">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-400 via-zinc-600 to-zinc-900" />
          <span
            aria-hidden
            className="relative select-none text-[6rem] font-black leading-none text-transparent sm:text-[8rem]"
            style={{ WebkitTextStroke: "3px #e3e600" }}
          >
            SK
          </span>
        </div>

        <div className="relative">
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            className="absolute -right-2 -top-10 h-24 w-24 opacity-80 sm:h-32 sm:w-32"
          >
            <line x1="10" y1="10" x2="90" y2="90" stroke="#e3e600" strokeWidth="9" strokeLinecap="round" />
            <line x1="90" y1="10" x2="10" y2="90" stroke="#e3e600" strokeWidth="9" strokeLinecap="round" />
          </svg>
          <p className="relative max-w-md text-lg leading-relaxed text-white sm:text-xl">
            一个相信潜力无限，提倡自由，提倡梦想，积极鼓励大家拓展自己人生的青年世界
          </p>
        </div>
      </div>
    </section>
  );
}
