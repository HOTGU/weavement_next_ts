"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FadeLoader } from "react-spinners";

const AttendanceClient = ({
  userId,
  username,
}: {
  userId: string;
  username: string;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async (type: "checkin" | "checkout") => {
    setLoading(true);

    try {
      const res = await axios.post("/api/attendance", {
        userId,
        username,
        type,
      });

      toast.success(
        `${type === "checkin" ? "출근" : "퇴근"} 기록이 완료되었습니다.`
      );
      router.refresh();
      return;
    } catch (error: any) {
      return toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 p-14 w-1/3 h-[280px] bg-gray-200 rounded-lg">
      {loading ? (
        <FadeLoader color={"gray"} />
      ) : (
        <>
          <button
            onClick={() => {
              if (loading) return;
              handleClick("checkin");
            }}
            disabled={loading}
            className="bg-blue-500 text-white p-4 rounded w-full"
          >
            <span className="text-2xl">출근</span>
          </button>
          <button
            onClick={() => {
              if (loading) return;
              handleClick("checkout");
            }}
            disabled={loading}
            className="bg-rose-500 text-white p-4 rounded w-full"
          >
            <span className="text-2xl">퇴근</span>
          </button>
        </>
      )}
    </div>
  );
};

export default AttendanceClient;
