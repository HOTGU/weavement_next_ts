"use client";

import Image from "next/legacy/image";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import RacingFont from "../../RacingFont";

import Image1 from "@/public/imgs/home/메인페이지1.webp";
import Image2 from "@/public/imgs/home/메인페이지2.webp";
import Image3 from "@/public/imgs/home/메인페이지3.webp";
import Image4 from "@/public/imgs/home/메인페이지4.webp";
import Image5 from "@/public/imgs/home/메인페이지5.webp";
import Image6 from "@/public/imgs/home/메인페이지6.webp";
import Image7 from "@/public/imgs/home/메인페이지7.webp";
import Image8 from "@/public/imgs/home/메인페이지8.webp";
// import Image9 from "@/public/imgs/home/메인페이지9.webp";

const images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8];

const HomeScreen = () => {
  // 랜덤 시작 위치
  const [startIndex] = useState(() =>
    Math.floor(Math.random() * images.length),
  );

  // 현재 슬라이드 index
  const [index, setIndex] = useState(0);

  // 배열 회전
  const reorderedImages = useMemo(() => {
    return [...images.slice(startIndex), ...images.slice(0, startIndex)];
  }, [startIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reorderedImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [reorderedImages.length]);

  return (
    <section className="w-full h-[60vh] md:h-[80vh] lg:h-screen relative overflow-hidden">
      <div className="absolute bottom-0 right-0 z-10">
        <div className="flex flex-col items-end font-bold text-white p-2 md:p-6 lg:p-8 xl:p-10 2xl:p-12">
          <p className="text-sm sm:text-lg md:text-xl lg:text-3xl">
            감각적인 제조, 위브먼트
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl">
            <RacingFont>WEAVEMENT</RacingFont>
          </h1>
        </div>
      </div>

      <motion.div
        animate={{ x: `-${index * 100}vw` }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="flex w-fit relative"
      >
        {reorderedImages.map((image, i) => (
          <div
            className="w-screen h-[60vh] md:h-[80vh] lg:h-screen relative"
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
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default HomeScreen;
