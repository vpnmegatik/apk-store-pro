import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-aurora p-8 md:p-12">
      <div className="absolute -top-10 right-0 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
      <div className="absolute -bottom-10 left-0 h-40 w-40 rounded-full bg-secondary/30 blur-3xl" />
      <div className="relative max-w-2xl space-y-5">
        <p className="text-xs uppercase tracking-[0.18em] text-secondary">Android Marketplace Platform</p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">A premium APK ecosystem built for trust, scale, and monetization.</h1>
        <p className="text-gray-300">Discover secure Android apps, maximize publisher revenue, and run operations with a world-class dashboard experience.</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="gradient">Explore Apps</Button>
          <Button variant="secondary">Become a Publisher</Button>
        </div>
      </div>
    </section>
  );
}
