import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { addHours, endOfDay, startOfDay, subHours } from "date-fns";

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

  // 한국 시간 기준으로 오늘 시작/끝 구하기
  const koreaNow = addHours(now, 9); // UTC -> KST
  const koreaStartOfDay = startOfDay(koreaNow);
  const koreaEndOfDay = endOfDay(koreaNow);

  // 다시 UTC로 되돌림: DB에 저장된 timestamp는 UTC 기준이므로 비교도 UTC 기준으로
  const utcRangeStart = subHours(koreaStartOfDay, 9);
  const utcRangeEnd = subHours(koreaEndOfDay, 9);

  const existing = await prisma.attendance.findFirst({
    where: {
      userId,
      type,
      timestamp: {
        gte: utcRangeStart,
        lte: utcRangeEnd,
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
