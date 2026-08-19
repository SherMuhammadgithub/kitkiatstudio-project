"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades a section in every time it scrolls into view (replays on repeated
 * scroll-downs, e.g. scroll down, back up, down again). Opacity-only — no
 * transform — so it can't interfere with `position: sticky` or
 * `background-attachment: fixed` used inside some sections.
 */
export function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-700 ease-out ${visible ? "opacity-100" : "opacity-0"}`}
    >
      {children}
    </div>
  );
}
