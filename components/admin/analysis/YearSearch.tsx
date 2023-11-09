"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import React, { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const YearSearch = () => {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const paramsYear = params.get("year");
  console.log(pathname);
  const [open, setOpen] = useState(false);
  const [years, setYears] = useState<number[]>([]);

  useEffect(() => {
    const startYear = 2023;
    const currentYear = new Date().getFullYear();
    const yearArr = [];
    for (let i = startYear; i <= currentYear; i++) {
      yearArr.push(i);
    }
    setYears(yearArr);
  }, []);

  const changeYear = (year: number) => {
    let query = {};
    let currentQuery = qs.parse(params.toString());
    query = { ...currentQuery, year };
    const url = qs.stringifyUrl({ url: pathname, query });
    setOpen(false);
    router.push(url);
  };

  return (
    <div className="relative">
      <div
        className={`pr-1 pl-2 py-1 rounded border flex items-center gap-1 transition cursor-pointer ${
          open ? "rounded-t bg-white" : "rounded"
        }`}
        onClick={() => setOpen(!open)}
      >
        <span>{paramsYear}</span>
        {open ? <BiChevronUp /> : <BiChevronDown />}
      </div>
      {open && (
        <div className="absolute top-8 z-20 h-fit border rounded-b bg-white w-full cursor-default">
          {years.map((year) => {
            return (
              <div
                key={year}
                className=" text-center hover:bg-neutral-200 py-1"
                onClick={() => changeYear(year)}
              >
                {year}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default YearSearch;
