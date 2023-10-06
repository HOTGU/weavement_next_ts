"use client";

import React from "react";
import Image from "next/legacy/image";
import { motion } from "framer-motion";

import Container from "../Container";
import SlidingText from "../framer/SlidingText";

const HomeProcess = () => {
  const photos = [
    {
      photo: "/의뢰.png",
      title: "프로젝트 의뢰",
      subTitle: "문의내용을 검토하여 디렉터와 무료상담이 진행됩니다.",
    },
    {
      photo: "/기획.png",
      title: "기획 | 디자인",
      subTitle:
        "제작을 위한 사전 단계로 2D디자인, 3D디자인 혹은 기술 설계 과정이 포함됩니다.",
    },
    {
      photo: "/제작.png",
      title: "제작",
      subTitle:
        "기획, 디자인, 설계 내용을 토대로 최적의 소재와 방식을 이용해 컨텐츠를 제작합니다.",
    },
    {
      photo: "/운송.png",
      title: "운송 | 설치",
      subTitle:
        "제작된 컨텐츠의 특징, 현장 상황에 알맞게 안전한 운반과 설치가 진행됩니다.",
    },
  ];
  return (
    <Container>
      <div className="flex flex-col items-center justify-center">
        <SlidingText text="Process" />
        <div className="flex flex-col md:flex-row gap-12 md:gap-4 mt-8 lg:mt-20">
          {photos.map((item, index) => (
            <motion.div
              viewport={{ once: true }}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.3,
                  type: "tween",
                  delay: index * 0.2,
                },
              }}
              key={item.title}
              className="relative flex-1 flex flex-col items-center p-6 pt-10 lg:pt-20 bg-zinc-100 rounded"
            >
              <div className="absolute -top-[30px] lg:-top-[50px] w-[60px] lg:w-[100px] bg-accent rounded-full p-2 lg:p-4 aspect-square">
                <div className="relative w-full h-full">
                  <Image
                    alt={`${item.title} 이모티콘`}
                    src={item.photo}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="font-semibold text-lg lg:text-xl mb-2 lg:mb-4 mt-2">
                {item.title}
              </div>
              <p className=" whitespace-pre-wrap break-keep text-center text-sm lg:text-base">
                {item.subTitle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default HomeProcess;
