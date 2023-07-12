"use client";

import React from "react";
import { motion } from "framer-motion";

interface ScaleBtnProps {
  text: string;
  isWhite?: boolean;
}

const ScaleBtn = ({ text, isWhite = false }: ScaleBtnProps) => {
  return (
    <div>
      <motion.div
        viewport={{ once: true }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.5, type: "tween" },
        }}
        className={`px-2 sm:px-3 md:px-4 lg:px-6 py-1 md:py-2 mt-1 sm:mt-2 md:mt-3 lg:mt-4 text-base md:tex-lg lg:text-xl rounded-full cursor-pointer ${
          isWhite ? "bg-white text-accent" : "bg-accent text-white"
        } hover:opacity-70 transition `}
      >
        {text}
      </motion.div>
    </div>
  );
};

export default ScaleBtn;
