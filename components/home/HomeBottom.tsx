import React from "react";

import Container from "../Container";
import AnimateText from "../framer/AnimateText";
import ScaleBtn from "../framer/ScaleBtn";

const HomeBottom = () => {
  return (
    <Container>
      <div className="flex flex-col justify-center items-center">
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl">
          감각적인 제조업체
        </div>
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-racing">
          <AnimateText text="WEAVEMENT" />
        </div>
        <ScaleBtn text="문의하기" isWhite />
      </div>
    </Container>
  );
};

export default HomeBottom;
