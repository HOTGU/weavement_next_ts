"use client";

import Container from "@/components/Container";
import React, { useRef } from "react";
import { useInView, motion } from "framer-motion";

import ReverseUnderlineText from "@/components/framer/ReverseUnderlineText";
import PaddingSection from "@/components/global/PaddingSection";
import ProcessItem from "@/components/screens/home/ProcessItem";
import StatsCard from "@/components/screens/home/StatsCard";

import { Portfolio } from "@prisma/client";
import { PROCESS_STEPS } from "@/constants";
import PortfolioGrid from "@/components/screens/home/PortfolioGrid";
import MainScreen from "@/components/screens/home/MainScreen";
import Link from "next/link";

const HomeClient = ({ portfolios }: { portfolios: Portfolio[] }) => {
  const whiteSection = useRef(null);
  const primarySection = useRef(null);

  const isInWhiteSection = useInView(whiteSection, {
    margin: "-20% 0px -20% 0px",
  });
  const isInPrimarySection = useInView(primarySection, {
    margin: "-20% 0px -20% 0px",
  });

  return (
    <motion.div
      animate={{
        backgroundColor: isInWhiteSection
          ? "white"
          : isInPrimarySection
          ? "#ffe395"
          : "black",
      }}
      transition={{ duration: 0.5 }}
      className="transition duration-1000"
    >
      <Container>
        <PaddingSection />

        {/* 회사 슬로건 */}
        <div className="flex justify-between text-white font-pretendard">
          <p className="w-1/4 leading-[30px] whitespace-pre-line break-keep">
            위브먼트에게는 조형물의 크기도 목적도 소재도 제한이 없습니다 예산과
            일정 목적에 알맞은 예술적인 결과를 만들어갑니다
          </p>
          <p className="w-2/3 text-7xl leading-[100px] whitespace-pre-wrap break-keep">
            우리는 고객들에게 대단한 경험을 하게 해줄 수 있다. <br />
            (우리는 투자합니다)
          </p>
        </div>

        <PaddingSection />

        {/* 회사 포트폴리오 섹션 */}
        <div className=" flex flex-col gap-40">
          <div className="w-[80%] aspect-video mx-auto bg-red-200" />
          <div className="flex justify-between h-[150vh]">
            <div className="self-end w-2/5 aspect-[580/720] bg-yellow-300" />
            <div className="self-start w-2/5 aspect-[580/720] bg-blue-300" />
          </div>
        </div>

        <PaddingSection size="md" />

        {/* 포트폴리오 더보기 버튼 */}
        <div className="flex items-center justify-center">
          <Link href="/portfolio">
            <ReverseUnderlineText
              size="sm"
              color="white"
              label="포트폴리오 더 보기"
            />
          </Link>
        </div>

        <PaddingSection />

        {/* 회사 소개 */}
        <div className="flex justify-between text-white font-pretendard">
          <div className="w-1/2 pr-40">
            <div className="text-6xl mb-10 leading-tight">
              감각적인 제조를
              <br />
              위한 최고의 선택
            </div>
            <div className="text-xl whitespace-pre-wrap break-keep">
              우리는 클라이언트들과 협력하고 원하는 바를 정확히 파악하기 위해
              끊임없이 소통하며 아이디어를 한단계 더 발전시킵니다
            </div>
          </div>
          <div className="w-1/2 space-y-10">
            <StatsCard
              title="프로젝트 문의"
              value="2520+"
              subtitle="2023년부터 매 해 2배 성장"
            />
            <StatsCard
              title="프로젝트 클라이언트"
              value="207+"
              subtitle="공공기관 및 주요 기업과 협업"
            />
          </div>
        </div>

        <PaddingSection />

        {/* white background section */}
        <div ref={whiteSection}>
          {/* 회사 클라이언트 */}
          <div className="flex gap-4">
            <div className="flex-1 bg-neutral-900 aspect-[5/4]" />
            <div className="flex-1 bg-neutral-900 aspect-[5/4]" />
          </div>

          <PaddingSection size="md" />

          {/* 회사 작업 과정 */}
          <div>
            <div className="text-7xl">우리가 일하는 방식:</div>
            <div className="pt-20" />
            <div className="flex flex-col items-end">
              {PROCESS_STEPS.map((item) => (
                <ProcessItem item={item} key={item.title} />
              ))}
            </div>
          </div>
        </div>

        {/* primary background section */}
        <div ref={primarySection}>
          <PaddingSection />
          <PaddingSection size="md" />

          <PortfolioGrid portfolios={portfolios} />

          <div className="flex flex-col justify-center items-center gap-20">
            <div className="text-6xl">우리가 어떻게 도와드릴까요?</div>

            <Link href="/contact">
              <ReverseUnderlineText
                size="lg"
                color="black"
                label="문의하러 가기"
              />
            </Link>

            <PaddingSection />
          </div>
        </div>
      </Container>
    </motion.div>
  );
};

export default HomeClient;
