import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md pb-20 pt-10">
      <div className="glass-panel space-y-4 p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-gray-400">Login to manage apps, revenue, and analytics.</p>
        <input placeholder="Email" className="w-full rounded-xl border border-white/10 bg-white/5 p-3" />
        <input placeholder="Password" type="password" className="w-full rounded-xl border border-white/10 bg-white/5 p-3" />
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <input key={index} maxLength={1} className="rounded-lg border border-white/10 bg-white/5 p-2 text-center" />
          ))}
        </div>
        <Button variant="gradient" className="w-full">Login</Button>
        <div className="grid gap-2 sm:grid-cols-2">
          <Button variant="secondary">Google</Button>
          <Button variant="secondary">GitHub</Button>
        </div>
      </div>
    </div>
  );
}
