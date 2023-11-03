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
            {/* <span className=" text-accent whitespace-pre-line break-words">
              <AnimateText text="WEAVEMENT" delay={0.3} />{" "}
            </span>
            입니다. */}
          </div>
        </motion.div>
      </span>
    </Container>
  );
};

export default HomeAbout;
