"use client";

import usePortfolioSearchModal from "@/hooks/usePortfolioSearchModal";
import React from "react";
import { FaSearch } from "react-icons/fa";

export const PortfolioSearchButton = () => {
  const { onOpen } = usePortfolioSearchModal();
  return (
    <div
      onClick={onOpen}
      className="flex gap-2 px-4 py-2 rounded border cursor-pointer items-center"
    >
      <FaSearch color="#A6192E" size={16} />
      <div>검색</div>
    </div>
  );
};
