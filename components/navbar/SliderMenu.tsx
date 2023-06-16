"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Container from "../Container";

interface SliderMenuProps {
  show: boolean;
}

const SliderMenu = ({ show }: SliderMenuProps) => {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`absolute w-full right-0 top-16 bg-white transform duration-300 ${
          show
            ? " translate-y-0 placeholder-opacity-100 z-50"
            : "-translate-y-full opacity-0 z-[-10]"
        }`}
      >
        <Container>
          <div className="flex flex-col w-full h-full text-zinc-600">
            <Link
              href="/contact"
              className={`h-full flex items-center py-3 ${
                pathname === "/contact" && "text-accent "
              }`}
            >
              문의하기
            </Link>
            <Link
              href="/portfolio"
              className={`h-full flex items-center py-3 ${
                pathname === "/portfolio" && "text-accent"
              }`}
            >
              포트폴리오
            </Link>
            <Link href="/" className="h-full py-3 flex items-center">
              전문가 칼럼
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SliderMenu;
