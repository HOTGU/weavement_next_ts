import React from "react";
import { format } from "date-fns";
import { Attendance } from "@prisma/client";
import { ko } from "date-fns/locale";
import Link from "next/link";

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
        <div className="w-1/6">이름</div>
        <div className="w-1/5">타입</div>
        <div className="w-1/5">시간</div>
      </div>
      <div>
        {attendances.map((attendance) => (
          <div className="flex items-center mb-2" key={attendance.id}>
            <div className="w-1/6">{attendance.username}</div>
            <div className="w-1/5">
              {attendance.type === "checkin" ? "출근" : "퇴근"}
            </div>
            <div className="w-3/5">
              {format(
                new Date(attendance.timestamp),
                "yy/MM/dd(EEE) a hh:mm:ss",
                {
                  locale: ko,
                }
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceList;
