"use client";

import usePortfolioSearchModal from "@/hooks/usePortfolioSearchModal";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { FaSearch } from "react-icons/fa";

export const PortfolioSearchButton = () => {
  const { onOpen } = usePortfolioSearchModal();
  const params = useSearchParams();
  const paramsTerm = params.get("term");
  const paramsCategory = params.get("category");

  const searchResult = useMemo(() => {
    const term = paramsTerm ? paramsTerm : "검색어";
    const category = paramsCategory ? paramsCategory : "카테고리";
    return {
      term,
      category,
    };
  }, [params]);

  return (
    <div className="fixed h-10 md:h-12 lg:h-14 py-1 md:py-1 lg:py-2 top-0 left-1/2 -translate-x-1/2 z-30">
      <div
        onClick={onOpen}
        className="flex gap-4 lg:gap-6 px-4 lg:px-6 h-full rounded-full border cursor-pointer items-center"
      >
        <div
          className={`hidden sm:block border-r pr-4 lg:pr-6 text-sm lg:text-base ${
            paramsTerm ? " text-black font-bold" : "text-neutral-400"
          }`}
        >
          {searchResult.term}
        </div>
        <div
          className={`hidden sm:block border-r pr-4 lg:pr-6 text-sm lg:text-base ${
            paramsCategory ? " text-black font-bold" : "text-neutral-400"
          }`}
        >
          {searchResult.category}
        </div>
        <FaSearch color="#A6192E" size={16} />
      </div>
    </div>
  );
};
