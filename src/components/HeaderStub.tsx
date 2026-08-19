"use client";

import { useState } from "react";
import { NavDrawer } from "./NavDrawer";

export function HeaderStub() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-2 bg-black px-4 py-3 text-white sm:px-8 sm:py-4">
      <div>
        <p className="text-base font-bold tracking-tight sm:text-lg">
          SK <span className="font-normal">郭俯宏</span>
        </p>
        <p className="text-[11px] text-white/70 sm:text-xs">
          美国MIT与英国剑桥大学{" "}
          <span className="bg-accent-yellow px-1 text-black">音乐人</span> NLP高级导师 | 作者
        </p>
      </div>

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="grid grid-cols-2 gap-0.5 p-1"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="h-1.5 w-1.5 bg-white" />
        ))}
      </button>

      <NavDrawer open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
