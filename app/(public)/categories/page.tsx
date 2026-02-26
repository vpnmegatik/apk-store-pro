import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const metadata = { title: "Categories" };

export default async function CategoriesPage() {
  const { data: categories } = await supabase.from("categories").select("*").order("name");

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Categories</h1>
      <div className="grid gap-3 md:grid-cols-3">
        {categories?.map((category) => (
          <Link key={category.id} href={`/?category=${category.slug}`} className="rounded-lg border p-4">
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
