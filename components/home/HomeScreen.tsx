"use client";

import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import RacingFont from "../RacingFont";
import { PortfolioWithBlurData } from "@/types";
import ImageWithPlaceholder from "../ImageWithPlaceholder";

interface HomeScreenProps {
  portfolios: PortfolioWithBlurData[];
}

const HomeScreen = ({ portfolios }: HomeScreenProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      const interval = setInterval(() => {
        if (index === portfolios.length - 1) {
          setIndex(0);
          return;
        }
        setIndex((prev) => prev + 1);
      }, 3000);

      return () => clearInterval(interval);
    }, 3000);
  }, [index, portfolios.length]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-screen aspect-video max-h-[100vh] z-10 flex justify-end items-end">
        <div className="flex flex-col items-end font-bold p-2 md:p-6 lg:p-8 xl:p-10 2xl:p-12 text-white">
          <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
            감각적인 제조, 위브먼트
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            <RacingFont>WEAVEMENT</RacingFont>
          </h1>
        </div>
      </div>
      <motion.div
        animate={{ x: `-${index * 100}vw` }}
        transition={{ ease: "easeIn", duration: 0.5 }}
        className="flex w-fit relative"
      >
        {portfolios.map((portfolio, i) => (
          <motion.div
            className="w-screen aspect-video max-h-[100vh] relative"
            key={i}
          >
            <ImageWithPlaceholder
              blurData={portfolio.blurData}
              image={portfolio.thumb}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HomeScreen;
