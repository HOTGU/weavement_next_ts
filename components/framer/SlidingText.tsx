"use client";

import React from "react";
import { motion } from "framer-motion";
import RacingFont from "../RacingFont";

interface SlidingTextProps {
  text: string;
}

const SlidingText = ({ text }: SlidingTextProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8 md:mb-10 lg:mb-12 `}
    >
      <RacingFont>{text}</RacingFont>
    </motion.div>
  );
};

export default SlidingText;
