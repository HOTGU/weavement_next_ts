import React from "react";

const PaddingSection = ({
  size = "lg",
}: {
  size?: "xl" | "lg" | "md" | "sm";
}) => {
  const spacing = {
    xl: "pt-80",
    sm: "pt-20",
    md: "pt-40",
    lg: "pt-60",
  };

  return <div className={spacing[size]} />;
};

export default PaddingSection;
