import Container from "@/components/Container";
import React from "react";

const PortfolioDetailScreen = () => {
  return (
    <Container>
      <div className=" flex flex-col items-center gap-6 md:gap-8 lg:gap-10 xl:gap-24">
        <div className="w-full aspect-video bg-neutral-300 animate-pulse rounded-md"></div>
        <div className="flex flex-col gap-2 md:gap-4 xl:gap-6 items-center justify-center">
          <div className="w-[200px] h-[18px] md:w-[250px] md:h-[20px] lg:w-[300px] lg:h-[22px] bg-neutral-300 animate-pulse rounded-full"></div>
          <div className="flex gap-4">
            <div className="w-[85px] h-[23px] md:w-[98px] md:h-[26px] lg:w-[108px] lg:h-[34px] rounded bg-neutral-300 animate-pulse"></div>
            <div className="w-[85px] h-[23px] md:w-[98px] md:h-[26px] lg:w-[108px] lg:h-[34px] rounded bg-neutral-300 animate-pulse"></div>
          </div>

          <div className="w-[140px] h-[16px] md:w-[200px] md:h-[18px] lg:w-[220px] lg:h-[20px] bg-neutral-300 animate-pulse rounded-full"></div>
          <div className="w-[240px] h-[16px] md:w-[340px] md:h-[18px] lg:w-[420px] lg:h-[20px] bg-neutral-300 animate-pulse rounded-full"></div>
          <div className="w-[180px] h-[16px] md:w-[230px] md:h-[18px] lg:w-[280px] lg:h-[20px] bg-neutral-300 animate-pulse rounded-full"></div>
        </div>
        <div className="columns-2 lg:columns-3 w-full">
          <div className=" h-[400px] mb-6 rounded bg-neutral-300 animate-pulse"></div>
          <div className=" h-[200px] mb-6 rounded bg-neutral-300 animate-pulse"></div>
          <div className=" h-[200px] mb-6 rounded bg-neutral-300 animate-pulse"></div>
          <div className=" h-[400px] mb-6 rounded bg-neutral-300 animate-pulse"></div>
          <div className=" h-[400px] mb-6 rounded bg-neutral-300 animate-pulse"></div>
          <div className=" h-[200px] mb-6 rounded bg-neutral-300 animate-pulse"></div>
        </div>
      </div>
    </Container>
  );
};

export default PortfolioDetailScreen;
