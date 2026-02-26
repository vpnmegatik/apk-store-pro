import { SearchBar } from "@/components/app/search-bar";
import { AdBanner } from "@/components/app/ad-banner";
import { TrendingList } from "@/components/app/trending-list";
import { supabase } from "@/lib/supabase";

export const revalidate = 120;

export default async function HomePage() {
  const { data: apps } = await supabase
    .from("apps")
    .select("*")
    .eq("status", "approved")
    .order("downloads", { ascending: false })
    .limit(12);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold">Download Trusted Android APKs</h1>
        <p className="text-gray-500">Safe distribution, instant search, and fast direct downloads.</p>
        <SearchBar />
      </section>

      <AdBanner slot="home-top" fallbackImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f" link="#" />

      <section>
        <h2 className="mb-3 text-xl font-semibold">Trending Apps</h2>
        <TrendingList apps={apps ?? []} />
      </section>
    </div>
  );
}
