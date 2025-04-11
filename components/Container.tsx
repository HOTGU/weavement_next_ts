import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="max-w-[1440px] h-full mx-auto md:px-8 px-4">{children}</div>
  );
};

export default Container;
