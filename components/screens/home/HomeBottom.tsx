import Link from "next/link";
import React from "react";

import Container from "../../Container";
import AnimateText from "../../framer/AnimateText";
import ScaleBtn from "../../framer/ScaleBtn";

const HomeBottom = () => {
  return (
    <Container>
      <div className="flex flex-col justify-center items-center">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
          조형물 제작 전문기업
        </p>

        <h2
          id="contact-title"
          className="
      text-4xl sm:text-5xl md:text-6xl
      lg:text-7xl font-racing
    "
        >
          <AnimateText text="WEAVEMENT" />
        </h2>

        <Link href="/contact">
          <ScaleBtn text="문의하기" isWhite />
        </Link>
      </div>
    </Container>
  );
};

export default HomeBottom;
