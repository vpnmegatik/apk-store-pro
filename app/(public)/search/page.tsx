"use client";

import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

const apps = ["Telegram", "Notion", "Signal", "Canva", "Spotify", "CapCut", "Reddit", "Discord"];

function highlight(text: string, query: string) {
  if (!query) return text;
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded bg-primary/30 px-1 text-white">{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 250);

  const results = useMemo(
    () => apps.filter((item) => item.toLowerCase().includes(debounced.toLowerCase())),
    [debounced]
  );

  return (
    <div className="space-y-5 pb-20">
      <h1 className="text-3xl font-semibold tracking-tight">Instant Search</h1>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by app name" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3" />
      <div className="space-y-3">
        {results.map((result) => (
          <div key={result} className="premium-card p-4 text-sm">
            {highlight(result, query)}
          </div>
        ))}
      </div>
    </div>
  );
}
