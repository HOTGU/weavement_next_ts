"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="block sm:hidden"></div>
      <ul className="hidden sm:flex gap-6 font-bold h-full">
        <Link
          href="/contact"
          className={`h-full flex items-center ${
            pathname === "/contact" && "text-accent "
          }`}
        >
          문의하기
        </Link>
        <Link
          href="/portfolio"
          className={`h-full flex items-center ${
            pathname === "/portfolio" && "text-accent"
          }`}
        >
          포트폴리오
        </Link>
        <Link href="/" className="h-full flex items-center">
          전문가 칼럼
        </Link>
      </ul>
    </>
  );
};

export default Menu;
