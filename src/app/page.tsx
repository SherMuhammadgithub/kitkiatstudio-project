import { HeaderStub } from "@/components/HeaderStub";
import { HeroStub } from "@/components/HeroStub";
import { SocialRail } from "@/components/SocialRail";
import { SiteFooter } from "@/components/SiteFooter";
import { PassionSection } from "@/components/sections/PassionSection";
import { BeliefSection } from "@/components/sections/BeliefSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { PartnersSection } from "@/components/sections/PartnersSection";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <HeaderStub />
      <HeroStub />
      <PassionSection />
      <BeliefSection />
      <BlogSection />
      <PartnersSection />
      <SocialRail />
      <SiteFooter />
    </div>
  );
}
