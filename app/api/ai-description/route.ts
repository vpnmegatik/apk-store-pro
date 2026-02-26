import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { appName, category, features } = await req.json();
  const text = `${appName} is a ${category} Android app offering ${features}. Download safely from APK Store Pro.`;
  return NextResponse.json({ description: text });
}
