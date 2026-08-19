"use client";

import { useState } from "react";

/**
 * Demo-only play button — no real audio. Clicking just toggles a fake
 * "now playing" waveform to give the idea a player will live here.
 */
export function DummyPlayButton({ label }: { label?: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setPlaying((p) => !p)}
      aria-pressed={playing}
      aria-label={playing ? "Pause preview" : `Play preview${label ? ` — ${label}` : ""}`}
      className="absolute left-1/2 top-1/2 z-10 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-105 sm:h-20 sm:w-20"
    >
      {playing ? (
        <span className="flex h-6 items-end gap-1">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-1 rounded-full bg-black animate-soundwave"
              style={{ height: "100%", animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </span>
      ) : (
        <svg viewBox="0 0 24 24" fill="black" className="ml-1 h-6 w-6">
          <path d="M8 5v14l11-7-11-7Z" />
        </svg>
      )}
    </button>
  );
}
