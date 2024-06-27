"use client";

import Image from "next/legacy/image";
import React from "react";

interface LogoProps {
  src: string;
}

const Logo = ({ src }: LogoProps) => {
  return (
    <div className="relative h-4/5 aspect-video">
      <Image alt="logo" src={src} objectFit="contain" layout="fill" />
    </div>
  );
};

export default Logo;
