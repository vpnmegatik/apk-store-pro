import { NextResponse } from "next/server";
import { logError } from "@/lib/logger";

export class AppError extends Error {
  constructor(public status: number, message: string, public details?: Record<string, unknown>) {
    super(message);
  }
}

export function handleRouteError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }

  logError("unhandled_route_error", { error: error instanceof Error ? error.message : String(error) });
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
