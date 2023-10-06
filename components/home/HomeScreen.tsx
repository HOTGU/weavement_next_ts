"use client";

import { Portfolio } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";

interface HomeScreenProps {
  portfolios: Portfolio[];
}

const HomeScreen = ({ portfolios }: HomeScreenProps) => {
  const [index, setIndex] = useState(0);
  const thumbs = portfolios.map((portfolio) => portfolio.thumb);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index === portfolios.length - 1) {
        setIndex(0);
        return;
      }
      setIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [index, portfolios.length]);

  return (
    <div className="w-full h-full overflow-hidden">
      <motion.div
        animate={{ x: `-${index * 100}vw` }}
        transition={{ ease: "easeIn", duration: 0.5 }}
        className="flex w-fit"
      >
        {thumbs.map((thumb, i) => (
          <motion.div
            animate={{ opacity: i === index ? 1 : 0.3 }}
            className="w-screen aspect-video max-h-[100vh] relative"
            key={i}
          >
            <Image
              alt="포트폴리오 썸네일"
              src={thumb}
              layout="fill"
              objectFit="cover"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HomeScreen;
