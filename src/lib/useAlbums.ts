"use client";

import { useCallback, useEffect, useState } from "react";
import { Album, defaultAlbums } from "@/data/music";

const STORAGE_KEY = "kitkiat-demo-albums-v1";

export function useAlbums() {
  const [albums, setAlbums] = useState<Album[]>(defaultAlbums);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setAlbums(JSON.parse(raw) as Album[]);
    } catch {
      // ignore malformed storage, fall back to defaults
    }
    setLoaded(true);
  }, []);

  const saveAlbums = useCallback((next: Album[]) => {
    setAlbums(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const saveAlbum = useCallback(
    (updated: Album) => {
      setAlbums((prev) => {
        const next = prev.map((a) => (a.id === updated.id ? updated : a));
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  const resetAlbums = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setAlbums(defaultAlbums);
  }, []);

  return { albums, loaded, saveAlbums, saveAlbum, resetAlbums };
}
