"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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

const Column1 = () => {
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
    fadeOutImageEnd: 0.95,
  };

  const scale = useTransform(
    scrollYProgress,
    [
      animationOffset.init,
      animationOffset.fadeInImageEnd,
      animationOffset.centerMoveImageEnd,
      animationOffset.fadeOutImageEnd,
    ],
    [2.5, 1, 1, 0.2]
  );
  const x = useTransform(
    scrollYProgress,
    [
      animationOffset.init,
      animationOffset.fadeInImageEnd,
      animationOffset.showTextOne,
      animationOffset.fadeOutTextOneEnd,
      animationOffset.moveImageEnd,
      animationOffset.showTextTwo,
      animationOffset.fadeOutTextTwoEnd,
      animationOffset.centerMoveImageEnd,
    ],
    ["0", "0", "0", "5vw", "-50vw", "-50vw", "-55vw", "-25vw"]
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
      animationOffset.init,
      animationOffset.fadeInImageEnd,
      animationOffset.fadeInTextOneEnd,
      animationOffset.showTextOne,
      animationOffset.fadeOutTextOneEnd,
      1,
    ],
    [0, 0, 1, 1, 0, 0]
  );
  const textY = useTransform(
    scrollYProgress,
    [
      animationOffset.init,
      animationOffset.fadeInImageEnd,
      animationOffset.fadeInTextOneEnd,
      animationOffset.showTextOne,
      animationOffset.fadeOutTextOneEnd,
      1,
    ],
    ["0", "0", "-50%", "-50%", "-100%", "-100%"]
  );

  const textTwoOpacity = useTransform(
    scrollYProgress,
    [
      animationOffset.init,
      animationOffset.moveImageEnd,
      animationOffset.fadeInTextTwoEnd,
      animationOffset.showTextTwo,
      animationOffset.fadeOutTextTwoEnd,
      1,
    ],
    [0, 0, 1, 1, 0, 0]
  );
  const textTwoY = useTransform(
    scrollYProgress,
    [
      animationOffset.init,
      animationOffset.moveImageEnd,
      animationOffset.fadeInTextTwoEnd,
      animationOffset.showTextTwo,
      animationOffset.fadeOutTextTwoEnd,
      1,
    ],
    ["0", "0", "-50%", "-50%", "-100%", "-100%"]
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

const AboutUsClient = () => {
  return (
    <main>
      <Header />
      <div className="relative z-10 w-full overflow-x-clip">
        <MainImg />
        <Column1 />
      </div>
    </main>
  );
};

export default AboutUsClient;
