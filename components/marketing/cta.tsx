import { Button } from "@/components/ui/button";

export function MarketingCta() {
  return (
    <section className="rounded-3xl border border-primary/40 bg-gradient-to-r from-primary/20 to-secondary/20 p-8 text-center">
      <h2 className="text-3xl font-semibold tracking-tight">Ready to launch your Android publishing business?</h2>
      <p className="mx-auto mt-2 max-w-2xl text-gray-300">Create your publisher account and start uploading APK/XAPK files with secure distribution, ad monetization, and detailed analytics.</p>
      <div className="mt-4 flex justify-center gap-3">
        <Button variant="gradient">Get Started</Button>
        <Button variant="ghost">Book Demo</Button>
      </div>
    </section>
  );
}
