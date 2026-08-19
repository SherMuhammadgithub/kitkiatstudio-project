export type Platform = {
  id: string;
  name: string;
  url: string;
};

export type Track = {
  id: string;
  title: string;
  duration: string;
};

export type GalleryImage = {
  id: string;
  label: string;
  gradient: string;
};

export type Album = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  releaseYear: string;
  status: "draft" | "published";
  coverGradient: string;
  description: string;
  tracks: Track[];
  gallery: GalleryImage[];
  platforms: Platform[];
};

export const defaultAlbums: Album[] = [
  {
    id: "album-1",
    slug: "sk-principium",
    title: "SK Principium",
    subtitle: "Debut studio album",
    releaseYear: "2021",
    status: "published",
    coverGradient: "from-indigo-600 via-slate-800 to-black",
    description:
      "The album that started it all — a blend of pop, rock and classical influences shaped by years of piano and guitar training. Principium marks the first chapter of SK's musical journey.",
    tracks: [
      { id: "t1", title: "Principium", duration: "3:42" },
      { id: "t2", title: "Attitude", duration: "4:05" },
      { id: "t3", title: "Aptitude", duration: "3:18" },
      { id: "t4", title: "Change", duration: "3:57" },
      { id: "t5", title: "Opportunity", duration: "4:21" },
    ],
    gallery: [
      { id: "g1", label: "Cover — Studio", gradient: "from-indigo-600 via-slate-800 to-black" },
      { id: "g2", label: "Cover — Live", gradient: "from-slate-700 via-indigo-900 to-slate-950" },
      { id: "g3", label: "Cover — Mono", gradient: "from-zinc-500 via-zinc-800 to-black" },
    ],
    platforms: [
      { id: "p1", name: "Spotify", url: "https://open.spotify.com" },
      { id: "p2", name: "Apple Music", url: "https://music.apple.com" },
      { id: "p3", name: "YouTube Music", url: "https://music.youtube.com" },
    ],
  },
  {
    id: "album-2",
    slug: "s-major-and-k-minor",
    title: "S Major and K Minor",
    subtitle: "Sophomore album",
    releaseYear: "2023",
    status: "published",
    coverGradient: "from-rose-600 via-amber-700 to-slate-900",
    description:
      "A more introspective, genre-blurring follow-up — gospel harmonies meet R&B grooves and grunge-rock textures, reflecting SK's growth as both a musician and a person.",
    tracks: [
      { id: "t1", title: "S Major", duration: "3:29" },
      { id: "t2", title: "K Minor", duration: "3:51" },
      { id: "t3", title: "Grace Note", duration: "4:12" },
      { id: "t4", title: "Interlude", duration: "1:44" },
      { id: "t5", title: "Resolve", duration: "4:33" },
      { id: "t6", title: "Coda", duration: "2:58" },
    ],
    gallery: [
      { id: "g1", label: "Cover — Sunset", gradient: "from-rose-600 via-amber-700 to-slate-900" },
      { id: "g2", label: "Cover — Grunge", gradient: "from-amber-800 via-rose-900 to-black" },
    ],
    platforms: [
      { id: "p1", name: "Spotify", url: "https://open.spotify.com" },
      { id: "p2", name: "Apple Music", url: "https://music.apple.com" },
      { id: "p3", name: "YouTube Music", url: "https://music.youtube.com" },
      { id: "p4", name: "SoundCloud", url: "https://soundcloud.com" },
    ],
  },
  {
    id: "album-3",
    slug: "unreleased-sessions",
    title: "Unreleased Sessions",
    subtitle: "Work in progress",
    releaseYear: "2026",
    status: "draft",
    coverGradient: "from-emerald-700 via-teal-800 to-slate-950",
    description:
      "Early demos from an upcoming project — not yet ready for public release. This entry demonstrates the draft / publish workflow in the admin panel.",
    tracks: [
      { id: "t1", title: "Sketch One", duration: "2:10" },
      { id: "t2", title: "Sketch Two", duration: "3:03" },
    ],
    gallery: [
      { id: "g1", label: "Cover — Draft", gradient: "from-emerald-700 via-teal-800 to-slate-950" },
    ],
    platforms: [],
  },
];
