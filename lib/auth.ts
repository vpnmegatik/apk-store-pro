import { redirect } from "next/navigation";
import type { Role } from "@/types";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export async function requireRole(allowedRoles: Role[]) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase.from("users").select("role").eq("id", user.id).single();
  if (!profile || !allowedRoles.includes(profile.role as Role)) redirect("/");

  return { user, role: profile.role as Role };
}
