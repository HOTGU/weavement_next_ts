"use client";

import React, { useRef } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  useController,
} from "react-hook-form";
import { FaCheck } from "react-icons/fa";

interface InputProps {
  label: string;
  disabled?: boolean;
  required?: boolean;
  errors: FieldErrors;
  control?: Control<FieldValues>;
  name: string;
}

const CheckBox: React.FC<InputProps> = ({
  label,
  disabled,
  required,
  errors,
  control,
  name,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { field } = useController({
    name,
    control,
    rules: { required },
  });

  return (
    <div className="w-full relative">
      <label
        htmlFor={name}
        onClick={() => inputRef.current?.click()}
        className="w-fit"
      >
        <div
          className={`flex items-center justify-center gap-2 text-center cursor-pointer p-4 z-10 font-light border focus:border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 ${
            field.value ? "bg-teal-600 text-white" : "bg-white"
          }`}
        >
          <span>{label}</span>
          {field.value && <FaCheck />}
        </div>
      </label>
      {field.value && (
        <input
          disabled={disabled}
          hidden
          name={name}
          ref={inputRef}
          checked={field.value}
          value={field.value ?? ""}
          onChange={field.onChange}
          type="checkbox"
        />
      )}
    </div>
  );
};

export default CheckBox;
