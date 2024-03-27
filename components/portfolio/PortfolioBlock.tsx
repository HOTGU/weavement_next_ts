import Link from "next/link";
import React from "react";
import Image from "next/legacy/image";
import { Portfolio } from "@prisma/client";

import ImageWithPlaceholder from "../ImageWithPlaceholder";
import { PortfolioWithBlurData } from "@/types";

interface PortfolioBlockProps {
  portfolio: PortfolioWithBlurData;
}

const PortfolioBlock = ({ portfolio }: PortfolioBlockProps) => {
  return (
    <Link
      href={`/portfolio/${portfolio.id}`}
      className=" overflow-hidden rounded w-full aspect-video"
    >
      <div
        key={portfolio.id}
        className="relative w-full h-full hover:scale-110 transition "
      >
        <ImageWithPlaceholder
          image={portfolio.thumb}
          blurData={portfolio.blurData}
        />

        <div className="opacity-0 flex hover:opacity-100 transition text-white w-full h-full absolute top-0 right-0 bg-black/50 items-center justify-center text-xl">
          {portfolio.title}
        </div>
      </div>
    </Link>
  );
};

export default PortfolioBlock;
