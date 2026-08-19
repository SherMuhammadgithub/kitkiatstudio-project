const SOCIALS = [
  { label: "Facebook", icon: "f" },
  { label: "Instagram", icon: "ig" },
  { label: "LinkedIn", icon: "in" },
  { label: "YouTube", icon: "yt" },
];

export function SocialRail() {
  return (
    <div className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 sm:right-5 sm:flex">
      {SOCIALS.map((s) => (
        <a
          key={s.label}
          href="#"
          aria-label={s.label}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-xs font-semibold text-black shadow-sm transition-colors hover:bg-white"
        >
          {s.icon}
        </a>
      ))}
    </div>
  );
}
