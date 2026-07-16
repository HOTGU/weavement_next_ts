"use client";

import React from "react";
import { motion } from "framer-motion";
import { slidingText } from "@/libs/framer";
import Container from "../../Container";

const HomeAbout = () => {
  return (
    <Container>
      <h2 className="inline-block overflow-hidden leading-relaxed ">
        <motion.div
          viewport={{ once: true }}
          variants={slidingText}
          initial={slidingText.hidden}
          whileInView={slidingText.visible}
          className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl space-y-2 md:space-y-4 lg:space-y-6"
        >
          <span className="block">우리는 고객에게</span>
          <span className="block">길을 제시하고</span>
          <span className="block">예술적인 결과를 만드는</span>
          <span className="block">
            조형물 제작 전문기업{" "}
            <span className="text-accent font-bold ">위브먼트</span>
            입니다
          </span>
        </motion.div>
      </h2>
    </Container>
  );
};

export default HomeAbout;
