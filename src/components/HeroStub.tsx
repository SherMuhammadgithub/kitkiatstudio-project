/**
 * Placeholder hero — layout/rhythm only, to be replaced with the real
 * hero build. Kept intentionally plain so it doesn't compete with that work.
 */
export function HeroStub() {
  return (
    <section className="relative grid min-h-[70vh] grid-cols-1 bg-white sm:min-h-[80vh] md:grid-cols-2">
      <div className="relative min-h-[40vh] bg-gradient-to-br from-zinc-300 via-zinc-500 to-zinc-800 md:min-h-full">
        <span className="absolute bottom-4 left-4 text-xs font-medium text-white/70">
          [ portrait photo — to be added ]
        </span>
      </div>
      <div className="relative flex flex-col justify-center gap-2 bg-zinc-100 px-6 py-12 sm:px-12 md:py-0">
        <div
          aria-hidden
          className="absolute right-8 top-10 hidden h-40 w-40 rounded-full border-2 border-accent-purple opacity-70 sm:block"
        />
        <h1 className="relative max-w-lg text-3xl leading-tight text-zinc-900 sm:text-4xl md:text-5xl">
          Attitude defines <em className="not-italic italic">Your</em> Aptitude{" "}
          <strong className="font-bold">Change</strong> defines your{" "}
          <strong className="font-bold">Opportunities.</strong>{" "}
          <span className="italic">The</span>{" "}
          <strong className="bg-accent-yellow px-1 font-bold not-italic">SK</strong>{" "}
          <span className="bg-accent-yellow px-1">way.</span>
        </h1>
      </div>
    </section>
  );
}
