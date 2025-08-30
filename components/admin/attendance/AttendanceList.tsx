import React from "react";
import { format } from "date-fns";
import { Attendance } from "@prisma/client";
import Link from "next/link";
import { ko } from "date-fns/locale";
import { workedSecondsToKorean } from "@/utils/timeUtils";

interface AttendanceListProps {
  attendances: Attendance[];
  page: number;
  totalPages: number;
}

const AttendanceList = ({
  attendances,
  page,
  totalPages,
}: AttendanceListProps) => {
  const convertToKoreanTime = (timestamp: Date) => {
    return process.env.NODE_ENV === "production"
      ? new Date(new Date(timestamp).getTime() + 9 * 60 * 60 * 1000)
      : new Date(timestamp);
  };

  return (
    <div className="w-full bg-gray-200 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        {/* 이전 버튼 */}
        {page > 1 ? (
          <Link href={`/admin/attendance?page=${page - 1}`}>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              이전
            </button>
          </Link>
        ) : (
          <button className="px-4 py-2 bg-gray-400 text-white rounded" disabled>
            이전
          </button>
        )}

        <div>
          {page} / {totalPages}
        </div>

        {/* 다음 버튼 */}
        {page < totalPages ? (
          <Link href={`/admin/attendance?page=${page + 1}`}>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              다음
            </button>
          </Link>
        ) : (
          <button className="px-4 py-2 bg-gray-400 text-white rounded" disabled>
            다음
          </button>
        )}
      </div>
      <div className="flex items-center text-xl font-bold mb-4">
        <div className="w-1/6 min-w-[100px]">이름</div>
        <div className="w-1/6 min-w-[70px]">타입</div>
        <div className="w-2/6 min-w-[180px]">시간</div>
        <div className="w-2/6 min-w-[120px]">근무시간 (휴게시간 1시간포함)</div>
      </div>
      <div>
        {attendances.map((attendance) => {
          return (
            <div className="flex items-center mb-2" key={attendance.id}>
              <div className="w-1/6 min-w-[100px]">{attendance.username}</div>
              <div className="w-1/6 min-w-[70px]">
                {attendance.type === "checkin" ? "출근" : "퇴근"}
              </div>
              <div className="w-2/6 min-w-[180px]">
                {format(
                  convertToKoreanTime(attendance.timestamp),
                  "yy/MM/dd(EEEE) a hh:mm:ss",
                  { locale: ko }
                )}
              </div>
              <div className="w-2/6 min-w-[120px]">
                {attendance.type === "checkout" &&
                  attendance.workedSeconds &&
                  workedSecondsToKorean(attendance.workedSeconds)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendanceList;
