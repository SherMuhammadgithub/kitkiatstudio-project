import Image from "next/image";

const DESCRIPTION = [
  "《代码21项目》延续了我前两张专辑的多元化风格。在此基础上，我建构了以异次元、宗教与科技感等元素的专辑制作。",
  "为什么要选择21？21是我的生日，也因此不由自主地也成为了我的幸运号码。另外，自小也接触过塔罗牌的我知道，21对应着塔罗牌阿尔克那（Arcana）的“世界”。“世界”象征拥有世间的一切，但这一切并不是每个人都可以掌控的。对我来说，“世界”蕴意着新的轮回，新的希望，与新的突破。准确来说，它是一张象征永久和持续成功的牌。有些牌义词典则认为，“世界”本意是“达成”，意味着所有的事情都可以达成，所有的梦想都可以成为现实，没有不可能得到的事物。只要有耕耘，就能有相应的收获。我希望把这样的讯息与宣扬在《代码21项目》里，象征我音乐上的新世界，作为我2024最新的音乐项目。",
  "专辑的开端，我将会带领大家乘着太空船去到19世纪拜访伟大的音乐家《李斯特先生》，再去到楚汉时代体会古代凄美的《帘外雨》。随后，我们将会折返回到20世纪参与第二次世界大战，带给战后的子民往后的和平佳音，祈求《直到世界和平》。体验完了战争，我们将回到现今21世纪。在太空船停泊之时候，你会看见一个穿梭数万光年的爱情故事，男女主角因为一次的意外《不负遇见》，却因为时光机的任意门限制而必须离开。也许，只有心底想着《当你没来过》，才能够让抹去所有的悲伤。最后，我们将启程去北半球的美国，体验《波士顿的阳光》与查尔斯《河畔上的幸福》，再乘坐飞船回到了我们的原点，即马来西亚柔佛麻坡，一起为我的母校麻坡中化中学的校庆而《再欢舞》。",
  "“21”是个时代之门，从二回归到一，最终去到原点，希望这样的含义能带给你们在音乐聆听路上有个跨时代的体验。",
];

const TRACKS = [
  { title: "李特斯先生", image: "/images/track-01.avif" },
  { title: "帘外雨", image: "/images/track-01.avif" },
  { title: "直到世界和平", image: "/images/track-01.avif" },
  { title: "河畔上的幸福", image: "/images/track-06.avif" },
  { title: "不负遇见", image: "/images/track-01.avif" },
  { title: "波士顿的阳光", image: "/images/track-06.avif" },
  { title: "当你没来过", image: "/images/track-01.avif" },
  { title: "再欢舞", image: "/images/track-06.avif" },
];

export function TracklistSection() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center bg-zinc-100 px-10 py-10 sm:px-12 2xl:px-32">
        <div className="space-y-4 text-base leading-relaxed text-zinc-800 sm:text-lg">
          {DESCRIPTION.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 content-center gap-3 bg-zinc-600 lg:px-32 px-10 py-6 sm:gap-4 sm:py-8">
        {TRACKS.map((track, i) => (
          <div
            key={`${track.title}-${i}`}
            className="relative h-36 overflow-hidden rounded-sm sm:h-40 lg:h-44"
          >
            <Image
              src={track.image}
              alt={track.title}
              fill
              sizes="(min-width: 1024px) 25vw, 45vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
