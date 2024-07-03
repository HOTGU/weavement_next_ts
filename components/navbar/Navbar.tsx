"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  useMotionValueEvent,
  useScroll,
  motion,
  AnimatePresence,
} from "framer-motion";

import { CurrentUserProps } from "@/types";
import Container from "../Container";
import Logo from "./Logo";
import Menu from "./Menu";
import SliderMenu from "./SliderMenu";
import { sliderNav } from "@/libs/framer";

const Navbar = ({ currentUser }: CurrentUserProps) => {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isSlider, setIsSlider] = useState(false);
  const [isScroll, setIsScroll] = useState(false);

  useMotionValueEvent(scrollY, "change", (scroll) => {
    if (scroll === 0) {
      setIsScroll(false);
    } else {
      setIsScroll(true);
    }
  });

  useEffect(() => {
    setIsSlider(false);
  }, [pathname]);

  const sliderClose = () => setIsSlider(false);

  const isHome = Boolean(pathname === "/");

  return (
    <div
      className={`w-full h-10 md:h-12 lg:h-14 border-b z-20 fixed shadow-sm transition duration-500
      ${
        !isHome || isScroll || isSlider ? "text-black bg-white" : "text-white"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-full gap-3 md:gap-0 z-10">
          <h1 className={` h-full flex items-center justify-center`}>
            <span className="hidden">조형물 제작 위브먼트</span>
            <Link
              href="/"
              className={`flex items-center h-full ${!isHome && "w-full"}`}
              passHref
            >
              <Logo
                src={
                  !isHome || isScroll || isSlider
                    ? "/red_logo.webp"
                    : "/white_logo.webp"
                }
              />
            </Link>
          </h1>
          <div className="block sm:hidden">
            <div onClick={() => setIsSlider(!isSlider)}>
              {isSlider ? <FaTimes size={25} /> : <FaBars size={25} />}
            </div>
            <AnimatePresence>
              {isSlider ? (
                <motion.div
                  variants={sliderNav}
                  initial={sliderNav.hidden}
                  animate={sliderNav.visible}
                  exit={sliderNav.exit}
                >
                  {/* <div className="absolute top-0 left-0 w-screen h-screen bg-red-500"> */}
                  <SliderMenu close={sliderClose} />
                  {/* </div> */}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <div className="hidden sm:block">
            <Menu />
          </div>
        </div>
        {currentUser && currentUser.isAdmin && (
          <Link
            href={{
              pathname:
                currentUser.admin_id === process.env.NEXT_PUBLIC_MASTER_ID
                  ? "/admin"
                  : "/admin/analysis/state",
              query:
                currentUser.admin_id === process.env.NEXT_PUBLIC_MASTER_ID
                  ? {}
                  : { date: "month", year: new Date().getFullYear() },
            }}
            className="fixed bottom-10 right-1/2 translate-x-1/2 flex gap-1 text-black items-center bg-white rounded-full px-4 py-1 shadow-lg cursor hover:scale-105 transition cursor-pointer"
          >
            Admin
            <MdAdminPanelSettings />
          </Link>
        )}
      </Container>
    </div>
  );
};

export default Navbar;
