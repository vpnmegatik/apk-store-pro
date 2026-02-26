const memory = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, limit = 30, windowMs = 60_000): boolean {
  const now = Date.now();
  const current = memory.get(key);

  if (!current || current.reset < now) {
    memory.set(key, { count: 1, reset: now + windowMs });
    return true;
  }

  if (current.count >= limit) return false;
  current.count += 1;
  memory.set(key, current);
  return true;
}
