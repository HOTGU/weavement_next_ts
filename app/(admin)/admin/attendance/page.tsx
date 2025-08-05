import getCurrentUser from "@/actions/getCurrentUser";
import Container from "@/components/Container";
import AttendanceClient from "@/components/admin/attendance/AttendanceClient";
import { redirect } from "next/navigation";
import React from "react";
import AttendanceList from "@/components/admin/attendance/AttendanceList";
import client from "@/libs/prismadb";
import { getKstDayRange } from "@/utils/timeUtils";

interface PageProps {
  searchParams: { page?: string };
}

const AttendancePage = async ({ searchParams }: PageProps) => {
  const currentUser = await getCurrentUser();

  const { page: asyncPage } = await searchParams;

  const page = parseInt(asyncPage || "1", 10);
  const pageSize = 10;

  if (!currentUser) {
    return redirect("/");
  }

  if (isNaN(page) || page < 1) {
    redirect("/admin/attendance?page=1"); // 잘못된 페이지 처리
  }

  const skip = (page - 1) * pageSize;

  const { startUtc, endUtc } = getKstDayRange(new Date());

  const [attendances, todayCheckin, total] = await Promise.all([
    client.attendance.findMany({
      skip,
      take: pageSize,
      orderBy: { timestamp: "desc" },
    }),
    client.attendance.findFirst({
      where: {
        userId: currentUser.id,
        type: "checkin",
        timestamp: {
          gte: startUtc,
          lte: endUtc,
        },
      },
    }),

    client.attendance.count(),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <Container>
      <div className="flex gap-10 py-10">
        <AttendanceClient
          userId={currentUser.id}
          username={currentUser.username}
          todayCheckin={todayCheckin}
        />
        <AttendanceList
          attendances={attendances}
          page={page}
          totalPages={totalPages}
        />
      </div>
    </Container>
  );
};

export default AttendancePage;
