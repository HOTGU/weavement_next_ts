import { Portfolio } from "@prisma/client";
import Image from "next/image";
import React from "react";

const PortfolioDetail = ({ portfolio }: { portfolio: Portfolio }) => {
  return (
    <div className=" flex flex-col items-center gap-6 md:gap-8 lg:gap-10 xl:gap-24">
      <div className="w-full aspect-video relative">
        <Image
          src={portfolio?.thumb}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
          sizes="100vw"
          alt="포트폴리오 대표사진"
          blurDataURL={
            portfolio.blurThumb
              ? portfolio.blurThumb
              : "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
          }
          placeholder="blur"
        />
      </div>
      <div className="flex flex-col gap-2 md:gap-4 xl:gap-6 items-center justify-center">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
          {portfolio.title}
        </h2>
        {portfolio.category.length > 0 && (
          <div className="flex gap-4">
            {portfolio.category.map((category) => (
              <div
                className="inline-block px-2 py-1 rounded bg-neutral-200 text-xs md:text-sm lg:text-base"
                key={category}
              >
                #{category}
              </div>
            ))}
          </div>
        )}
        <p className="text-sm md:text-base lg:text-lg whitespace-pre-wrap text-center">
          {portfolio.description}
        </p>
      </div>
      <div className="columns-2 lg:columns-3">
        {portfolio.images.map((image, index) => (
          <img
            alt={`포트폴리오 사진 ${index}`}
            src={image}
            key={index}
            className="mb-6 rounded"
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioDetail;
