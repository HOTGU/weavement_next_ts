"use client";

import React, { useRef } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  useController,
} from "react-hook-form";

interface InputProps {
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  errors: FieldErrors;
  formatterPhone?: boolean;
  control?: Control<FieldValues>;
  name: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  disabled,
  required,
  errors,
  control,
  name,
  formatterPhone,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { field } = useController({
    name,
    control,
    rules: { required },
  });

  return (
    <div className="w-full relative">
      <input
        disabled={disabled}
        name={name}
        ref={inputRef}
        value={field.value || ""}
        onChange={
          formatterPhone
            ? (e) => {
                const convertValue = e.target.value
                  .slice(0, 13)
                  .replace(/[^0-9]/g, "")
                  .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

                field.onChange(convertValue);
              }
            : field.onChange
        }
        placeholder=" "
        type={type}
        className={`peer w-full p-4 z-10 bg-white font-light border focus:border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 ${
          errors[name]
            ? "border-rose-300 focus:border-rose-500"
            : " border-neutral-300 focus:border-black"
        }`}
      />
      <label
        htmlFor={name}
        onClick={() => inputRef.current?.focus()}
        className={`absolute text-md duration-150 transform top-0 -translate-y-1/2 scale-75 z-[0] bg-white origin-[0] left-5 hover:cursor-text peer-placeholder-shown:scale-100 peer-placeholder-shown:top-4 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-white ${
          errors[name] ? "text-rose-500" : "text-zinc-400 peer-focus:text-black"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
