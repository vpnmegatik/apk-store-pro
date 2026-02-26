export default function SettingsPage() {
  return (
    <div className="premium-card space-y-4 p-5">
      <h2 className="font-semibold">Appearance & Preferences</h2>
      <label className="flex items-center justify-between rounded-xl border border-white/10 p-3">
        Smooth theme transition
        <input type="checkbox" defaultChecked />
      </label>
      <label className="flex items-center justify-between rounded-xl border border-white/10 p-3">
        Save theme in local storage
        <input type="checkbox" defaultChecked />
      </label>
    </div>
  );
}
