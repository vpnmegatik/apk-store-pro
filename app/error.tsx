"use client";

export default function GlobalError() {
  return (
    <html>
      <body className="min-h-screen bg-background text-foreground">
        <main className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-6">
          <div className="premium-card w-full p-8 text-center">
            <h2 className="text-2xl font-semibold">Something went wrong</h2>
            <p className="mt-2 text-sm text-gray-400">Please retry. If the issue persists, contact support.</p>
          </div>
        </main>
      </body>
    </html>
  );
}
