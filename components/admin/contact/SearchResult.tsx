"use client";

import { differenceInDays, format } from "date-fns";
import { ko } from "date-fns/locale";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import React, { useMemo } from "react";
import { TiTimes } from "react-icons/ti";

enum QueryType {
  DATE = "DATE",
  PM = "PM",
  TERM = "TERM",
}

const SearchResult = () => {
  const params = useSearchParams();
  const router = useRouter();

  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const pm = params?.get("pm");
  const searchTerm = params?.get("term");

  const searchDateRangeLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      const diff = differenceInDays(end, start);

      if (diff < 0) {
        return `${format(end, "yy.MM.dd", { locale: ko })}~${format(
          start,
          "yy.MM.dd",
          {
            locale: ko,
          }
        )}`;
      }

      return `${format(start, "yy.MM.dd", { locale: ko })}~${format(
        end,
        "yy.MM.dd",
        {
          locale: ko,
        }
      )}`;
    }
    return "";
  }, [startDate, endDate]);

  const pmLabel = useMemo(() => {
    if (pm) {
      return `${pm}`;
    }
    return "";
  }, [pm]);

  const searchTermLabel = useMemo(() => {
    if (searchTerm) {
      return `${searchTerm}`;
    }
    return "";
  }, [searchTerm]);

  const handleDelete = (target: QueryType) => {
    const query = qs.parse(params.toString());

    if (target === QueryType.DATE) {
      delete query.endDate;
      delete query.startDate;
    }
    if (target === QueryType.PM) {
      delete query.pm;
    }
    if (target === QueryType.TERM) {
      delete query.term;
    }

    const url = qs.stringifyUrl(
      { url: "/admin/contact", query },
      { skipNull: true }
    );
    router.push(url);
  };

  return (
    <div className="flex gap-1 items-center justify-center">
      {searchDateRangeLabel && (
        <div
          className="flex pl-1 h-9 border rounded items-center justify-center hover:text-rose-500 transition cursor-pointer"
          onClick={() => handleDelete(QueryType.DATE)}
        >
          <div className="text-xs">{searchDateRangeLabel}</div>
          <TiTimes />
        </div>
      )}
      {pmLabel && (
        <div
          className="flex pl-1 h-9 border rounded items-center justify-center hover:text-rose-500 transition cursor-pointer"
          onClick={() => handleDelete(QueryType.PM)}
        >
          <div className="text-xs">{pmLabel}</div>
          <TiTimes />
        </div>
      )}
      {searchTermLabel && (
        <div
          className="flex pl-1 h-9 border rounded items-center justify-center hover:text-rose-500 transition cursor-pointer"
          onClick={() => handleDelete(QueryType.TERM)}
        >
          <div className="text-xs">{searchTermLabel}</div>
          <TiTimes />
        </div>
      )}
    </div>
  );
};

export default SearchResult;
