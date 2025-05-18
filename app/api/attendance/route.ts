import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { endOfDay, startOfDay } from "date-fns";

const ALLOWED_IPS = ["125.143.21.245", "::1"];

export async function POST(req: NextRequest) {
  console.log(req.headers.get("x-forwarded-for"));
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

  if (!ALLOWED_IPS.includes(ip)) {
    return new NextResponse("인증되지 않은 IP입니다", { status: 403 });
  }

  const { userId, type } = await req.json(); // type: 'checkin' or 'checkout'
  console.log(userId, type);
  const now = new Date();

  // 오늘 하루 범위 구하기
  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);

  // 오늘 이미 해당 type으로 기록이 있는지 확인
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
      type,
      ip,
    },
  });

  return NextResponse.json({ success: true, record });
}
