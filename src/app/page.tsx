import { HeaderStub } from "@/components/HeaderStub";
import { HeroStub } from "@/components/HeroStub";
import { SocialRail } from "@/components/SocialRail";
import { SectionTabs } from "@/components/SectionTabs";
import { SiteFooter } from "@/components/SiteFooter";
import { PassionSection } from "@/components/sections/PassionSection";
import { BeliefSection } from "@/components/sections/BeliefSection";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <HeaderStub />
      <HeroStub />
      <div className="md:grid md:grid-cols-[1fr_40px] md:items-stretch">
        <PassionSection />
        <div className="relative mr-4 hidden md:block lg:mr-16">
          <SectionTabs />
        </div>
      </div>
      <BeliefSection />
      <SocialRail />
      <SiteFooter />
    </div>
  );
}
