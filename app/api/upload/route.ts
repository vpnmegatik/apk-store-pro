import { NextRequest, NextResponse } from "next/server";
import { processAppUpload } from "@/services/uploadService";
import { consumeRateLimit } from "@/lib/rate-limit";
import { getRequestIp } from "@/lib/request";
import { handleRouteError, AppError } from "@/lib/errors";
import { requireServerRole } from "@/services/authService";
import { logInfo } from "@/lib/logger";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const ip = getRequestIp(req);
    const rate = consumeRateLimit(`upload:${ip}`, 10, 60_000);
    if (!rate.allowed) {
      throw new AppError(429, "Rate limit exceeded");
    }

    const actor = await requireServerRole(["admin", "publisher"]);
    const formData = await req.formData();
    const result = await processAppUpload(formData, actor.userId);

    logInfo("app_upload_created", { actorId: actor.userId, slug: result.slug });

    return NextResponse.json({ ok: true, slug: result.slug }, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}
