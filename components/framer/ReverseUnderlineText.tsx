"use client";

import React from "react";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { MdSubdirectoryArrowRight } from "react-icons/md";

const ReverseUnderlineText = ({
  href,
  label,
  size = "md",
  color = "black",
}: {
  href: string;
  label: string;
  size?: "lg" | "md" | "sm";
  color?: "black" | "white";
}) => {
  const controls = useAnimation();
  const isAnimating = React.useRef(false);

  const triggerAnimation = async () => {
    if (isAnimating.current) return; // 애니메이션 중이면 재실행 방지
    isAnimating.current = true;

    // 사라지기 (왼 → 오)
    await controls.start({
      scaleX: 0,
      transformOrigin: "right",
      transition: { duration: 0.4, ease: "easeInOut" },
    });

    // 다시 생기기 (왼 → 오)
    await controls.start({
      scaleX: 1,
      transformOrigin: "left",
      transition: { duration: 0.4, delay: 0.4, ease: "easeInOut" },
    });

    isAnimating.current = false;
  };

  const emojiSize = size === "lg" ? 30 : size === "md" ? 24 : 20;
  const fontSize =
    size === "lg" ? "text-4xl" : size === "md" ? "text-xl" : "text-lg";

  return (
    <div className="inline-block relative" onMouseEnter={triggerAnimation}>
      <Link href={href} className={`relative z-10 text-${color} font-semibold`}>
        <div className="flex gap-2 items-center justify-center">
          <MdSubdirectoryArrowRight size={emojiSize} />
          <div className={`${fontSize}`}>{label}</div>
        </div>

        {/* 애니메이션 줄 */}
        <motion.span
          className={`absolute -bottom-1 left-0 w-full h-[1px] bg-${color} pointer-events-none`}
          initial={{ scaleX: 1, transformOrigin: "left" }}
          animate={controls}
        />
      </Link>
    </div>
  );
};

export default ReverseUnderlineText;
