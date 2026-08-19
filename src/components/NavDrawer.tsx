"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/music", label: "音乐专区" },
  { href: "/admin", label: "Admin" },
];

export function NavDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col justify-between bg-black px-6 py-6 text-white transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} aria-label="Close menu" className="text-2xl">
              &times;
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-6">
            <Link
              href="/"
              onClick={onClose}
              className={`px-4 py-3 text-center text-sm font-medium ${
                pathname === "/" ? "bg-white text-black" : "border border-white/30 text-white"
              }`}
            >
              主页
            </Link>

            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="border-b border-white/30 pb-4 text-center text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="text-xs">
          <label className="block text-white/70">Email *</label>
          <div className="mt-2 flex">
            <input
              type="email"
              disabled
              className="w-full bg-zinc-200 px-3 py-2 text-black outline-none"
            />
            <button
              type="button"
              disabled
              className="cursor-default bg-white px-4 py-2 font-medium text-black"
            >
              Submit
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
