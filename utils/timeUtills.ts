import { Attendance } from "@prisma/client";
import { format, intervalToDuration } from "date-fns";

// 근무시간을 "X시간 Y분 Z초" 포맷으로 변환
function durationToKoreanString(duration: Duration) {
  const parts = [];
  if (duration.hours) parts.push(`${duration.hours}시간`);
  if (duration.minutes) parts.push(`${duration.minutes}분`);
  if (duration.seconds) parts.push(`${duration.seconds}초`);
  return parts.length ? parts.join(" ") : "-";
}

// 같은 user, 같은 날짜의 checkin 찾기
function findCheckin(attendance: Attendance, all: Attendance[]) {
  if (attendance.type !== "checkout") return null;
  const dateStr = format(attendance.timestamp, "yyyy-MM-dd"); // 날짜만 비교
  return all
    .filter(
      (a) =>
        a.userId === attendance.userId &&
        a.type === "checkin" &&
        format(a.timestamp, "yyyy-MM-dd") === dateStr
    )
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )[0]; // 가장 최근 출근
}

export { durationToKoreanString, findCheckin };
