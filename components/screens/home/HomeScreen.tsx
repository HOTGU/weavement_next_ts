"use client";

import React, { useEffect, useState } from "react";

import Container from "@/components/Container";

import HiddenUpText from "@/components/framer/HiddenUpText";

const HomeScreen = () => {
  return (
    <div className="w-full h-[60vh] md:h-[80vh] lg:h-screen relative overflow-hidden">
      <div className="absolute bottom-0 left-0 z-10">
        <Container>
          <div className="flex flex-col gap-4 font-ibm py-8 font-[400]">
            <HiddenUpText
              children={"감감적인 제조"}
              delay={1}
              className="text-8xl font-pretendard"
            />
            <HiddenUpText
              children={"WEAVEMENT"}
              delay={1}
              className="text-8xl font-racing"
            />
          </div>
        </Container>
      </div>
      <div className="w-screen aspect-video h-[60vh] md:h-[80vh] lg:h-screen relative">
        <video src={"/imgs/home/메인페이지영상.mp4"} loop muted autoPlay />
      </div>
    </div>
  );
};

export default HomeScreen;
