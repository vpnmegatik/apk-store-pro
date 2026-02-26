import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    downloadsByDay: [
      { day: "Mon", downloads: 1200 },
      { day: "Tue", downloads: 1500 },
      { day: "Wed", downloads: 1700 },
      { day: "Thu", downloads: 2200 },
      { day: "Fri", downloads: 2600 }
    ]
  });
}
