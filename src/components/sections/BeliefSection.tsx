import Image from "next/image";

const X_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cdefs%3E%3Cfilter id='b' x='-20%25' y='-20%25' width='140%25' height='140%25'%3E%3CfeGaussianBlur stdDeviation='4'/%3E%3C/filter%3E%3C/defs%3E%3Cg filter='url(%23b)' opacity='0.55'%3E%3Cline x1='20' y1='20' x2='180' y2='180' stroke='white' stroke-width='16' stroke-linecap='round'/%3E%3Cline x1='180' y1='20' x2='20' y2='180' stroke='white' stroke-width='16' stroke-linecap='round'/%3E%3C/g%3E%3C/svg%3E\")";

export function BeliefSection() {
  return (
    <section className="grid grid-cols-1 bg-black md:grid-cols-[36%_64%]">
      <div className="relative aspect-[686/698] overflow-hidden bg-zinc-200">
        <Image
          src="/images/section3-hero.avif"
          alt="SK portrait"
          fill
          sizes="(min-width: 768px) 36vw, 100vw"
          className="object-contain"
        />

        <span
          aria-hidden
          className="absolute left-[8%] top-[18%] select-none font-sans text-7xl font-black italic text-accent-yellow sm:text-8xl"
        >
          S
        </span>
        <span
          aria-hidden
          className="absolute bottom-[14%] left-[38%] select-none font-sans text-7xl font-black italic text-accent-yellow sm:text-8xl"
        >
          K
        </span>
        <svg
          aria-hidden
          viewBox="0 0 200 300"
          preserveAspectRatio="none"
          className="pointer-events-none absolute left-[16%] top-[24%] h-[55%] w-[45%]"
        >
          <path
            d="M60,0 L0,0 L0,300 L60,300"
            fill="none"
            stroke="#e3e600"
            strokeWidth="4"
          />
        </svg>
      </div>

      <div className="relative flex items-center overflow-hidden px-6 py-16 sm:px-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-scroll bg-[length:340px_340px] bg-[position:85%_78%] bg-no-repeat sm:bg-[length:460px_460px] lg:bg-fixed"
          style={{ backgroundImage: X_BG }}
        />
        <p className="relative mx-auto max-w-lg text-2xl leading-relaxed text-white sm:text-3xl">
          一个相信潜力无限，提倡自由，提倡梦想，积极鼓励大家拓展自己人生的青年世界
        </p>
      </div>

      <div aria-hidden className="hidden bg-black md:block" />

      <div className="relative bg-zinc-100 px-6 py-12 sm:px-12">
        <div className="flex gap-6">
          <button
            type="button"
            className="hidden shrink-0 self-stretch border border-zinc-300 px-4 pt-4 text-sm font-semibold tracking-widest text-zinc-600 transition-colors hover:bg-black hover:text-white md:block"
            style={{ writingMode: "vertical-rl" }}
          >
            Get in Touch
          </button>
          <div className="hidden w-px shrink-0 self-stretch bg-zinc-300 md:block" />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.7fr_1fr]">
            <div className="space-y-4 text-sm leading-relaxed text-zinc-800 sm:text-base">
              <p>
                SK郭俯宏，《拓展你的人生地图》一书作者，出生于马来西亚的柔佛麻坡，通晓中文、英语、马来语、日语和西班牙语。
              </p>
              <p>
                他目前在摩根大通（JP Morgan Chase &amp; Co）担任运营分析，曾任职会计咨询「四大」的安永（Ernst &amp; Young）担任科技咨询顾问，主要负责处理业务与流程自动化（RPA）与大数据专栈，并曾协助多家国际银行与500强企业制定策略与自动化方案。俯宏拥有多个编码与科技认证，截至目前为止，他已荣获多个高级RPA（BP,AA,UiPath）、Python、SAS、区块链等IT认证。此外，他也是专业敏捷（Agile）开发教练与专家，精益六西格玛黑带（Lean Six Sigma Black Belt）执行师与乐高团队组织训练员（Lego Serious Play® Teamwork Facilitator）。
              </p>
              <p>
                教育背景方面，俯宏2016年毕业于英国曼彻斯特大学，主修国际贸易与经济，随后他在2017年获得了英国剑桥大学科技政策硕士学位。他致力于研究国家科技管理与法律，包括中小型企业的竞争与创新，网际网路发展的商业策略与社会文化的进程等。
              </p>
              <p>
                白羊座的俯宏，有着一个燃烧不完的学习热情，工作的同时也热爱艺术。他获得了英国皇家钢琴与吉他8级文凭的荣誉。除此之外，他努力钻研佛教、西方神秘学、哲学、东方儒道家的经典以及塞斯与奇蹟课程等，遍访名师，积极地探讨生命的旅程，并到处授课演讲。迄今，他荣获美国NLP（Neuro-Linguistic Programming，神经语言程式学）与时间线疗法（Time Line Therapy®）高级执行师认证、美国NGH（National Guild of Hypnotists，美国国家催眠师协会）催眠咨询师与日本灵气三阶导师等证照的殊荣。
              </p>
            </div>

            <div className="text-sm italic leading-relaxed text-zinc-500 sm:text-base">
              <p>
                SK is a Malaysian singer. His music has incorporated pop, rock, R&amp;B, gospel, and classical music. He
                has released albums, namely &lsquo;SK Principium&rsquo; and &lsquo;S Major and K Minor&rsquo;.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
