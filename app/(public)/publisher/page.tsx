import { Button } from "@/components/ui/button";

export default function PublisherLandingPage() {
  return (
    <div className="space-y-8 pb-20">
      <section className="rounded-3xl border border-white/10 bg-aurora p-8">
        <h1 className="text-4xl font-semibold tracking-tight">Monetize your Android audience with confidence.</h1>
        <p className="mt-3 max-w-2xl text-gray-300">Upload once, distribute globally, and optimize ad + affiliate earnings with live analytics and fraud-resistant downloads.</p>
        <Button variant="gradient" className="mt-5">Start Publishing</Button>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {["Fast review and approval", "AdSense + custom ad zones", "Payout and subscription controls"].map((item) => (
          <div key={item} className="premium-card p-5">
            <h2 className="font-semibold">{item}</h2>
            <p className="mt-2 text-sm text-gray-400">Purpose-built workflows to scale monetization while maintaining quality standards.</p>
          </div>
        ))}
      </section>
    </div>
  );
}
