"use client";

import React, { useState } from "react";

type Option = { value: string; label: string };

interface RadioGroupProps {
  name: string;
  label: string;
  options: Option[];
  defaultValue?: string;
  required?: boolean;
  className?: string; // 바깥 래퍼 스타일
  buttonClassName?: string; // 버튼 개별 스타일
}

const Radio: React.FC<RadioGroupProps> = ({
  name,
  label,
  options,
  defaultValue,
  required,
  className = "",
  buttonClassName = "",
}) => {
  const [selected, setSelected] = useState<string | undefined>(defaultValue);

  return (
    <div className={`flex flex-col gap-2 pt-10 relative ${className}`}>
      {/* 폼 제출용 hidden input */}
      <input
        className=" opacity-0 h-[1px] absolute left-0 bottom-0"
        name={name}
        value={selected ?? ""}
        required={required}
      />

      {label && <span className="text-lg text-stone-400">{label}</span>}

      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => setSelected(opt.value)}
              className={`px-6 py-2 font-medium transition rounded-full 
                ${
                  isSelected
                    ? "bg-white text-black"
                    : "border border-stone-600 bg-black text-stone-400"
                } 
                ${buttonClassName}`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Radio;
