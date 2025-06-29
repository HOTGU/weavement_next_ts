import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { endOfDay, startOfDay } from "date-fns";

const ALLOWED_IP =
  process.env.NODE_ENV === "production" ? process.env.ALLOWED_IP : "::1";

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown";

  if (ALLOWED_IP !== ip) {
    return new NextResponse("인증되지 않은 IP입니다", { status: 403 });
  }

  const { userId, type, username, workedSeconds } = await req.json(); // type: 'checkin' or 'checkout'
  const now = new Date();

  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);

  const existing = await prisma.attendance.findFirst({
    where: {
      userId,
      type,
      timestamp: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
  });

  if (existing) {
    return new NextResponse(
      `이미 오늘 ${type === "checkin" ? "출근" : "퇴근"} 기록이 있습니다.`,
      { status: 409 }
    );
  }

  const record = await prisma.attendance.create({
    data: {
      userId,
      username,
      type,
      ip,
      workedSeconds: workedSeconds ? workedSeconds : null,
    },
  });

  return NextResponse.json({ success: true, record });
}
