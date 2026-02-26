const items = [
  { quote: "Revenue doubled in 3 months after switching to APK Store Pro.", name: "Ava, Indie Publisher" },
  { quote: "The ad and analytics stack is cleaner than any competitor.", name: "Mason, Growth Lead" },
  { quote: "Upload moderation and security checks are truly enterprise-grade.", name: "Lina, Operations Manager" }
];

export function Testimonials() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <div key={item.name} className="premium-card p-5">
          <p className="text-sm text-gray-200">“{item.quote}”</p>
          <p className="mt-3 text-xs uppercase tracking-[0.12em] text-gray-400">{item.name}</p>
        </div>
      ))}
    </section>
  );
}
