import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import { FaN } from "react-icons/fa6";
import { CiMail, CiPhone } from "react-icons/ci";
import { FaInstagram, FaYoutube } from "react-icons/fa";

import Container from "./Container";

const Footer = () => {
  return (
    <div className="border-t">
      <Container>
        <div className="py-12 ">
          <div className="hidden md:block">
            <Image
              alt="위브먼트로고"
              src="/red_logo.webp"
              width="80"
              height="51"
            />
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-0 md:mt-6 ">
            <div className="text-neutral-500 text-center md:text-start text-xs md:text-base">
              <div>영업시간 10:00 ~ 19:00 | 토,일 휴무</div>
              <div>경기 고양시 덕양구 향동로 201 GL메트로시티향동, A1410호</div>
              <div>사업자등록번호 313-47-00901</div>
            </div>
            <div className="mb-4 md:mb-0">
              <div className="space-y-0 sm:space-y-1 md:space-y-2 text-lg md:text-xl">
                <div className="flex items-center gap-2">
                  <CiMail />
                  <span>contact@weavement.co.kr</span>
                </div>
                <div className="flex items-center gap-2">
                  <CiPhone />
                  <span>010 . 2770 . 7181</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-4 sm:mt-6 text-xs md:text-base">
            <div className="flex items-center justify-center gap-2 mb-2 md:mb-4">
              <Link
                href="https://blog.naver.com/weavement"
                target="_blank"
                className="w-9 h-9 md:w-12 md:h-12 flex rounded justify-center items-center border"
                aria-label="위브먼트의 네이버 블로그"
              >
                <FaN size={20} color="#02C75A" />
              </Link>
              <Link
                href="https://www.instagram.com/weavement"
                target="_blank"
                aria-label="위브먼트의 인스타그램"
                className="w-9 h-9 md:w-12 md:h-12 flex rounded justify-center items-center border"
              >
                <FaInstagram size={25} color="#F56040" />
              </Link>
              <Link
                href="https://www.youtube.com/@WEAVEMENT"
                target="_blank"
                aria-label="위브먼트의 유튜브"
                className="w-9 h-9 md:w-12 md:h-12 flex rounded justify-center items-center border"
              >
                <FaYoutube size={26} color="rgb(255,0,0)" />
              </Link>
            </div>

            <span className="text-neutral-400">
              © 2022-2025 WEAVEMENT CO.LTD. ALL RIGHTS RESERVED.
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
