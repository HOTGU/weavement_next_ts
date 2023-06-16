"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MdAdminPanelSettings } from "react-icons/md";

import { currentUserProps } from "@/types";
import Container from "../Container";
import Logo from "./Logo";
import Menu from "./Menu";
import SliderMenu from "./SliderMenu";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ currentUser }: currentUserProps) => {
  const pathname = usePathname();
  const [isSlider, setIsSlider] = useState(false);

  useEffect(() => {
    setIsSlider(false);
  }, [pathname]);

  const isHome = Boolean(pathname === "/");

  return (
    <div
      className={`w-full h-16 border-b z-10 fixed shadow-sm transition
      ${
        isHome
          ? isSlider
            ? "text-black bg-white"
            : "text-white"
          : "text-black bg-white"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-full gap-3 md:gap-0 z-10">
          <div className={` h-full flex items-center justify-center`}>
            <Link
              href="/"
              className={`flex items-center h-full ${!isHome && "w-full"}`}
            >
              <Logo
                src={
                  isHome
                    ? isSlider
                      ? "/red_logo.webp"
                      : "/white_logo.webp"
                    : "/red_logo.webp"
                }
              />
            </Link>
          </div>
          <div className="block sm:hidden">
            <div onClick={() => setIsSlider(!isSlider)}>
              {isSlider ? <FaTimes size={25} /> : <FaBars size={25} />}
            </div>
            <SliderMenu show={isSlider} />
          </div>
          <div className="hidden sm:block">
            <Menu />
          </div>
        </div>
        {currentUser && (
          <Link
            href="/admin"
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
