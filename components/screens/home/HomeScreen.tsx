"use client";

import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import RacingFont from "../../RacingFont";

import Image1 from "@/public/imgs/home/메인페이지1.webp";
import Image2 from "@/public/imgs/home/메인페이지2.webp";
import Image3 from "@/public/imgs/home/메인페이지3.webp";
import Image4 from "@/public/imgs/home/메인페이지4.webp";
import Image5 from "@/public/imgs/home/메인페이지5.webp";

const HomeScreen = () => {
  const [index, setIndex] = useState(0);
  const images = [Image1, Image2, Image3, Image4, Image5];

  useEffect(() => {
    const interval = setInterval(() => {
      if (index === images.length - 1) {
        setIndex(0);
        return;
      }
      setIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [index, images.length]);

  return (
    <div className="w-full h-[60vh] md:h-[80vh] lg:h-screen relative overflow-hidden">
      <div className="absolute bottom-0 right-0 z-10">
        {/* <div className="flex flex-col items-end font-bold p-2 md:p-6 lg:p-8 xl:p-10 2xl:p-12 text-white"> */}
        <div className="flex flex-col items-end font-bold text-white p-2 md:p-6 lg:p-8 xl:p-10 2xl:p-12">
          <span className="text-sm sm:text-lg md:text-xl lg:text-3xl">
            감각적인 제조, 위브먼트
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl">
            <RacingFont>WEAVEMENT</RacingFont>
          </h2>
        </div>
      </div>
      <motion.div
        animate={{ x: `-${index * 100}vw` }}
        transition={{ ease: "easeIn", duration: 0.5 }}
        className="flex w-fit relative"
      >
        {images.map((image, i) => (
          <motion.div
            className="w-screen aspect-video h-[60vh] md:h-[80vh] lg:h-screen relative "
            key={i}
          >
            <Image
              alt={`위브먼트 대표사진 ${i}`}
              src={image}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              priority
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HomeScreen;
