"use client";

import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";

import Image1 from "@/public/imgs/home/메인페이지1.webp";
import Image2 from "@/public/imgs/home/메인페이지2.webp";
import Image3 from "@/public/imgs/home/메인페이지3.webp";
import Image4 from "@/public/imgs/home/메인페이지4.webp";
import Image5 from "@/public/imgs/home/메인페이지5.webp";
import Image6 from "@/public/imgs/home/메인페이지6.webp";

import Container from "@/components/Container";

import HiddenUpText from "@/components/framer/HiddenUpText";

const HomeScreen = () => {
  const images = [Image1, Image2, Image3, Image4, Image5];
  const [randomImage, setRandomImage] = useState<any>(null);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    // 클라이언트 측에서 랜덤 이미지 선택
    const randomIndex = Math.floor(Math.random() * images.length);
    setRandomImage(images[randomIndex]);
  }, []); // 컴포넌트 마운트 후 한 번만 실행

  return (
    <div className="w-full h-[60vh] md:h-[80vh] lg:h-screen relative overflow-hidden">
      <div className="absolute bottom-0 left-0 z-10">
        <Container>
          <div className="flex flex-col gap-4 font-ibm py-8 font-[400]">
            <HiddenUpText
              children={"감감적인 제조"}
              delay={1}
              className="text-8xl font-pretendard"
            />
            <HiddenUpText
              children={"WEAVEMENT"}
              delay={1}
              className="text-8xl font-racing"
            />
          </div>
        </Container>
      </div>
      <div className="w-screen aspect-video h-[60vh] md:h-[80vh] lg:h-screen relative">
        {randomImage && (
          <Image
            alt={`위브먼트 대표사진`}
            // src={randomImage}
            src={images[4]}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            priority
          />
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
