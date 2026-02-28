import { AppError } from "@/lib/errors";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import type { Role } from "@/types";

export async function requireServerRole(roles: Role[]) {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) throw new AppError(401, "Unauthorized");

  const { data, error } = await supabase.from("users").select("role").eq("id", user.id).single();
  if (error || !data) throw new AppError(403, "Forbidden");
  if (!roles.includes(data.role as Role)) throw new AppError(403, "Forbidden");

  return { userId: user.id, role: data.role as Role };
}
