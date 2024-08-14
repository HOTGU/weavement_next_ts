"use client";

import React from "react";
import { motion } from "framer-motion";
import { slidingText } from "@/libs/framer";

interface HomeHeadTextProps {
  text: string;
}

const HomeHeadText = ({ text }: HomeHeadTextProps) => {
  return (
    <motion.div
      variants={slidingText}
      initial={slidingText.hidden}
      whileInView={slidingText.visible}
      viewport={{ once: false }}
      className="text-7xl font-racing"
    >
      {text}
    </motion.div>
  );
};

export default HomeHeadText;
