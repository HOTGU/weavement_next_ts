"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TiMessages } from "react-icons/ti";
import { MdFactory } from "react-icons/md";
import { FaHeadset, FaTruck, FaPencilRuler, FaInfo } from "react-icons/fa";

const Header = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const position = useTransform(scrollYProgress, (pos) =>
    pos >= 1 ? "relative" : "fixed"
  );

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (!targetRef.current) return;
      const { clientX, clientY } = ev;
      targetRef.current.style.setProperty("--x", `${clientX}px`);
      targetRef.current.style.setProperty("--y", `${clientY}px`);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <motion.section
      style={{ opacity }}
      ref={targetRef}
      className="relative mb-[8rem] h-screen py-16 text-black"
    >
      <motion.div
        style={{ position, scale, x: "-50%" }}
        className="fixed left-1/2 z-10 flex flex-col items-center"
      >
        <div className="pt-12 h-auto">
          <div className=" text-6xl font-extrabold leading-snug pb-6">
            <h2>조형물 제작,</h2>
            <div>
              <span className="text-accent text-bold">위브먼트</span>가 있습니다
            </div>
            <div className="border-b w-[390px] border-black mt-12" />
          </div>
          <div className="text-lg font-bold pb-12">감각적인 제조, 위브먼트</div>
        </div>
      </motion.div>
    </motion.section>
  );
};

const MainImg = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0.1, 0.4, 0.75, 1],
    [1, 1.4, 2.2, 1.6]
  );

  const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  return (
    <section ref={targetRef} className="relative z-10 mt-[-50vh] h-[300vh]">
      <div className="sticky top-0">
        <div className="flex justify-center">
          <motion.div style={{ scale }} className="origin-top">
            <motion.img
              style={{ opacity }}
              src="/meta_img.png"
              className="h-auto max-h-none w-[70vw]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SlidingImage = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const animationOffset = {
    init: 0,
    fadeInImageEnd: 0.15,
    fadeInTextOneEnd: 0.25,
    showTextOne: 0.3,
    fadeOutTextOneEnd: 0.4,
    moveImageEnd: 0.5,
    fadeInTextTwoEnd: 0.6,
    showTextTwo: 0.65,
    fadeOutTextTwoEnd: 0.75,
    centerMoveImageEnd: 0.8,
    fadeOutImageEnd: 1,
  };

  const scale = useTransform(
    scrollYProgress,
    [
      animationOffset.init,
      animationOffset.fadeInImageEnd,
      animationOffset.centerMoveImageEnd,
      animationOffset.fadeOutImageEnd,
    ],
    [2.5, 1, 1, 0.5]
  );
  const x = useTransform(
    scrollYProgress,
    [
      animationOffset.showTextOne,
      animationOffset.fadeOutTextOneEnd,
      animationOffset.moveImageEnd,
      animationOffset.showTextTwo,
      animationOffset.fadeOutTextTwoEnd,
      animationOffset.centerMoveImageEnd,
    ],
    ["0", "5vw", "-50vw", "-50vw", "-55vw", "-25vw"]
  );
  const y = useTransform(
    scrollYProgress,
    [animationOffset.init, animationOffset.fadeInImageEnd],
    ["-100vh", "-50%"]
  );
  const opacity = useTransform(
    scrollYProgress,
    [
      animationOffset.init,
      animationOffset.fadeInImageEnd,
      animationOffset.centerMoveImageEnd,
      animationOffset.fadeOutImageEnd,
    ],
    [0, 1, 1, 0]
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [
      animationOffset.fadeInImageEnd,
      animationOffset.fadeInTextOneEnd,
      animationOffset.showTextOne,
      animationOffset.fadeOutTextOneEnd,
    ],
    [0, 1, 1, 0]
  );
  const textY = useTransform(
    scrollYProgress,
    [
      animationOffset.fadeInImageEnd,
      animationOffset.fadeInTextOneEnd,
      animationOffset.showTextOne,
      animationOffset.fadeOutTextOneEnd,
    ],
    ["0", "-50%", "-50%", "-100%"]
  );

  const textTwoOpacity = useTransform(
    scrollYProgress,
    [
      animationOffset.moveImageEnd,
      animationOffset.fadeInTextTwoEnd,
      animationOffset.showTextTwo,
      animationOffset.fadeOutTextTwoEnd,
    ],
    [0, 1, 1, 0]
  );
  const textTwoY = useTransform(
    scrollYProgress,
    [
      animationOffset.moveImageEnd,
      animationOffset.fadeInTextTwoEnd,
      animationOffset.showTextTwo,
      animationOffset.fadeOutTextTwoEnd,
    ],
    ["0", "-50%", "-50%", "-100%"]
  );

  return (
    <section ref={targetRef} className="relative z-10 h-[800vh]">
      <div className="sticky top-1/2 -translate-y-1/2">
        <motion.div
          style={{ scale, y, x }}
          className="absolute top-1/2 left-1/2 w-[50vw]"
        >
          <motion.img
            style={{ opacity }}
            src="/meta_img.png"
            className="h-auto w-full max-h-none"
          />
        </motion.div>

        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="w-[50vw] mr-[55vw] space-y-4 absolute left-0 top-1/2 ml-[10vw]"
        >
          <p className="text-4xl text-bold">소재도 방법도 제한이 없습니다</p>
          <p className="text-4xl text-bold text-accent">편하게 문의주세요</p>
        </motion.div>

        <motion.div
          style={{ opacity: textTwoOpacity, y: textTwoY }}
          className="w-[50vw] mr-[55vw] space-y-4  absolute left-1/2 top-1/2 ml-[10vw]"
        >
          <p className="text-4xl text-bold text-blue-500">
            소재도 방법도 제한이 없습니다
          </p>
          <p className="text-4xl text-bold text-accent">편하게 문의주세요</p>
        </motion.div>
      </div>
    </section>
  );
};

const BoxAndSlogan = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const animationOffset = {
    init: 0,
    fadeInBoxEnd: 0.14,
    showText: 0.5,
    fadeOutBoxEnd: 0.6,
    fadeInTextEnd: 0.75,
    showLastText: 0.85,
    fadeOutTextEnd: 1,
  };

  const opacity = useTransform(
    scrollYProgress,
    [
      animationOffset.init,
      animationOffset.fadeInBoxEnd,
      animationOffset.showText,
      animationOffset.fadeOutBoxEnd,
    ],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [
      animationOffset.init,
      animationOffset.fadeInBoxEnd,
      animationOffset.fadeOutBoxEnd,
    ],
    [4, 1.2, 0.8]
  );
  const y = useTransform(
    scrollYProgress,
    [animationOffset.init, animationOffset.fadeInBoxEnd],
    ["-100vh", "-50%"]
  );
  const x = useTransform(
    scrollYProgress,
    [animationOffset.init, animationOffset.fadeInBoxEnd],
    ["-50%", "-50%"]
  );

  const textX = useTransform(
    scrollYProgress,
    [animationOffset.fadeInBoxEnd, animationOffset.showText],
    ["100vw", "-100vw"]
  );

  const textY = useTransform(scrollYProgress, [0, 1], ["-50%", "-50%"]);

  const textOpacity = useTransform(
    scrollYProgress,
    [
      animationOffset.fadeOutBoxEnd,
      animationOffset.fadeInTextEnd,
      animationOffset.showLastText,
      animationOffset.fadeOutTextEnd,
    ],
    [0, 1, 1, 0]
  );
  const textScale = useTransform(
    scrollYProgress,
    [animationOffset.showLastText, animationOffset.fadeOutTextEnd],
    [1, 0.8]
  );
  const lastTextX = useTransform(scrollYProgress, [0, 1], ["-50%", "-50%"]);
  const lastTextY = useTransform(
    scrollYProgress,
    [animationOffset.fadeOutBoxEnd, animationOffset.fadeInTextEnd],
    ["0%", "-50%"]
  );

  return (
    <section ref={targetRef} className="relative z-10 h-[400vh] -mt-[60vh]">
      <div className="sticky top-1/2">
        <motion.div
          style={{ opacity, x, y, scale }}
          className="absolute z-10 left-1/2 p-[10vw] border-[20px] border-accent w-[200px]"
        ></motion.div>
        <motion.p
          style={{ y: textY, x: textX }}
          className="absolute right-0 text-8xl font-bold [-webkit-text-stroke:1px_var(--color-heading)]"
        >
          조형물 제작 위브먼트 감각적인 제조
        </motion.p>
        <motion.p
          style={{
            opacity: textOpacity,
            x: lastTextX,
            y: lastTextY,
            scale: textScale,
          }}
          className="absolute left-1/2 top-1/2 text-7xl"
        >
          <span>조형물 제작 위브먼트</span>
          <br />
          <span>감각적인 제조</span>
        </motion.p>
      </div>
    </section>
  );
};

const Features = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.9, 1], [0.8, 0.8, 1]);
  const x = useTransform(scrollYProgress, [0.3, 1], ["50%", "0%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.6, 0.85, 0.9],
    [1, 1, 0.4, 0.4, 1]
  );

  const text1Opacity = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.5],
    [0, 1, 0]
  );
  const text1Y = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.5],
    ["-40%", "-50%", "-60%"]
  );

  const text2Opacity = useTransform(
    scrollYProgress,
    [0.5, 0.6, 0.7],
    [0, 1, 0]
  );
  const text2Y = useTransform(
    scrollYProgress,
    [0.5, 0.6, 0.7],
    ["-40%", "-50%", "-60%"]
  );

  const text3Opacity = useTransform(
    scrollYProgress,
    [0.7, 0.8, 0.9],
    [0, 1, 0]
  );
  const text3Y = useTransform(
    scrollYProgress,
    [0.7, 0.8, 0.9],
    ["-40%", "-50%", "-60%"]
  );

  return (
    <section className="flex flex-col items-center h-[600vh]" ref={targetRef}>
      <div className="sticky top-[16.7vh] h-[66.8vh] px-16 text-4xl">
        <motion.div style={{ x, scale }} className="relative h-full">
          <motion.figure style={{ opacity }} className="h-full">
            <img src="/meta_img.png" className="h-full w-auto" />
          </motion.figure>
        </motion.div>
        <motion.p
          style={{ opacity: text1Opacity, y: text1Y }}
          className="w-[30vw] absolute top-1/2 left-0 whitespace-break-spaces"
        >
          <span className="text-accent">1.위브먼트의 장점</span>
          <br />
          <span className=" ">
            모든 서비스를 원스톱으로 누려보세요 디자인부터 제작 설치까지 모두
            가능합니다 프로젝트 진행은 1명의 프로젝트 매니저가 전담합니다
          </span>
        </motion.p>
        <motion.p
          style={{ opacity: text2Opacity, y: text2Y }}
          className="w-[30vw] absolute top-1/2 left-0 whitespace-break-spaces"
        >
          <span className="text-accent">2.위브먼트의 장점</span>
          <br />
          <span className=" ">
            패브릭 FRP 인형탈까지 소재와 목적에 제한없이 모두 제작 가능합니다
            편하게 연락주세요
          </span>
        </motion.p>
        <motion.p
          style={{ opacity: text3Opacity, y: text3Y }}
          className="w-[30vw] absolute top-1/2 left-0 whitespace-break-spaces"
        >
          <span className="text-accent">3.위브먼트 장점</span>
          <br />
          <span className=" ">
            조형물 스타트업으로 타 업체와 다른 신재생 에너지 또한 제작이
            가능합니다 지구와 환경을 지켜주세요
          </span>
        </motion.p>
      </div>
    </section>
  );
};

const MoreFeatures = () => {
  const content = [
    {
      icon: FaHeadset,
      title: "상담",
      text: "문의내용을 검토하여 디렉터와 무료상담이 진행됩니다. 많은 프로젝트를 진행한 전문적인 프로젝트매니저가 직접 상담합니다.",
    },
    {
      icon: FaPencilRuler,
      title: "디자인",
      text: "제작을 위한 사전 단계로 디자인이 필요하시면 2D디자인, 3D디자인 혹은 기술 설계 과정이 포함됩니다. ",
    },
    {
      icon: MdFactory,
      title: "제작",
      text: "기획, 디자인, 설계 내용을 토대로 최적의 소재와 방식을 이용해 전문가들이 컨텐츠를 제작합니다. ",
    },
    {
      icon: TiMessages,
      title: "소통",
      text: "기획단계나 제작과정 중 궁금한 것이 있으시면 편하게 연락주시면 친절하게 소통합니다",
    },
    {
      icon: FaTruck,
      title: "설치",
      text: "제작된 컨텐츠의 특징, 현장 상황에 알맞게 안전한 운반과 설치가 진행됩니다.",
    },
    {
      icon: FaInfo,
      title: "강점",
      text: "수 차례 공공기관과 기업들과 협엽한 경험을 바탕으로 원활한 진행을 경험하실 수 있습니다.",
    },
  ];

  return (
    <section className="mx-auto grid w-full max-w-[120rem] grid-cols-3 gap-32 p-40">
      {content.map(({ icon: Icon, title, text }) => (
        <div key={title}>
          <span className="mb-4 flex h-24 w-24 items-center justify-center rounded-lg bg-gray-50">
            <Icon className="w-8 h-8" />
          </span>
          <h3 className="mb-2 text-xl">{title}</h3>
          <p className="text-md">{text}</p>
        </div>
      ))}
    </section>
  );
};

const AboutUsClient = () => {
  return (
    <main>
      <Header />
      <div className="relative z-10 w-full overflow-x-clip">
        <MainImg />
        <SlidingImage />
        <BoxAndSlogan />
        <Features />
        <MoreFeatures />
      </div>
    </main>
  );
};

export default AboutUsClient;
