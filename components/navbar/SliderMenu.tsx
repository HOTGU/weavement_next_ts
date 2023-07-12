"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Container from "../Container";

const SliderMenu = () => {
  const pathname = usePathname();

  return (
    <>
      <div className={`absolute w-full right-0 top-9 bg-white`}>
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
