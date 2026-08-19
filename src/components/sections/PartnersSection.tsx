import Image from "next/image";

export function PartnersSection() {
  return (
    <section
      className="bg-[url(/images/partners-bg.png)] bg-repeat py-20 sm:py-28"
      style={{ backgroundColor: "#1a1a1a" }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-6 text-center sm:px-8">
        <p className="text-sm font-medium text-white/90 sm:text-base">
          感谢以下合作伙伴所提供的支持
        </p>

        <div className="flex items-center justify-center bg-white px-8 py-6">
          <Image
            src="/images/luxur-logo.avif"
            alt="Luxur Interior + Architecture"
            width={180}
            height={100}
            className="h-auto w-24 sm:w-28"
          />
        </div>
      </div>
    </section>
  );
}
