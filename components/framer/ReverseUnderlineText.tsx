"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { MdSubdirectoryArrowRight } from "react-icons/md";

type Props = {
  label: string;
  size?: "lg" | "md" | "sm";
  color?: "black" | "white";
};

const ReverseUnderlineText: React.FC<Props> = ({
  label,
  size = "md",
  color = "black",
}) => {
  const controls = useAnimation();
  const isAnimating = useRef(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const triggerAnimation = async () => {
    if (!mounted.current || isAnimating.current) return;
    isAnimating.current = true;

    try {
      // 1️⃣ 밑줄 오른쪽으로 사라짐
      await controls.start({
        scaleX: 0,
        transformOrigin: "right",
        transition: { duration: 0.4, ease: "easeInOut" },
      });

      // 2️⃣ 왼쪽에서부터 밑줄 다시 나타남
      await controls.start({
        scaleX: 1,
        transformOrigin: "left",
        transition: { duration: 0.4, ease: "easeInOut" },
      });
    } finally {
      // 언제나 애니메이션 종료 후 상태 초기화
      isAnimating.current = false;
    }
  };

  const emojiSize = size === "lg" ? 30 : size === "md" ? 24 : 20;
  const fontSize =
    size === "lg" ? "text-4xl" : size === "md" ? "text-2xl" : "text-lg";
  const textColor = color === "white" ? "text-white" : "text-black";
  const bgColor = color === "white" ? "bg-white" : "bg-black";

  return (
    <div
      className="inline-block relative cursor-pointer"
      onMouseEnter={triggerAnimation}
    >
      <div
        className={`flex gap-2 items-center justify-center ${textColor} font-bold`}
      >
        <MdSubdirectoryArrowRight size={emojiSize} />
        <div className={fontSize}>{label}</div>
      </div>

      {/* 밑줄 */}
      <motion.span
        className={`absolute -bottom-1 left-0 w-full h-[1px] ${bgColor} pointer-events-none`}
        initial={{ scaleX: 1, transformOrigin: "left" }}
        animate={controls}
      />
    </div>
  );
};

export default ReverseUnderlineText;
