import Image from "next/legacy/image";
import React from "react";

const ImageWithPlaceholder = ({
  image,
  blurData,
}: {
  image: string;
  blurData: string;
}) => {
  return (
    <Image
      src={image}
      objectFit="cover"
      alt="포트폴리오 썸네일"
      layout="fill"
      className="cursor-pointer hover:opacity-70 transition"
      placeholder="blur"
      blurDataURL={blurData}
    />
  );
};

export default ImageWithPlaceholder;
