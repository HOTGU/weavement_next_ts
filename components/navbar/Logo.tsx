"use client";

import Image from "next/legacy/image";
import React from "react";

interface LogoProps {
  src: string;
}

const Logo = ({ src }: LogoProps) => {
  return (
    <Image alt="logo" src={src} width="70" height="50" objectFit="contain" />
  );
};

export default Logo;
