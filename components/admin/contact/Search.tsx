import React, { useMemo } from "react";
import differenceInDays from "date-fns/differenceInDays";
import format from "date-fns/format";
import { ko } from "date-fns/locale";
import { useSearchParams } from "next/navigation";
import { BiSearch } from "react-icons/bi";

import useSearchModal from "@/hooks/useSearchModal";

const Search = () => {
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const pm = params?.get("pm");
  const term = params?.get("term");

  const rangeLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);

      const diff = differenceInDays(end, start);

      if (diff < 0) {
        return `${format(end, "yy.MM.dd", { locale: ko })} ~ ${format(
          start,
          "yy.MM.dd",
          {
            locale: ko,
          }
        )}`;
      }

      return `${format(start, "yy.MM.dd", { locale: ko })} ~ ${format(
        end,
        "yy.MM.dd",
        {
          locale: ko,
        }
      )}`;
    }

    return "무기간";
  }, [startDate, endDate]);

  const pmLabel = useMemo(() => {
    if (pm) return pm;
    return "모두";
  }, [pm]);

  const termLabel = useMemo(() => {
    if (term) return term;
    return "검색어";
  }, [term]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="flex items-center px-4 py-1 rounded-full shadow border text-gray-600 text-sm border-zinc-200 hover:shadow-md cursor-pointer transition"
    >
      <div className="px-6 font-semibold">{rangeLabel}</div>
      <div className="px-6 border-x-[1px] font-semibold">{pmLabel}</div>
      <div className="pl-6 pr-2 flex items-center gap-3">
        <div>{termLabel}</div>
        <div className="p-2 bg-accent rounded-full text-white">
          <BiSearch size={18} />
        </div>
      </div>
    </div>
  );
};

export default Search;
