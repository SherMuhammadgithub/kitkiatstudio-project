const SOCIALS = ["Facebook", "Instagram", "LinkedIn", "YouTube"];

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 text-sm text-zinc-500 sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} KitKiat Studio. Demo build — not the production site.</p>
        <div className="flex gap-4">
          {SOCIALS.map((s) => (
            <span key={s} className="cursor-default">
              {s}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
