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

  const text = ["감각적인 제조, 위브먼트", "두번째 위브먼트"];

  return (
    <div className="w-full h-full relative overflow-hidden">
      <motion.div
        animate={{ x: `-${index * 100}vw` }}
        transition={{ ease: "easeIn", duration: 0.5 }}
        className="flex w-fit relative"
      >
        {thumbs.map((thumb, i) => (
          <motion.div
            animate={{ opacity: i === index ? 1 : 0.3 }}
            className="w-screen aspect-video max-h-[100vh] relative"
            key={i}
          >
            <motion.div
              animate={{ opacity: i === index ? 1 : 0.3 }}
              className="absolute top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black/40"
            >
              <h1 className=" text-white text-6xl font-extrabold p-12 ">
                {text[i]}
              </h1>
            </motion.div>
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
