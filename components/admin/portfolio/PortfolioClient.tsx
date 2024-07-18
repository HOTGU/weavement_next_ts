"use client";

import { Portfolio } from "@prisma/client";
import React, { useMemo, useState } from "react";

import PortfolioUpload from "./PortfolioUpload";
import PortfolioList from "./PortfolioList";
import { useRouter } from "next/navigation";

interface PortfolioClientProps {
  portfolios: Portfolio[];
  allPage: number;
  currentPage?: number;
}

const PortfolioClient = ({
  portfolios,
  allPage,
  currentPage,
}: PortfolioClientProps) => {
  const [isUpload, setIsUpload] = useState(false);
  const router = useRouter();

  const close = () => setIsUpload(false);

  return (
    <div className="flex h-full gap-4">
      <div className="space-y-2 py-4 w-[80px]">
        <div
          className={`${
            !isUpload && "bg-accent text-white"
          } px-2 py-1 rounded border text-center cursor-pointer`}
          onClick={close}
        >
          목록
        </div>
        <div
          className={`${
            isUpload && "bg-accent text-white"
          } px-2 py-1 rounded border text-center cursor-pointer`}
          onClick={() => {
            setIsUpload(true);
          }}
        >
          업로드
        </div>
      </div>
      {isUpload ? (
        <PortfolioUpload close={close} />
      ) : (
        <PortfolioList
          portfolios={portfolios}
          allPage={allPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default PortfolioClient;
