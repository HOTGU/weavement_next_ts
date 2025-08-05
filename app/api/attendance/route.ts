import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { getKstDayRange } from "@/utils/timeUtils";

export async function POST(req: NextRequest) {
  let ip = "::1";

  if (process.env.NODE_ENV === "production") {
    ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

    const allowed = JSON.parse(process.env.ALLOWED_IPS || "[]") as string[];
    if (!allowed.includes(ip)) {
      return new NextResponse("인증되지 않은 IP입니다", { status: 403 });
    }
  }

  const { userId, username, type, workedSeconds } = await req.json();
  const now = new Date();
  const { startUtc, endUtc } = getKstDayRange(now);

  const existing = await prisma.attendance.findFirst({
    where: { userId, type, timestamp: { gte: startUtc, lte: endUtc } },
  });

  if (existing) {
    return new NextResponse(
      `이미 오늘 ${type === "checkin" ? "출근" : "퇴근"} 기록이 있습니다.`,
      { status: 409 }
    );
  }

  const record = await prisma.attendance.create({
    data: { userId, username, type, ip, workedSeconds: workedSeconds ?? null },
  });

  return NextResponse.json({ success: true, record });
}
