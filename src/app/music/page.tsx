import { HeaderStub } from "@/components/HeaderStub";
import { SiteFooter } from "@/components/SiteFooter";
import { MusicBanner } from "@/components/sections/MusicBanner";
import { FeaturedAlbumSection } from "@/components/sections/FeaturedAlbumSection";
import { TracklistSection } from "@/components/sections/TracklistSection";
import { SecondAlbumSection } from "@/components/sections/SecondAlbumSection";
import { TheorySection } from "@/components/sections/TheorySection";
import { CollageSection } from "@/components/sections/CollageSection";
import { LinksSection } from "@/components/sections/LinksSection";
import { PrincipiumSection } from "@/components/sections/PrincipiumSection";
import { LawSection } from "@/components/sections/LawSection";

export default function MusicPage() {
  return (
    <div className="flex flex-1 flex-col">
      <HeaderStub />
      <MusicBanner />
      <FeaturedAlbumSection />
      <TracklistSection />
      <SecondAlbumSection />
      <TheorySection />
      <CollageSection />
      <LinksSection />
      <PrincipiumSection />
      <LawSection />
      <SiteFooter />
    </div>
  );
}
