"use client";

import React from "react";
import { RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <RingLoader color="#A6192E" size={80} />
    </div>
  );
};

export default Loader;
