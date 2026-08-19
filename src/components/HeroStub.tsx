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
        <div className="relative max-w-xl">
          <Image
            src="/images/download.png"
            alt=""
            aria-hidden
            width={288}
            height={288}
            className="absolute right-4 -top-32 z-10 hidden h-56 w-56 object-contain sm:block lg:right-0 lg:-top-36 lg:h-64 lg:w-64"
          />
          <h1 className="relative text-[2.25rem] leading-tight text-zinc-900 sm:text-[2.75rem] lg:text-[3.25rem]">
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
      </div>
    </section>
  );
}
