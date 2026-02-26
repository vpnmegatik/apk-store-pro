export default function PublisherDashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="premium-card p-5"><h2 className="font-semibold">My apps</h2><p className="text-sm text-gray-400">Manage releases and updates.</p></div>
      <div className="premium-card p-5"><h2 className="font-semibold">Conversion</h2><p className="text-sm text-gray-400">Install conversion at 6.8%.</p></div>
      <div className="premium-card p-5"><h2 className="font-semibold">Revenue</h2><p className="text-sm text-gray-400">$8,420 this month.</p></div>
    </div>
  );
}
