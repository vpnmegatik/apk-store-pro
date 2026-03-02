"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SearchResult {
  id: string;
  name: string;
  slug: string;
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.apps ?? []);
    }, 180);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full max-w-2xl">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search apps..."
        className="w-full rounded-md border border-border bg-card px-4 py-3"
      />
      {results.length > 0 && (
        <div className="absolute z-20 mt-1 w-full rounded-md border bg-card p-2 shadow-lg">
          {results.map((app) => (
            <Link key={app.id} href={`/apps/${app.slug}`} className="block rounded p-2 hover:bg-secondary">
              {app.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
