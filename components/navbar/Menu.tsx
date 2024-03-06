"use client";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="block sm:hidden"></div>
      <div className="hidden sm:flex gap-6 font-bold h-full">
        <Link
          href="/contact"
          className={`h-full flex items-center ${
            pathname === "/contact" && "text-accent "
          }`}
          passHref
        >
          문의하기
        </Link>
        <Link
          href="/portfolio"
          className={`h-full flex items-center ${
            pathname === "/portfolio" && "text-accent"
          }`}
          passHref
        >
          포트폴리오
        </Link>
        <Link
          href="https://blog.naver.com/PostList.naver?blogId=weavement&from=postList&categoryNo=6"
          className="h-full flex items-center"
          target="_blank"
          passHref
        >
          전문가 칼럼
        </Link>
      </div>
    </>
  );
};

export default Menu;
