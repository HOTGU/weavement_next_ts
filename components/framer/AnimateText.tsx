"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimateTextProps {
  text: string;
  delay?: number;
}

const AnimateText = ({ text, delay = 0 }: AnimateTextProps) => {
  const textArr = text.split("");

  return (
    <span className=" h-fit font-racing overflow-hidden">
      {textArr.map((item, index) => (
        <motion.span
          viewport={{ once: false }}
          key={index}
          initial={{ opacity: 0, y: "200%" }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: delay + index * 0.15 },
          }}
        >
          {item}
        </motion.span>
      ))}
    </span>
  );
};

export default AnimateText;
