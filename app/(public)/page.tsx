import { HeroSection } from "@/components/marketing/hero";
import { TrendingCarousel } from "@/components/marketing/app-carousel";
import { Testimonials } from "@/components/marketing/testimonials";
import { MarketingCta } from "@/components/marketing/cta";
import { GlassCard } from "@/components/ui/glass-card";
import { TagBadge } from "@/components/ui/tag-badge";

const categories = ["Games", "Productivity", "Social", "Finance", "Tools", "Education"];

export default function HomePage() {
  return (
    <div className="space-y-8 pb-20">
      <HeroSection />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Trending apps</h2>
        <TrendingCarousel />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Explore categories</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <GlassCard key={category} className="flex items-center justify-between">
              <span>{category}</span>
              <TagBadge label="Hot" tone="sponsored" />
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {["Editor picks", "Most downloaded", "Newly approved"].map((section) => (
          <div key={section} className="premium-card p-5">
            <h3 className="font-semibold">{section}</h3>
            <p className="mt-2 text-sm text-gray-400">Curated apps based on trust score, retention, and momentum.</p>
          </div>
        ))}
      </section>

      <Testimonials />
      <MarketingCta />
    </div>
  );
}
