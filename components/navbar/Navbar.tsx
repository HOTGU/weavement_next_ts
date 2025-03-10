"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Container from "../Container";
import { is } from "date-fns/locale";

const Underline = ({ href, label }: { href: string; label: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  const underlineVariants = {
    initial: { width: "0%", left: "0%" },
    hover: {
      width: "100%",
      left: "0%",
      transition: { duration: 0.3, ease: [0.61, 0, 1, 1] },
    },
    exit: {
      width: "0%",
      left: "100%",
      transition: { duration: 0.6, ease: "easeInOut" },
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

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isTop, setIsTop] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  useMotionValueEvent(scrollY, "change", (scroll) => {
    if (scroll < 200) {
      setIsTop(true);
      setIsOpen(true);
    } else {
      setIsTop(false);
      setIsOpen(false);
    }
  });

  return (
    <div className="fixed pt-8 w-full z-[99] mix-blend-difference">
      <Container>
        <div className="h-full flex items-start justify-between">
          <div className="flex-1">
            <div className="font-racing text-6xl tracking-[-12px] text-white mix-blend-difference">
              <Link href="/">WM</Link>
            </div>
          </div>
          <div className="relative w-auto h-10 font-ibm font-[300] text-right">
            <div
              className={`${
                isOpen
                  ? "opacity-0 translate-x-2 -translate-y-6"
                  : "opacity-100 translate-x-2 translate-y-2"
              } cursor-pointer transition-all duration-500 p-2 text-white mix-blend-difference`}
              onMouseEnter={() => setIsOpen(true)}
            >
              Menu
            </div>
            <div
              className={`${
                isOpen
                  ? "translate-x-2 -translate-y-10 opacity-100"
                  : "pointer-events-none translate-x-2 -translate-y-2 opacity-0"
              } transition-all duration-500 flex flex-col p-2`}
              onMouseLeave={() => {
                if (isTop) {
                  setIsOpen(true);
                  return;
                }
                setIsOpen(false);
              }}
            >
              <Underline href="/" label="Home" />
              <Underline href="/contact" label="Contact" />
              <Underline href="/portfolio" label="Portfolio" />
              <Underline href="/aboutus" label="About" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
