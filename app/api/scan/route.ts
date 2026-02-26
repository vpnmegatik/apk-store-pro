import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { fileUrl } = await req.json();

  return NextResponse.json({
    fileUrl,
    provider: "MalwareScanAPI",
    status: "queued",
    note: "Integrate with your malware scanner provider endpoint and API key."
  });
}
