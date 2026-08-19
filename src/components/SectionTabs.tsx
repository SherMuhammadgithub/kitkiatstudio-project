const TABS = ["职涯地图", "书林书区", "音乐专区"];

/**
 * Decorative sticky side nav echoing the source site's vertical tab stack.
 * Non-functional in the demo — visual placeholder only. Rendered inside a
 * section that scopes its containing block, so `top: 50%` centers against
 * that section's own height, not the grid row or viewport.
 */
export function SectionTabs({ active = 1 }: { active?: number }) {
  return (
    <div className="sticky top-1/2 w-10 -translate-y-1/2 flex-col text-[11px] font-medium text-white flex">
      {TABS.map((label, i) => (
        <div
          key={label}
          className={`flex h-28 items-center justify-center py-4 ${
            i === active ? "bg-black" : "bg-black/60"
          }`}
          style={{ writingMode: "vertical-rl" }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
