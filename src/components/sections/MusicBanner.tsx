export function MusicBanner() {
  return (
    <section
      className="flex min-h-[220px] items-center bg-zinc-100 bg-cover bg-center px-6 sm:min-h-[280px] sm:px-12"
      style={{ backgroundImage: "url(/images/music-bgavif.avif)" }}
    >
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
        音乐专区 Music
      </h1>
    </section>
  );
}
