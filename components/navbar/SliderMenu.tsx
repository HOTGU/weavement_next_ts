"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Container from "../Container";

const SliderMenu = ({ close }: { close: () => void }) => {
  const pathname = usePathname();

  return (
    <div
      className={`absolute w-full h-screen right-0 top-10 bg-black/70`}
      onClick={close}
    >
      <div className="w-full h-fit bg-white text-zinc-600">
        <Container>
          <Link
            href="/aboutus"
            className={`h-full w-full flex items-center py-2 justify-end ${
              pathname === "/aboutus" && "text-accent "
            }`}
            passHref
          >
            회사소개
          </Link>
          <Link
            href="/contact"
            className={`h-full w-full flex items-center py-2 justify-end ${
              pathname === "/contact" && "text-accent "
            }`}
            passHref
          >
            문의하기
          </Link>
          <Link
            href="/portfolio"
            className={`h-full flex items-center py-2 justify-end ${
              pathname === "/portfolio" && "text-accent"
            }`}
            passHref
          >
            포트폴리오
          </Link>
        </Container>
      </div>
    </div>
  );
};

export default SliderMenu;
