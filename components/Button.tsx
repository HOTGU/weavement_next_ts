"use client";

import React from "react";

interface ButtonProps {
  label?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
}

const Button = ({ label, onClick, disabled, outline, small }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${
        outline
          ? "bg-white border-black text-black"
          : " bg-accent border-accent text-white"
      } ${
        small
          ? "py-1 text-sm font-light border"
          : "py-3 text-md font-semibold border-2"
      }`}
    >
      {label}
    </button>
  );
};

export default Button;
