import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/music", label: "音乐专区 Music" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-black/10 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/60">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-xl font-semibold tracking-tight">
          SK <span className="text-zinc-400">郭俯宏</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-300">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-black dark:hover:text-white">
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="rounded-full border border-black/10 px-3 py-1.5 text-xs text-zinc-500 transition-colors hover:border-black/30 hover:text-black dark:border-white/10 dark:text-zinc-400 dark:hover:text-white"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
