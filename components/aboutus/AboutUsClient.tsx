"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionConfig } from "framer-motion";
import { TiMessages } from "react-icons/ti";
import { MdFactory } from "react-icons/md";
import { FaHeadset, FaTruck, FaPencilRuler, FaInfo } from "react-icons/fa";
import Link from "next/link";
import Footer from "../Footer";
import Image from "next/image";
import Navbar from "../navbar/Navbar";

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
        className="sticky left-1/2 z-10 flex flex-col items-center"
      >
        <div className="pt-12 h-auto">
          <div className="text-5xl lg:text-6xl font-extrabold leading-snug pb-6">
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

const mobileHeader = () => {};

const MainImg = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0.1, 0.6, 0.9, 1],
    [1, 1.5, 2, 1.6]
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
    fadeInImageEnd: 0.2,
    fadeInTextOneEnd: 0.25,
    showTextOne: 0.35,
    fadeOutTextOneEnd: 0.4,
    moveImageEnd: 0.5,
    fadeInTextTwoEnd: 0.55,
    showTextTwo: 0.65,
    fadeOutTextTwoEnd: 0.7,
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
    <section ref={targetRef} className="relative z-10 h-[600vh]">
      <div className="sticky top-1/2 -translate-y-1/2 w-full">
        <motion.div
          style={{ scale, y, x }}
          className="absolute top-1/2 left-1/2 w-[50vw]"
        >
          <motion.img
            style={{ opacity }}
            src="/aboutus/img1.webp"
            className="h-auto w-full max-h-none"
          />
        </motion.div>

        <motion.p
          style={{ opacity: textOpacity, y: textY }}
          className=" absolute pl-16 top-1/2 text-3xl leading-snug font-bold"
        >
          위브먼트에게는 조형물의
          <br />
          크기도, 목적도, 소재도
          <br />
          제한이 없습니다
        </motion.p>

        <motion.p
          style={{ opacity: textTwoOpacity, y: textTwoY }}
          className="absolute pr-16 right-0 top-1/2 text-2xl leading-snug font-bold"
        >
          예산과 일정, 목적에 알맞은
          <br />
          예술적인 결과를 만들어갑니다
        </motion.p>
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
    fadeInBoxEnd: 0.15,
    showText: 0.7,
    fadeOutBoxEnd: 0.8,
    fadeInTextEnd: 0.81,
    showLastText: 0.9,
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
  const lastTextY = useTransform(scrollYProgress, [0, 1], ["-50%", "-50%"]);

  return (
    <section ref={targetRef} className="relative z-10 h-[400vh] -mt-[0vh]">
      <div className="sticky top-1/2">
        <motion.div
          style={{ opacity, x, y, scale }}
          className="absolute z-10 left-1/2 p-[10vw] border-[20px] border-accent w-[200px]"
        ></motion.div>
        <motion.p
          style={{ y: textY, x: textX }}
          className="absolute right-0 text-8xl font-bold whitespace-nowrap [-webkit-text-stroke:1px_var(--color-heading)]"
        >
          감각적인 조형물 제작 위브먼트
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
          감각적인
          <br />
          조형물 제작
          <br />
          위브먼트
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
            <img src="/aboutus/img3.webp" className="h-full w-auto" />
          </motion.figure>
        </motion.div>
        <motion.p
          style={{ opacity: text1Opacity, y: text1Y }}
          className="w-[40vw] absolute top-1/2 left-0 whitespace-break-spaces break-words "
        >
          <span className="text-accent">Onestop Service</span>
          <br />
          위브먼트는
          <br />
          조형물 디자인, 제작, 설치까지
          <br />
          원스톱 서비스를 제공합니다
        </motion.p>
        <motion.p
          style={{ opacity: text2Opacity, y: text2Y }}
          className="w-[40vw] absolute top-1/2 left-0 whitespace-break-spaces"
        >
          <span className="text-accent pb-4">Specialized Directing</span>
          <br />
          위브먼트는
          <br />
          전문적인 지식과 섬세한 감각을 갖춘
          <br />
          프로젝트 디렉팅을 제공합니다.
        </motion.p>
        <motion.p
          style={{ opacity: text3Opacity, y: text3Y }}
          className="w-[40vw] absolute top-1/2 left-0 whitespace-break-spaces"
        >
          <span className="text-accent">
            Art Service <br />
            (Various Contents)
          </span>
          <br />
          위브먼트는
          <br />
          조형물, 인형탈, 신소재 활용까지
          <br />
          폭넓은 아트 콘텐츠를 제작합니다.
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
      text: "문의 내용을 검토하여 디렉터와 1:1 무료 상담이 진행됩니다. 풍부한 노하우를 가진 전문 디렉터가 직접 상담하고, 프로젝트를 진행합니다.",
    },
    {
      icon: FaPencilRuler,
      title: "기획 및 디자인",
      text: "제작을 위한 사전 단계로 목적에 맞은 컨텐츠 기획, 2D디자인, 3D디자인, 기술 설계 과정 등이 포함됩니다.",
    },
    {
      icon: MdFactory,
      title: "제작",
      text: "기획, 디자인, 설계 내용을 토대로 최적의 소재와 방식을 이용해 전문가들이 컨텐츠를 제작합니다. ",
    },
    {
      icon: TiMessages,
      title: "소통",
      text: "상담부터 제작에 이르기까지 1:1 디렉터가 배정되어 책임지고 프로젝트를 완수합니다. 빠르고 원활한 소통이 가능합니다.",
    },
    {
      icon: FaTruck,
      title: "운반 및 설치",
      text: "제작된 컨텐츠의 특징, 현장 상황에 알맞게 꼼꼼하고 안전한 포장, 운반, 설치가 진행됩니다.",
    },
    {
      icon: FaInfo,
      title: "인증",
      text: "기업, 기관과 협업한 경험과 노하우를 바탕으로 다양한 계약에 필요한 제반서류, 인증서 등을 제공합니다.",
    },
  ];

  return (
    <section className="mx-auto grid w-full max-w-[120rem] grid-cols-3 gap-4 md:gap-16 lg:gap-32 p-4 md:p-20 lg:p-40 ">
      {content.map(({ icon: Icon, title, text }) => (
        <div key={title} className="text-pretty">
          <span className="mb-4 flex h-12 md:h-24 w-12 md:w-24 items-center justify-center rounded-lg bg-neutral-100">
            <Icon className="w-6 h-6 md:w-8 md:h-8" color="black" />
          </span>
          <h3 className="mb-2 text-base md:text-xl">{title}</h3>
          <div className="text-xs md:text-base">{text}</div>
        </div>
      ))}
    </section>
  );
};

const Nav = () => {
  const [active, setActive] = useState(false);
  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <motion.div
        animate={active ? "open" : "close"}
        className="z-20 relative text-white"
      >
        <motion.div
          initial={false}
          className="fixed"
          animate={active ? "open" : "close"}
          variants={{
            open: {
              width: "100%",
              height: "100%",
              top: 0,
              right: 0,
              backgroundColor: "black",
              borderRadius: 0,
            },
            close: {
              width: "80px",
              height: "80px",
              top: "20px",
              right: "20px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              borderRadius: "16px",
            },
          }}
          transition={{
            delay: active ? 0.1 : 0.5,
          }}
        >
          <motion.button
            initial={false}
            onClick={() => {
              console.log(2);
              setActive(!active);
            }}
            className="fixed top-[20px] right-[20px] w-[80px] h-[80px] z-20 rounded-2xl"
          >
            <motion.span
              style={{ left: "50%", top: "35%", x: "-50%", y: "-50%" }}
              className="absolute h-1 w-10 bg-white"
              variants={{
                open: {
                  rotate: ["0deg", "0deg", "45deg"],
                  top: ["35%", "50%", "50%"],
                },
                close: {
                  rotate: ["45deg", "0deg", "0deg"],
                  top: ["50%", "50%", "35%"],
                },
              }}
            />
            <motion.span
              style={{
                left: "50%",
                top: "50%",
                x: "-50%",
                y: "-50%",
              }}
              className="absolute h-1 w-10 bg-white"
              variants={{
                open: {
                  rotate: ["0deg", "0deg", "-45deg"],
                },
                close: {
                  rotate: ["-45deg", "0deg", "0deg"],
                },
              }}
            />
            <motion.span
              style={{
                left: "calc(50% + 10px)",
                top: "65%",
                x: "-50%",
                y: "-50%",
              }}
              className="absolute h-1 w-5 bg-white"
              variants={{
                open: {
                  rotate: ["0deg", "0deg", "45deg"],
                  left: "50%",
                  top: ["65%", "50%", "50%"],
                },
                close: {
                  rotate: ["45deg", "0deg", "0deg"],
                  left: "calc(50% + 10px)",
                  top: ["50%", "50%", "65%"],
                },
              }}
            />
          </motion.button>
          <motion.nav className="h-full flex items-start justify-center flex-col">
            <motion.ul
              className="text-7xl list-none w-full"
              variants={{
                open: {
                  opacity: 1,
                  y: "-20px",
                },
                close: {
                  opacity: 0,
                  y: "0px",
                },
              }}
              transition={{
                delay: active ? 0.5 : 0,
              }}
            >
              <Link href="/">
                <motion.li className="py-10 px-24 hover:text-accent hover:cursor-pointer">
                  홈으로 가기.
                </motion.li>
              </Link>
              <Link href="/contact">
                <motion.li className="py-10 px-24 hover:text-accent hover:cursor-pointer">
                  문의하기.
                </motion.li>
              </Link>
              <Link href="/portfolio">
                <motion.li className="py-10 px-24 hover:text-accent hover:cursor-pointer">
                  포트폴리오 보기.
                </motion.li>
              </Link>
            </motion.ul>
          </motion.nav>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};

const AboutUsClient = () => {
  return (
    <main>
      <div className="hidden md:block">
        <Nav />
        <Header />
        <div className="relative z-10 w-full overflow-x-clip ">
          <MainImg />
          <SlidingImage />
          <BoxAndSlogan />
          <Features />
          <MoreFeatures />
        </div>
      </div>
      <div className="block md:hidden">
        <Navbar />
        <section className="pt-10 text-black">
          <div className="flex flex-col items-center">
            <div className="pt-4 h-auto">
              <div className=" text-3xl font-extrabold leading-snug pb-2">
                <h2>조형물 제작,</h2>
                <div>
                  <span className="text-accent text-bold">위브먼트</span>가
                  있습니다
                </div>
                <div className="border-b w-[200px] border-black mt-4" />
              </div>
              <div className=" font-bold pb-4">감각적인 제조, 위브먼트</div>
            </div>
          </div>
        </section>
        <section className="p-4 md:p-20 lg:p-40">
          <div className="flex flex-col">
            <div className=" relative w-full aspect-video">
              <Image
                src="/aboutus/img1.webp"
                fill
                alt="위브먼트 조형물 사진"
                objectFit="cover"
              />
            </div>
            <p className="pt-2 text-neutral-500">
              크기도, 목적도, 소재도 제한이 없습니다
            </p>

            <p className=" text-neutral-500">
              예산과 일정, 목적에 알맞은 예술적인 결과를 만들어갑니다
            </p>
          </div>
        </section>
        <MoreFeatures />
      </div>

      <Footer />
    </main>
  );
};

export default AboutUsClient;
