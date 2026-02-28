"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function UploadForm() {
  const [status, setStatus] = useState<string>("");

  async function submit(formData: FormData) {
    setStatus("Uploading...");
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    setStatus(res.ok ? "Upload submitted for review." : "Upload failed.");
  }

  return (
    <form
      action={async (formData) => {
        await submit(formData);
      }}
      className="space-y-3 rounded-lg border p-4"
    >
      <input name="name" required placeholder="App name" className="w-full rounded border p-2" />
      <textarea name="description" required placeholder="Description" className="w-full rounded border p-2" />
      <input name="apk" type="file" accept=".apk,.xapk" required className="w-full" />
      <input name="icon" type="file" accept="image/*" required className="w-full" />
      <input name="screenshots" type="file" accept="image/*" multiple className="w-full" />
      <Button type="submit">Upload APK</Button>
      {status && <p className="text-sm text-gray-500">{status}</p>}
    </form>
  );
}
