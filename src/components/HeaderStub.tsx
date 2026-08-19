export function HeaderStub() {
  return (
    <header className="relative z-30 flex flex-wrap items-center justify-between gap-2 bg-black px-4 py-3 text-white sm:px-8 sm:py-4">
      <div>
        <p className="text-base font-bold tracking-tight sm:text-lg">
          SK <span className="font-normal">郭俯宏</span>
        </p>
        <p className="text-[11px] text-white/70 sm:text-xs">
          美国MIT与英国剑桥大学{" "}
          <span className="bg-accent-yellow px-1 text-black">音乐人</span> NLP高级导师 | 作者
        </p>
      </div>
      <div className="grid grid-cols-2 gap-0.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 bg-white" />
        ))}
      </div>
    </header>
  );
}
