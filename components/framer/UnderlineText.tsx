"use clent";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const UnderlineText = ({ href, label }: { href: string; label: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  const underlineVariants = {
    initial: { width: "0%", left: "0%" },
    hover: {
      width: "100%",
      left: "0%",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      width: "0%",
      left: "100%",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  return (
    <div
      className="cursor-pointer inline-block relative py-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={href}
        className="relative z-10 mix-blend-difference text-white"
      >
        <span>{label}</span>
        <AnimatePresence mode="wait">
          {isHovered && (
            <motion.div
              key="underline"
              className="absolute bottom-0 bg-white h-[1px] mix-blend-difference"
              style={{ transformOrigin: "left" }}
              variants={underlineVariants}
              initial="initial"
              animate="hover"
              exit="exit"
            />
          )}
        </AnimatePresence>
      </Link>
    </div>
  );
};

export default UnderlineText;
