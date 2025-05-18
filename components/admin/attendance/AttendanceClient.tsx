"use client";

import axios from "axios";
import { fi } from "date-fns/locale";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const AttendanceClient = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"checkin" | "checkout" | null>(null);

  const handleClick = async (type: "checkin" | "checkout") => {
    setLoading(true);
    try {
      const res = await axios.post("/api/attendance", {
        body: JSON.stringify({ userId, type }),
      });

      if (res.data.ok) {
        setStatus(type);
      }
    } catch (error: any) {
      return toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-14 p-14">
      <button onClick={() => handleClick("checkin")} disabled={loading}>
        출근
      </button>
      <button onClick={() => handleClick("checkout")} disabled={loading}>
        퇴근
      </button>
      {status && <p>최근 상태: {status === "checkin" ? "출근" : "퇴근"}</p>}
    </div>
  );
};

export default AttendanceClient;
