

import {
  CommunitySection,
  LandingHero,
  ProductStorySection,
  BuildLoopSection,
  ProductPreviewSection,
  FinalCtaSection,
  LandingFooter
} from "@/features/landing";


export default function Home() {
  return (
     <main className="landing-theme min-h-screen">
      <LandingHero />
<ProductStorySection />
<CommunitySection />
<BuildLoopSection />
<ProductPreviewSection />
<FinalCtaSection />
<LandingFooter />
    </main>
  );
}