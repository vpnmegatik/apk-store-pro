"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const steps = ["Basics", "APK File", "Screenshots", "Review"];

export default function PublisherUploadPage() {
  const [step, setStep] = useState(0);

  return (
    <div className="premium-card space-y-5 p-5">
      <div className="flex flex-wrap gap-2">
        {steps.map((item, index) => (
          <div key={item} className={`rounded-lg px-3 py-2 text-sm ${step === index ? "bg-primary text-white" : "bg-white/5 text-gray-400"}`}>{index + 1}. {item}</div>
        ))}
      </div>

      <div className="space-y-3">
        <input placeholder="App name" className="w-full rounded-xl border border-white/10 bg-white/5 p-3" />
        <textarea placeholder="Description" className="w-full rounded-xl border border-white/10 bg-white/5 p-3" rows={4} />
        <label className="block rounded-xl border border-dashed border-primary/50 bg-primary/10 p-4 text-sm text-gray-300">Drop APK/XAPK here (progress: 62%)</label>
        <label className="block rounded-xl border border-dashed border-secondary/50 bg-secondary/10 p-4 text-sm text-gray-300">Drag screenshots here</label>
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" onClick={() => setStep((prev) => Math.max(0, prev - 1))}>Back</Button>
        <Button variant="gradient" onClick={() => setStep((prev) => Math.min(steps.length - 1, prev + 1))}>Next</Button>
      </div>
    </div>
  );
}
