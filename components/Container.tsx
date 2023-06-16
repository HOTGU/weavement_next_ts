import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="max-w-[2520px] h-full mx-auto xl:px-20 lg:px-12 md:px-8 px-4">
      {children}
    </div>
  );
};

export default Container;
