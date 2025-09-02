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
import HiddenUpText from "../framer/HiddenUpText";
import UnderlineText from "../framer/UnderlineText";

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isTop, setIsTop] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  useMotionValueEvent(scrollY, "change", (scroll) => {
    if (scroll < 50) {
      setIsTop(true);
      setIsOpen(true);
    } else {
      setIsTop(false);
      setIsOpen(false);
    }
  });

  return (
    <div className="fixed pt-8 w-full mix-blend-difference pointer-events-none z-10">
      <Container>
        <div className="h-full flex items-start justify-between">
          <div className="w-max overflow-visible">
            <HiddenUpText>
              <div className="font-racing text-6xl w-max tracking-[-12px] pr-4 text-white mix-blend-difference pointer-events-auto whitespace-nowrap">
                <Link href="/">WM</Link>
              </div>
            </HiddenUpText>
          </div>

          <div className="relative p-2 translate-x-2 w-auto h-auto font-ibm font-[300] text-right pointer-events-auto">
            <div
              className={`${
                isOpen
                  ? "opacity-0  -translate-y-6"
                  : "opacity-100  translate-y-2"
              } cursor-pointer transition-all duration-500 ease-in-out text-white mix-blend-difference font-racing`}
              onMouseEnter={() => setIsOpen(true)}
            >
              Menu
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, x: "16px", y: 0 }}
                  animate={{ opacity: 1, y: -40 }}
                  exit={{ opacity: 0, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  className="flex flex-col p-4 font-racing"
                  onMouseLeave={() => {
                    if (isTop) {
                      setIsOpen(true);
                      return;
                    }
                    setIsOpen(false);
                  }}
                >
                  <UnderlineText href="/" label="Home" />
                  <UnderlineText href="/contact" label="Contact" />
                  <UnderlineText href="/portfolio" label="Portfolio" />
                  <UnderlineText href="/aboutus" label="About" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
