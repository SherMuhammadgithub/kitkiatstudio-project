export function LinksSection() {
  return (
    <section className="grid grid-cols-1 bg-black lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center gap-6 px-8 py-16 text-center sm:px-14 lg:px-16">
        <svg viewBox="0 0 220 220" className="h-40 w-40 sm:h-48 sm:w-48">
          <circle cx="80" cy="110" r="70" fill="none" stroke="#db2777" strokeWidth="1.5" />
          <circle cx="130" cy="130" r="70" fill="none" stroke="#db2777" strokeWidth="1.5" />
          <circle cx="120" cy="70" r="45" fill="#a3175c" fillOpacity="0.85" />
        </svg>

        <h2 className="text-2xl font-bold text-white sm:text-3xl">聆听综合链接</h2>

        <div className="flex flex-col gap-3 sm:max-w-xs">
          <button
            type="button"
            disabled
            className="cursor-default border border-white/70 px-6 py-3 text-sm font-medium text-white sm:text-base"
          >
            Link to Song
          </button>
          <button
            type="button"
            disabled
            className="cursor-default border border-white/70 px-6 py-3 text-sm font-medium text-white sm:text-base"
          >
            Youtube (Lyrics MV)
          </button>
        </div>
      </div>

      <div
        className="relative flex min-h-[60vh] items-center bg-cover bg-center px-10 py-16 sm:px-20 lg:min-h-full lg:px-24"
        style={{ backgroundImage: "url(/images/11062b_eb1a4c8544994b258bfd87f87dda0b4a~mv2.avif)" }}
      >
        <div className="space-y-4 text-base leading-relaxed text-white sm:text-lg">
          <p>
            这张专辑的名字为《S大调与K小调》，S与K，本来就不存在传统现代的音阶上。我之所以使用这两个字母，除了象征着我的名字，也代表了一种跳出框框的思维，一种“创作无疆界，音乐无上限”的精神。
          </p>
          <p>
            在本专辑，我做出很多新的尝试，也尝试了许多不同的风格，体现了S大调与K小调的元素。例如，有充满动感但不失情调的歌曲、有全华乐不带西洋鼓的中西合璧的歌曲、有温柔但瞬间转变为巴萨诺瓦的情歌、有写实带有本土元素的民族歌、四五种全吉他没有钢琴组成的温馨歌曲等等。
          </p>
          <p>
            我希望能够透过此专辑，拓展自己的音乐风格，正如我的著作《拓展你的人生地圖》所要表达的意义。地图不是疆域，只有正确地认识到音乐思维模型的局限，才能发挥出音乐本身的确实意义。
          </p>
        </div>

        <span className="absolute bottom-6 right-6 text-xs font-medium text-pink-400">
          ♪ 点击快速聆听购买
        </span>
      </div>
    </section>
  );
}
