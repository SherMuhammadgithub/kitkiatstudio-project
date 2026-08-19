type Post = {
  title: string;
  date: string;
  readTime: string;
  views: number;
  comments: number;
  likes?: number;
  accent?: boolean;
  gradient: string;
};

const POSTS: Post[] = [
  {
    title: "理性看待母校性骚扰事件｜从制度与定义出发",
    date: "Oct 13, 2025",
    readTime: "5 min read",
    views: 1121,
    comments: 0,
    accent: true,
    gradient: "from-emerald-950 via-emerald-800 to-amber-700",
  },
  {
    title: "我对美国小费文化的迷思",
    date: "Aug 27, 2023",
    readTime: "4 min read",
    views: 44,
    comments: 0,
    likes: 2,
    gradient: "from-sky-950 via-sky-700 to-sky-400",
  },
  {
    title: "从马来西亚柔佛的小Kampung去到了全球科技总部谷歌",
    date: "Dec 3, 2022",
    readTime: "4 min read",
    views: 71,
    comments: 0,
    likes: 2,
    gradient: "from-blue-950 via-blue-800 to-sky-500",
  },
];

export function BlogSection() {
  return (
    <section className="bg-zinc-200 py-20 sm:py-28">
      <div className="px-6 sm:px-8">
        <h2 className="text-center text-4xl text-zinc-900 sm:text-5xl">
          Recent <strong className="font-bold">Blog</strong> Posts
        </h2>

        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0">
          {POSTS.map((post) => (
            <article
              key={post.title}
              className={`relative flex aspect-square w-[85%] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-sm bg-gradient-to-br sm:w-[60%] md:w-auto md:shrink ${post.gradient}`}
            >
              <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-2 p-5 text-xs text-white/90">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

              <div className="relative z-10 p-5">
                <h3
                  className={`text-lg font-medium leading-snug ${
                    post.accent ? "text-accent-yellow" : "text-white"
                  }`}
                >
                  {post.title}
                </h3>
                <div className="mt-3 h-px w-full bg-white/25" />
                <div className="mt-3 flex items-center justify-between text-xs text-white/80">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <EyeIcon /> {post.views.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <CommentIcon /> {post.comments}
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <HeartIcon /> {post.likes ?? ""}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
      <path
        d="M4 5h16v11H8l-4 4V5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden>
      <path
        d="M12 20s-7-4.35-9.5-8.5C.75 8 2.5 4.5 6 4.5c2 0 3.5 1.2 6 3.5 2.5-2.3 4-3.5 6-3.5 3.5 0 5.25 3.5 3.5 7C19 15.65 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
