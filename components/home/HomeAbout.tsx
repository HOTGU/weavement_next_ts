"use client";

import React from "react";
import { motion } from "framer-motion";
import { slidingText } from "@/libs/framer";
import AnimateText from "../framer/AnimateText";
import Container from "../Container";

const HomeAbout = () => {
  return (
    <Container>
      <span className="inline-block overflow-hidden leading-relaxed ">
        <motion.div
          viewport={{ once: false }}
          variants={slidingText}
          initial={slidingText.hidden}
          whileInView={slidingText.visible}
          className="text-2xl md:text-3xl lg:text-5xl 2xl:text-7xl space-y-2 md:space-y-4 lg:space-y-6"
        >
          <div>우리는(WE) 고객이</div>
          <div>나아갈 길(AVE.)을 제시하고</div>
          <div>예술적인 결과(MENT)를 만드는</div>
          <div>
            위브먼트{" "}
            <span className=" text-accent">
              <AnimateText text="WEAVEMENT" delay={0.4} />{" "}
            </span>
            입니다.
          </div>
        </motion.div>
      </span>
    </Container>
  );
};

export default HomeAbout;
