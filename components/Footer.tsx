import React from "react";
import { CiMail, CiPhone } from "react-icons/ci";
import Container from "./Container";
import Image from "next/legacy/image";

const Footer = () => {
  return (
    <div className="border-t">
      <Container>
        <div className="py-12 ">
          <div className="hidden md:block">
            <Image src="/red_logo.webp" width="80" height="51" />
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-0 md:mt-6 ">
            <div className="text-neutral-500 text-center md:text-start text-xs md:text-base">
              <div>영업시간 09:00 ~ 18:00 | 토,일 휴무</div>
              <div>서울시 강서구 양천로 738 한강G트리타워, 711호</div>
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
                  <span>010 . 6803 . 7181</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center text-neutral-400 mt-4 sm:mt-6 md:mt-8 lg:mt-12 text-xs md:text-base">
            © 2022 WEAVEMENT CO.LTD. ALL RIGHTS RESERVED.
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
