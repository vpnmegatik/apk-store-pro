import { requireRole } from "@/lib/auth";
import { UploadForm } from "@/components/app/upload-form";

export default async function PublisherDashboard() {
  await requireRole(["publisher", "admin"]);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Publisher Dashboard</h1>
      <p className="text-gray-500">Upload, edit apps, and monitor revenue from ads and affiliate links.</p>
      <UploadForm />
    </section>
  );
}
