import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { consumeRateLimit } from "@/lib/rate-limit";
import { env } from "@/lib/env";

async function getAuthContext(req: NextRequest, res: NextResponse) {
  const supabase = createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return req.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: Record<string, unknown>) {
        req.cookies.set({ name, value, ...options });
        res.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: Record<string, unknown>) {
        req.cookies.set({ name, value: "", ...options });
        res.cookies.set({ name, value: "", ...options });
      }
    }
  });

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return { user: null, role: null };

  const { data } = await supabase.from("users").select("role").eq("id", user.id).single();
  return { user, role: data?.role ?? null };
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const ip = req.ip ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const globalRate = consumeRateLimit(`mw:${ip}`, 300, 60_000);
  if (!globalRate.allowed) return NextResponse.json({ error: "Too many requests" }, { status: 429 });

  const isApiUpload = req.nextUrl.pathname.startsWith("/api/upload");

  if (req.nextUrl.pathname.startsWith("/dashboard") || isApiUpload) {
    const { user, role } = await getAuthContext(req, res);

    if (!user) {
      if (isApiUpload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("next", req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (isApiUpload && !(role === "publisher" || role === "admin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (req.nextUrl.pathname.startsWith("/dashboard/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard/user", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/dashboard/publisher") && !(role === "publisher" || role === "admin")) {
      return NextResponse.redirect(new URL("/dashboard/user", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/upload", "/api/upload/:path*"]
};
