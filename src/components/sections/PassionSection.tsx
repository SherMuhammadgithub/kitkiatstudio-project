export function PassionSection() {
  return (
    <section
      className="relative bg-scroll bg-cover bg-center py-24 sm:py-32 lg:bg-fixed"
      style={{ backgroundImage: "url(/images/parallex-bg.jpg)" }}
    >
      <div className="relative mx-auto max-w-5xl px-6 sm:px-8">
        <h2 className="font-script text-4xl leading-tight text-accent-yellow sm:text-5xl md:text-6xl">
          Passion, Inspiration,
          <br /> Freedom &amp; Dreams
        </h2>

        <p className="mt-10 text-sm text-zinc-700">地球上8亿分之1的我</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-3 text-lg font-medium text-zinc-800 sm:text-xl">
          <span>谷歌 摩根大通 安永</span>
          <span className="rounded bg-black px-3 py-1 text-white">白羊座</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-x-2 gap-y-2 text-base text-zinc-800 sm:text-lg">
          <span className="bg-zinc-300/70 px-2 py-0.5">NLP高级导师</span>
          <span className="bg-zinc-300/70 px-2 py-0.5">美国NGH认证催眠师</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded bg-black px-4 py-2 text-sm font-semibold text-white">音乐人</span>
          <span className="rounded bg-black px-4 py-2 text-sm font-semibold text-white">作者</span>
        </div>
      </div>
    </section>
  );
}
