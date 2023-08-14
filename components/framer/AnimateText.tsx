"use client";

import React from "react";
import { motion } from "framer-motion";
import RacingFont from "../RacingFont";

interface AnimateTextProps {
  text: string;
  delay?: number;
}

const AnimateText = ({ text, delay = 0 }: AnimateTextProps) => {
  const textArr = text.split("");

  return (
    <span className={` h-fit  overflow-hidden `}>
      {textArr.map((item, index) => (
        <motion.span
          viewport={{ once: true }}
          key={index}
          initial={{ opacity: 0, y: "200%" }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { delay: delay + index * 0.15 },
          }}
        >
          <RacingFont>{item}</RacingFont>
        </motion.span>
      ))}
    </span>
  );
};

export default AnimateText;
