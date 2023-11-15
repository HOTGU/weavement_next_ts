"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import React from "react";

const DateSearch = () => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const date = params.get("date");

  const navigateDateByQuery = ({
    date,
  }: {
    date: "quarter" | "month" | "year";
  }) => {
    {
      let query = {};
      let currentQuery = qs.parse(params.toString());
      query = { ...currentQuery, date };
      const url = qs.stringifyUrl({ url: pathname, query });
      router.push(url);
    }
  };
  return (
    <div className="flex gap-4">
      <div
        className={`px-4 py-1 rounded border cursor-pointer hover:opacity-70 transition ${
          date === "month" && "bg-neutral-200"
        }`}
        onClick={() => navigateDateByQuery({ date: "month" })}
      >
        월별
      </div>
      <div
        className={`px-4 py-1 rounded border cursor-pointer hover:opacity-70 transition ${
          date === "quarter" && "bg-neutral-200"
        }`}
        onClick={() => navigateDateByQuery({ date: "quarter" })}
      >
        분기별
      </div>
    </div>
  );
};

export default DateSearch;
