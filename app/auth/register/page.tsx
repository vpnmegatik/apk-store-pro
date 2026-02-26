import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md pb-20 pt-10">
      <div className="glass-panel space-y-4 p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
        <p className="text-sm text-gray-400">Join APK Store Pro as a user or publisher.</p>
        <input placeholder="Full name" className="w-full rounded-xl border border-white/10 bg-white/5 p-3" />
        <input placeholder="Email" className="w-full rounded-xl border border-white/10 bg-white/5 p-3" />
        <input placeholder="Password" type="password" className="w-full rounded-xl border border-white/10 bg-white/5 p-3" />
        <select className="w-full rounded-xl border border-white/10 bg-white/5 p-3">
          <option>User</option>
          <option>Publisher</option>
        </select>
        <Button variant="gradient" className="w-full">Create account</Button>
      </div>
    </div>
  );
}
