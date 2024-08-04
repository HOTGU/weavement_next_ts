"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = () => {
  const pathname = usePathname();

  return (
    <ul>
      <div className="block lg:hidden"></div>
      <div className="hidden lg:flex gap-6 font-bold h-full">
        <li className="list-none">
          <Link
            href="/aboutus"
            className={`h-full flex items-center ${
              pathname === "/aboutus" && "text-accent "
            }`}
            passHref
          >
            회사소개
          </Link>
        </li>
        <li className="list-none">
          <Link
            href="/contact"
            className={`h-full flex items-center ${
              pathname === "/contact" && "text-accent "
            }`}
            passHref
          >
            문의하기
          </Link>
        </li>
        <li className="list-none">
          <Link
            href="/portfolio"
            className={`h-full flex items-center ${
              pathname === "/portfolio" && "text-accent"
            }`}
            passHref
          >
            포트폴리오
          </Link>
        </li>
      </div>
    </ul>
  );
};

export default Menu;
