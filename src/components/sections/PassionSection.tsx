import { SectionTabs } from "@/components/SectionTabs";

export function PassionSection() {
  return (
    <section
      className="relative bg-scroll bg-cover bg-center py-24 sm:py-32 lg:bg-fixed"
      style={{ backgroundImage: "url(/images/parallex-bg.jpg)" }}
    >
      <div className="relative mx-auto max-w-5xl px-6 sm:px-8">
        <h2 className="font-script text-5xl font-bold leading-tight text-accent-yellow sm:text-6xl md:text-7xl">
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

        <div className="mt-6 flex flex-wrap gap-4">
          <span className="rounded bg-black px-6 py-3 text-base font-semibold text-white sm:text-lg">音乐人</span>
          <span className="rounded bg-black px-6 py-3 text-base font-semibold text-white sm:text-lg">作者</span>
        </div>
      </div>

      <div className="absolute inset-y-0 right-16 z-[25] hidden overflow-hidden md:block lg:right-20">
        <SectionTabs />
      </div>
    </section>
  );
}
