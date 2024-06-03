import Container from "@/components/Container";
import React from "react";

const PortfolioSkeleton = () => {
  return (
    <Container>
      <div className="pt-14 ">
        <div className="py-6 min-h-[calc(100vh-100px)] flex flex-col">
          <div className="flex-1 grid gird-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                className=" w-full aspect-video bg-neutral-300 animate-pulse rounded"
                key={item}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PortfolioSkeleton;
