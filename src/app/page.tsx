import { HeaderStub } from "@/components/HeaderStub";
import { HeroStub } from "@/components/HeroStub";
import { SocialRail } from "@/components/SocialRail";
import { SiteFooter } from "@/components/SiteFooter";
import { PassionSection } from "@/components/sections/PassionSection";
import { BeliefSection } from "@/components/sections/BeliefSection";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <HeaderStub />
      <HeroStub />
      <PassionSection />
      <BeliefSection />
      <SocialRail />
      <SiteFooter />
    </div>
  );
}
