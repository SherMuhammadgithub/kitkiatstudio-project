import Image from "next/image";

export function TheorySection() {
  return (
    <section className="grid grid-cols-1 bg-black lg:min-h-[70vh] lg:grid-cols-2">
      <div className="flex flex-col justify-center space-y-4 px-8 py-16 text-sm leading-relaxed text-white sm:px-14 sm:text-base lg:px-20 2xl:px-32">
        <p>
          在现代乐理的音律当中，我们都知道调式是7个主音之间（的）一种结构关系，就是怎样在八度区间内分配12个半音，定义1234567i。调式分为大调与小调。大调的古典乐曲当中，我偏肖邦的《降E大调夜曲》，平易优美、饱含诗意。小调的音乐，我则喜欢贝多芬的《C小调第8号钢琴奏鸣曲》、李斯特《B小调奏鸣曲》与。这些流芳百世的歌曲，可远观而不可亵玩焉。因为这些曲子虽然动人优美，但对于我们业余钢琴手来说可不是容易掌握的古曲。
        </p>
        <p>通俗的来说，凡是音阶排列符合全、半、全、全、全、半结构的音阶，就是自然大调。小调则是全、半、全、全、半、全、全的结构。</p>
        <p className="relative">
          <span
            aria-hidden
            className="absolute -left-4 -top-20 -z-10 h-28 w-28 rounded-full bg-pink-500/70 sm:h-32 sm:w-32"
          />
          为什么C会作为音乐的起点？根据《剑桥西方音乐理论发展史》，从意大利教堂音乐的传统开始（随后是法国和西班牙之后），以常规音节命名参考主要音阶的音符：Ut Re Mi Fa Sol La
          Si（与CDEFGAB相对应）来自于一个非常著名的拉丁语歌词。同时在欧洲，以C大音阶为起点的字符也存在，相传主要是因为当时在教堂风琴的构造上，以C作为起点的设计比较符合手掌的宽度。就这样发展下来，C不但象征起点与还原，更是初学者易掌握的音符。
        </p>
        <p>
          至于为什么不同的音符会对应不同的罗马字母，为什么音乐当中只有C,D,E,F,G,A,B,C字母，这些答案则可以追溯到中古时期：桂多的手。桂多（Guido
          d&apos;Arezzo）为当代的一名修士，在吟唱圣约翰赞美诗时，发现此首曲子每一句的第一个音节刚好可以构成一个进阶上行的音符，因此发展出了六声音阶。他将这些对应的唱名与音名标记在手指的关节上，用于帮助歌手学习视唱。后来，17世纪有人将圣约翰赞美诗歌名首字母拼命Sancte
          Ioannes构成Si，因此就得来七个音阶。
        </p>
      </div>

      <div className="relative min-h-[60vh] lg:min-h-full">
        <Image
          src="/images/theory-collage.avif"
          alt="Music theory collage"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
