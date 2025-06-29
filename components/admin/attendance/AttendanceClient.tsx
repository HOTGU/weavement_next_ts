"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FadeLoader } from "react-spinners";
import { Attendance } from "@prisma/client";
import { addHours, format, intervalToDuration, isBefore } from "date-fns";
import { workedSecondsToKorean } from "@/utils/workedSecondsToKorean";

const AttendanceClient = ({
  userId,
  username,
  todayCheckin,
}: {
  userId: string;
  username: string;
  todayCheckin: Attendance | null;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState("퇴근");
  const [posibleCheckout, setPosibleCheckout] = useState(false);

  useEffect(() => {
    if (!todayCheckin) return;

    const targetTime = addHours(new Date(todayCheckin.timestamp), 9);

    const interval = setInterval(() => {
      const now = new Date();

      if (isBefore(targetTime, now)) {
        setTimeLeft("퇴근 가능!");
        setPosibleCheckout(true);
        clearInterval(interval);
        return;
      }

      const duration = intervalToDuration({
        start: now,
        end: targetTime,
      });

      setTimeLeft(
        `${duration.hours ?? 0}시간 ${duration.minutes ?? 0}분 ${
          duration.seconds ?? 0
        }초`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [todayCheckin]);

  const handleCheckin = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axios.post("/api/attendance", {
        userId,
        username,
        type: "checkin",
      });

      const checkinTime = new Date(res.data.record.timestamp);
      const checkoutTime = addHours(checkinTime, 9);

      toast.success(
        `${`${username}님 출근 🎉  \n 퇴근이 가능한 시간은 ${format(
          checkoutTime,
          "HH시 mm분"
        )}입니다`}`,
        {
          duration: 5000,
        }
      );
      router.refresh();
      return;
    } catch (error: any) {
      console.log(error);

      return toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (loading || !todayCheckin) return;

    setLoading(true);

    try {
      const checkinTime = new Date(todayCheckin.timestamp);
      const current = new Date();
      const workedSeconds = Math.floor(
        (current.getTime() - checkinTime.getTime()) / 1000
      );

      await axios.post("/api/attendance", {
        userId,
        username,
        type: "checkout",
        workedSeconds,
      });

      toast.success(
        `${username}님 ${workedSecondsToKorean(
          workedSeconds
        )}동안 일하셨습니다! \n 오늘도 고생하셨습니다! 👏👏`,
        {
          duration: 5000,
        }
      );
      router.refresh();
      return;
    } catch (error: any) {
      console.log(error);

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
            onClick={handleCheckin}
            disabled={loading}
            className="bg-blue-500 text-white p-4 rounded w-full"
          >
            <span className="text-2xl">출근</span>
          </button>
          <button
            onClick={() => {
              confirm("퇴근하시겠습니까?") && handleCheckout();
            }}
            disabled={loading}
            className={`${
              posibleCheckout ? "bg-rose-500" : "bg-gray-300"
            } text-white p-4 rounded w-full transition-colors duration-300`}
          >
            <span className="text-2xl">{timeLeft}</span>
          </button>
        </>
      )}
    </div>
  );
};

export default AttendanceClient;
