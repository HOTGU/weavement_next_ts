"use client";

import React from "react";
import { RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <RingLoader size={80} color="#A6192E" />
    </div>
  );
};

export default Loader;
