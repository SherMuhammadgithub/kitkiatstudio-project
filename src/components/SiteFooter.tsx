export function SiteFooter() {
  return (
    <footer className="bg-black py-10 text-center sm:py-12">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-lg text-white sm:text-xl">
          想获知最新消息或季度特别折扣，请马上联系
        </p>
        <a
          href="mailto:sk21.service@gmail.com"
          className="mt-2 inline-block text-2xl font-bold text-white transition-colors hover:text-accent-yellow sm:text-3xl"
        >
          sk21.service@gmail.com
        </a>
        <p className="mt-6 text-xs text-white/50">&copy; 2024 by Ker Soon Kiat.</p>
      </div>
    </footer>
  );
}
