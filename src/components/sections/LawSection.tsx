import Image from "next/image";

const PLATFORMS = [
  "Apple Music",
  "Youtube Music",
  "JOOX",
  "Line Music",
  "QQ音乐",
  "网易云音乐",
  "Tidal",
  "Qobuz",
  "KKBox",
  "千千音乐",
  "爱歌词",
  "Youtube (Lyrics MV)",
];

export function LawSection() {
  return (
    <section className="grid grid-cols-1 bg-black lg:grid-cols-2">
      <div className="flex flex-col justify-center gap-6 px-8 py-16 sm:px-14 lg:px-16 2xl:px-32">
        <div className="space-y-4 text-base leading-relaxed text-white sm:text-lg">
          <p>
            定律是一种客观规律的统称，是古今解锁宇宙奥秘的钥匙。定律是了解我们，小至日常生活，大至宇宙的基石，它亘古不变，易懂却让人难以捉摸。公元前一世纪，毕达哥拉斯向我们展示了，平面上的直角三角形与两条直角边的长度关系，因而有了《毕氏定理》。15世纪，明朝音乐家朱载堉（朱元璋第九世孙）发现了十二平均律的关键数据而发展出现代音程，后被西方世界发扬光大。
          </p>
          <p>
            学音乐的孩子都不坏，小时候的俯宏非常叛逆，他的妈妈为了让他培养兴趣，从7岁就把他送去学钢琴。就这样一接触，俯宏慢慢地对音乐产生了热爱。
          </p>
          <p>
            作为一个从小就爱音乐，爱创作，爱唱歌的少年，俯宏认为创作不是音乐人或歌手的权利，每个人都有分享音乐的自由与机会。正如亚航（Air
            Asia）的口号，俯宏希望透过此专辑来向大家宣扬“Now Everyone can Sing”的理念。
          </p>
          <p>
            也许，在这充满着“伪装者”的“寂寞城市”生活，你总是感到渺小，力不从心；也许你在生活上，总是觉得“亏欠太多”，“你要的勇气”；也许，你已经遗忘了“记忆里的背影”，那些默默支持你的“无名英雄”。无论你走到哪里，《杰氏定律》将会“还是好朋友”一样地陪你走到最后，等你“再遇见曙光的时候”，它将会以一个不同的面貌看待全新的你。
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {PLATFORMS.map((label) => (
            <button
              key={label}
              type="button"
              disabled
              className="cursor-default border border-white/70 px-3 py-2.5 text-xs font-medium text-white sm:text-sm"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="relative aspect-953/627">
          <Image
            src="/images/77a7d0_bb748a0a749449b8a316b830d88a6871~mv2.avif"
            alt="杰氏定律 portrait"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="relative aspect-953/270 overflow-hidden">
          <Image
            src="/images/11062b_2455fa4b90ea4a1685db520a47af69c3~mv2.avif"
            alt="Purchase links background"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />

          {[
            { label: "合家电子书购买链接", left: "13%", top: "40%" },
            { label: "台湾Pubu电子书购买链接", left: "31%", top: "48%" },
            { label: "亚马逊电子书购买链接", left: "49%", top: "56%" },
            { label: "作者亲发表格链接", left: "68%", top: "64%" },
          ].map((tag) => (
            <button
              key={tag.label}
              type="button"
              disabled
              style={{ left: tag.left, top: tag.top }}
              className="absolute w-28 -translate-x-1/2 -translate-y-1/2 rotate-[-62deg] cursor-default bg-accent-yellow px-2 py-3 text-center text-[9px] font-medium text-black sm:w-36 sm:py-4 sm:text-[11px]"
            >
              {tag.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
