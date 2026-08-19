import { HeaderStub } from "@/components/HeaderStub";
import { SiteFooter } from "@/components/SiteFooter";
import { MusicBanner } from "@/components/sections/MusicBanner";
import { FeaturedAlbumSection } from "@/components/sections/FeaturedAlbumSection";
import { TracklistSection } from "@/components/sections/TracklistSection";

export default function MusicPage() {
  return (
    <div className="flex flex-1 flex-col">
      <HeaderStub />
      <MusicBanner />
      <FeaturedAlbumSection />
      <TracklistSection />
      <SiteFooter />
    </div>
  );
}
