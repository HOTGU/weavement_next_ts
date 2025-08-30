import React from "react";

const PaddingSection = ({
  type = "md",
}: {
  type: "xl" | "lg" | "md" | "sm";
}) => {
  if (type === "xl") return <div className="pt-60" />;
  if (type === "lg") return <div className="pt-48" />;
  if (type === "md") return <div className="pt-24" />;
  if (type === "sm") return <div className="pt-12" />;

  return <div />;
};

export default PaddingSection;
