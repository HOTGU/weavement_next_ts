"use client";

import Container from "@/components/Container";
import Image from "next/image";
import React from "react";

const processArray = [
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

const HomeAdmin = () => {
  return (
    <div className="bg-black">
      <Container>
        {/* padding section */}
        <div className="pt-60"></div>

        {/* 회사 슬로건 */}
        <div>
          <div className="flex justify-between text-white font-pretendard">
            <p className="w-1/4 leading-[30px] whitespace-pre-line break-keep">
              위브먼트에게는 조형물의 크기도 목적도 소재도 제한이 없습니다
              예산과 일정 목적에 알맞은 예술적인 결과를 만들어갑니다
            </p>
            <p className="w-2/3 text-7xl leading-[100px] whitespace-pre-wrap break-keep ">
              우리는 고객들에게 대단한 경험을 하게 해줄 수 있다. <br />
              (우리는 투자합니다)
            </p>
          </div>
        </div>

        {/* padding section */}
        <div className="pt-80"></div>

        {/* 회사 포트폴리오 */}
        <div className=" flex flex-col gap-40">
          <div className="w-[80%] aspect-video mx-auto">
            <div className="bg-red-200 w-full h-full"></div>
          </div>
          <div className="flex justify-between h-[150vh]">
            <div className=" self-end w-2/5 aspect-[580/720] bg-yellow-300"></div>
            <div className=" self-start w-2/5 aspect-[580/720] bg-blue-300"></div>
          </div>
        </div>

        {/* padding section */}
        <div className="pt-32"></div>

        {/* 포트폴리오 더보기 버튼 */}
        <div className="flex items-center justify-center">
          <div className="text-white">포트폴리오 더보기</div>
        </div>

        {/* padding section */}
        <div className="pt-80"></div>

        {/* 작업 procexx */}
        <div className="flex justify-between text-white font-pretendard">
          <div className="w-1/2 pr-40">
            <div className="text-6xl mb-10 leading-tight">
              위브먼트가 함께
              <br />
              고객과 일하는 방식:
            </div>
            <div className="text-xl whitespace-pre-wrap break-keep ">
              우리는 고객이 원하는 바를 정확히 파악하기 위해 끊임없이 소통하며
              최고의 결과를 만들어냅니다.
            </div>
          </div>
          <div className="w-1/2 space-y-10">
            {processArray.map((item, index) => (
              <div
                key={index}
                className="w-full aspect-[679/320] rounded bg-neutral-900 p-10 flex flex-col justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className=" w-[54px] aspect-square rounded-full bg-neutral-800 p-2">
                    <div className="relative w-full h-full">
                      <Image
                        src={item.photo}
                        alt={`${item.title} 사진`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                  <div className=" text-4xl font-bold">{item.title}</div>
                </div>

                <div className=" text-2xl text-neutral-400 whitespace-pre-wrap break-keep w-3/4">
                  {item.subTitle}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* padding section */}
        <div className="pt-80"></div>
      </Container>
    </div>
  );
};

export default HomeAdmin;
