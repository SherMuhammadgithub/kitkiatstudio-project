import Image from "next/image";

/**
 * Placeholder hero — layout/rhythm only, to be replaced with the real
 * hero build. Kept intentionally plain so it doesn't compete with that work.
 */
export function HeroStub() {
  return (
    <section className="relative grid min-h-[70vh] grid-cols-1 bg-white sm:min-h-[85vh] md:grid-cols-[36%_64%]">
      <div className="relative min-h-[45vh] bg-zinc-800 md:min-h-full">
        <Image
          src="/images/hero.avif"
          alt="SK portrait"
          fill
          priority
          sizes="(min-width: 768px) 36vw, 100vw"
          className="object-cover object-[50%_18%]"
        />
      </div>
      <div className="relative flex flex-col items-center justify-center gap-2 bg-zinc-100 px-6 py-12 sm:px-12 md:py-0">
        <ScribbleCircle className="absolute right-6 top-16 hidden h-72 w-72 text-accent-purple sm:block md:right-4 lg:right-10" />
        <h1 className="relative max-w-xl text-4xl leading-tight text-zinc-900 sm:text-5xl lg:text-6xl">
          Attitude defines
          <br />
          <em className="italic">Your</em> Aptitude
          <br />
          <strong className="font-bold">Change</strong>
          <br />
          defines
          <br />
          your <strong className="font-bold">Opportunities.</strong>
          <br />
          <span className="bg-accent-yellow">
            <em className="italic">The</em> <strong className="font-bold">SK</strong> way.
          </span>
        </h1>
      </div>
    </section>
  );
}

function ScribbleCircle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} aria-hidden>
      <path
        d="M100,25 C140,25 170,55 170,95 C170,135 140,168 98,168 C58,168 28,138 30,98 C32,60 62,28 100,30"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M104,32 C142,34 166,62 164,98 C162,134 134,160 98,158 C64,156 34,128 38,94 C42,60 68,30 104,34"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.8"
      />
      <path
        d="M98,38 C132,36 156,64 156,96 C156,130 130,152 96,150 C64,148 40,122 42,92 C44,62 66,38 98,40"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.6"
      />
    </svg>
  );
}
