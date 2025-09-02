import React from "react";
import PaddingSection from "./PaddingSection";
import Container from "../Container";

const Footer = () => {
  return (
    <div className="bg-black border-t border-white">
      <Container>
        <PaddingSection size="sm" />

        <div className="flex items-center">
          <div className="w-[66%]">
            <div className=" font-ibm text-5xl text-white max-w-[30%]">
              weavement weavment
            </div>
          </div>
          <div className="w-[33%] text-stone-400">
            <div> © 2022-2025 Weavement,Co. All rights reserved.</div>
          </div>
        </div>

        <PaddingSection size="md" />

        <div className="flex items-center">
          <div className="w-[66%]">
            <div className=" font-racing text-9xl text-stone-800">
              WEAVEMENT
            </div>
          </div>
          <div className="w-[33%] text-stone-400">
            <div> © 2022-2025 Weavement,Co. All rights reserved.</div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
