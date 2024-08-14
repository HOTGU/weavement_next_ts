import RacingFont from "@/components/RacingFont";
import React from "react";

const ContactInfo = () => {
  return (
    <div className="hidden flex-1 md:flex flex-col md:text-center md:gap-4 lg:gap-6 h-full">
      <h2 className="md:text-6xl lg:text-7xl xl:text-8xl font-racing font-semibold">
        <RacingFont>Contact</RacingFont>
      </h2>
      <h3 className=" font-semibold md:text-xs lg:text-sm xl:text-base">
        감각적인 제조가 필요하신가요? <br />
        컨텐츠의 크기도, 목적도, 소재도 제약이 없습니다.
        <br />
        편안한 마음으로 문의해주세요!
      </h3>
    </div>
  );
};

export default ContactInfo;
