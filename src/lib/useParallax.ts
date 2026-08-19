"use client";

import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

/**
 * Ties a layer's vertical offset to how far its own section has scrolled
 * through the viewport, so the layer moves slower/faster than page scroll.
 */
export function useParallax(distance = 100) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return { ref, y, scrollYProgress };
}
