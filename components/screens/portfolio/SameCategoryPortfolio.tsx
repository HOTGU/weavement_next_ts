import Link from "next/link";
import React from "react";
import PortfolioBlock from "./PortfolioBlock";
import { SameCategoryPortfolioData } from "@/types";

const SameCategoryPortfolio = ({
  sameCategoryData,
}: {
  sameCategoryData: SameCategoryPortfolioData;
}) => {
  return (
    <div className="pb-4 md:pt-8 md:pb-6 lg:pt-16 xl:pt-20 lg:pb-8 space-y-2 md:space-y-4 lg:space-y-6">
      {sameCategoryData.map((data) => {
        return (
          <div key={data.name}>
            {(data.prev || data.next) && (
              <div key={data.name}>
                <div className=" text-neutral-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl pb-2">
                  다른{" "}
                  <span className="font-bold text-black">#{data.name}</span>{" "}
                  사례
                </div>
                <div className="flex items-center gap-4 w-full">
                  {data.prev && (
                    <Link
                      href={`/portfolio/${data.prev.id}`}
                      className="flex items-center gap-2 w-1/2"
                    >
                      <div className="relative w-full aspect-video overflow-hidden">
                        <PortfolioBlock portfolio={data.prev} />
                      </div>
                    </Link>
                  )}

                  {data.next && (
                    <Link
                      href={`/portfolio/${data.next.id}`}
                      className="flex items-center gap-2 w-1/2"
                    >
                      <div className="relative w-full aspect-video overflow-hidden">
                        <PortfolioBlock portfolio={data.next} />
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SameCategoryPortfolio;
