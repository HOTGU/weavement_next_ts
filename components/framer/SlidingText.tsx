"use client";

import React from "react";
import { motion } from "framer-motion";

interface SlidingTextProps {
  text: string;
}

const SlidingText = ({ text }: SlidingTextProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false }}
      className="text-6xl mb-12 font-racing"
    >
      {text}
    </motion.div>
  );
};

export default SlidingText;
