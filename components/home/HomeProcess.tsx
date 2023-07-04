"use client";

import React from "react";
import Image from "next/legacy/image";
import { motion } from "framer-motion";

import Container from "../Container";
import SlidingText from "../framer/SlidingText";
import { fetchContainer, fetchItem } from "@/libs/framer";

const HomeProcess = () => {
  const photos = [
    {
      photo: "/의뢰.png",
      title: "프로젝트 의뢰",
      subTitle: "문의내용을 검토하여 디레터와 무료상담이 진행됩니다.",
    },
    {
      photo: "/기획.png",
      title: "기획 | 디자인 | 설계",
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
        <div className="flex gap-4 mt-20">
          {photos.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.3,
                  type: "tween",
                  delay: 0.3 + index * 0.2,
                },
              }}
              key={item.title}
              className="relative flex-1 flex flex-col items-center p-6 pt-20 bg-zinc-100 rounded"
            >
              <div className="absolute -top-[50px] w-[100px] bg-accent rounded-full p-4 aspect-square">
                <div className="relative w-full h-full">
                  <Image src={item.photo} layout="fill" objectFit="cover" />
                </div>
              </div>
              <div className="font-semibold text-xl mb-4 mt-2">
                {item.title}
              </div>
              <p className=" whitespace-pre-wrap break-keep">{item.subTitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default HomeProcess;
