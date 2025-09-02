import { Portfolio } from "@prisma/client";
import Image from "next/image";

/* -------------------------
   컴포넌트: PortfolioGrid
------------------------- */
const PortfolioGrid = ({ portfolios }: { portfolios: Portfolio[] }) => (
  <div className="flex gap-4 items-center pb-40">
    {portfolios.map((portfolio) => (
      <div key={portfolio.id} className="w-full aspect-[4/3] relative">
        <Image
          src={portfolio.thumb}
          fill
          alt={`${portfolio.title} 사진`}
          className="object-cover"
        />
      </div>
    ))}
  </div>
);

export default PortfolioGrid;
