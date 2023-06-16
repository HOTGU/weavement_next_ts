"use client";

import React, { useCallback, useMemo, useState } from "react";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";

interface SliderProps {
  images: string[];
  full?: boolean;
}

const Slider = ({ images, full }: SliderProps) => {
  const [showIndex, setShowIndex] = useState(1);

  const totalImages = useMemo(() => {
    return images.length;
  }, [images]);

  const increase = () => {
    if (showIndex === totalImages) {
      setShowIndex(1);
      return;
    }
    return setShowIndex(showIndex + 1);
  };

  const descrease = () => {
    if (showIndex === 1) {
      setShowIndex(totalImages);
      return;
    }

    return setShowIndex(showIndex - 1);
  };

  return (
    <div
      className={`${
        full ? "w-screen h-screen" : "w-[600px] h-[80vh]"
      } relative flex items-center justify-center`}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt="contact_img"
          className={`object-contain h-full absolute transition ${
            showIndex === index + 1 ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div
        onClick={descrease}
        className="absolute text-white top-1/2 -translate-y-1/2 -left-10 cursor-pointer hover:opacity-70 transition"
      >
        <AiFillLeftCircle size={30} />
      </div>
      <div
        onClick={increase}
        className="absolute text-white top-1/2 -translate-y-1/2 -right-10 cursor-pointer hover:opacity-70 transition"
      >
        <AiFillRightCircle size={30} />
      </div>
      <div className="absolute -bottom-10 right-1/2 translate-x-1/2 bg-neutral-800/60 text-white px-2 rounded text-xl">{`${showIndex} / ${totalImages}`}</div>
    </div>
  );
};

export default Slider;
