"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import queryString from "query-string";
import React from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

interface PortfolioPageProps {
  allPage: number;
  currentPage?: number;
}

const PortfolioPagination = ({
  allPage,
  currentPage = 1,
}: PortfolioPageProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const CONTAINER_SIZE = 5;
  const CONTAINER_LENGTH = Math.ceil(allPage / CONTAINER_SIZE);
  const CURRENT_CONTAINER = Math.ceil(currentPage / CONTAINER_SIZE);

  const currentUrl = queryString.parse(searchParams.toString());
  delete currentUrl.page;

  const searchQuery = queryString.stringify(currentUrl);

  return (
    <div className="flex gap-1 items-center justify-center pt-6 mt-auto">
      {CURRENT_CONTAINER > 1 && (
        <Link
          href={`${pathname}?page=${(CURRENT_CONTAINER - 1) * CONTAINER_SIZE}`}
        >
          <AiOutlineLeft />
        </Link>
      )}
      {Array.from(Array(allPage), (e, i) => (
        <span key={i}>
          {Math.ceil((i + 1) / CONTAINER_SIZE) === CURRENT_CONTAINER && (
            <Link
              href={`${pathname}?${searchQuery && searchQuery + "&"}page=${
                i + 1
              }`}
              className={` px-3 text-center rounded ${
                currentPage
                  ? String(currentPage) === String(i + 1) &&
                    "bg-accent text-white"
                  : i + 1 === 1 && "bg-accent text-white"
              }`}
            >
              {i + 1}
            </Link>
          )}
        </span>
      ))}
      {CONTAINER_SIZE < allPage && CONTAINER_LENGTH > CURRENT_CONTAINER && (
        <Link
          href={`${pathname}?${searchQuery && searchQuery + "&"}page=${
            CURRENT_CONTAINER * CONTAINER_SIZE + 1
          }`}
        >
          <AiOutlineRight />
        </Link>
      )}
    </div>
  );
};

export default PortfolioPagination;
