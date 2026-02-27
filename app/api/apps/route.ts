import { NextResponse } from "next/server";
import { listApprovedApps } from "@/repositories/appsRepository";
import { handleRouteError } from "@/lib/errors";

export async function GET() {
  try {
    const apps = await listApprovedApps();
    return NextResponse.json(
      { apps },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600"
        }
      }
    );
  } catch (error) {
    return handleRouteError(error);
  }
}
