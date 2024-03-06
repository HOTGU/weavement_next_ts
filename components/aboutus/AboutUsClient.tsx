"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useAnimationControls,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { slidingText } from "@/libs/framer";

const anim = {
  initial: { width: 0 },

  open: {
    width: "300px",
    transition: { duration: 1.5, ease: [0.23, 1, 0.32, 1] },
  },

  closed: { width: 0 },
};

const AboutUsClient = () => {
  const control = useAnimationControls();
  const ref = useRef(null);
  const inView = useInView(ref);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value === 0.3) {
      control.start("visible");
    }
  });

  const scale = useTransform(scrollYProgress, [0, 0.3], ["0", "1"]);
  const y = useTransform(scrollYProgress, [0.4, 0.6], ["100", "0"]);
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.6], ["0", "1"]);

  return (
    <div className="relative" ref={ref}>
      <div className="ml-[25vw] pt-[100px] h-auto" ref={ref}>
        <div className=" text-6xl font-extrabold leading-snug pb-6">
          <motion.div>감각적인</motion.div>
          <div>조형물 제작,</div>
          <div>위브먼트가 있습니다</div>
          <div className="border-b w-[390px] border-black mt-12" />
        </div>
        <div className="text-lg font-bold pb-12">감각적인 제조, 위브먼트</div>
      </div>
      <motion.div
        style={{ scale }}
        className="bg-red-200 w-screen h-screen relative"
      >
        <span className="inline-block overflow-hidden leading-relaxed ">
          <motion.div
            viewport={{ once: true }}
            variants={slidingText}
            initial={slidingText.hidden}
            whileInView={slidingText.visible}
            className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl space-y-2 md:space-y-4 lg:space-y-6"
          >
            <div>우리는 고객에게</div>
            <div>길을 제시하고</div>
            <div>예술적인 결과를 만드는</div>
            <div>
              감각적인 제조,{" "}
              <span className="text-accent font-bold">위브먼트</span>입니다
            </div>
          </motion.div>
        </span>
      </motion.div>
    </div>
  );
};

export default AboutUsClient;
