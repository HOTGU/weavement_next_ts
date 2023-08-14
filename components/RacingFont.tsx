import React from "react";
import { Racing_Sans_One } from "next/font/google";

const racingSansOne = Racing_Sans_One({ subsets: ["latin"], weight: ["400"] });

interface RacingFontProps {
  children: React.ReactNode;
}

const RacingFont = ({ children }: RacingFontProps) => {
  return <span className={`${racingSansOne.className}`}>{children}</span>;
};

export default RacingFont;
