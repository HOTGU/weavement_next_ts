import React from "react";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  small?: boolean;
}

const Heading = ({
  title,
  subtitle,
  small = false,
  center = false,
}: HeadingProps) => {
  return (
    <div
      className={`flex flex-col text-zinc-800 ${
        center && "items-center text-center"
      }`}
    >
      <div className={`font-semibold ${small ? "text-xl" : "text-2xl"}`}>
        {title}
      </div>
      <div className={`font-light ${small ? "text-sm" : "font-md"}`}>
        {subtitle}
      </div>
    </div>
  );
};

export default Heading;
