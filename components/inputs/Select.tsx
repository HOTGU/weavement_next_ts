"use client";

import { OptionType } from "@/actions/getSelectOptions";
import React, { useState } from "react";
import ReactSelect from "react-select";
import {
  Control,
  FieldErrors,
  FieldValues,
  useController,
} from "react-hook-form";

interface SelectProps {
  placeholder: string;
  options: OptionType[];
  label: string;
  name: string;
  errors: FieldErrors;
  control?: Control<FieldValues>;
  required?: boolean;
  isMulti?: boolean;
  disabled?: boolean;
  isClearable?: boolean;
}

const Select = ({
  placeholder,
  options,
  label,
  name,
  errors,
  control,
  required,
  isMulti,
  disabled,
  isClearable = true,
}: SelectProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const { field } = useController({
    name,
    control,
    rules: { required },
  });

  return (
    <div
      className={`relative w-full rounded-md ${
        errors[name] && "border border-red-500"
      }`}
    >
      <ReactSelect
        options={options}
        classNames={{
          control: () => "p-2 border-1",
          input: () => "text-lg border-1",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
        placeholder={placeholder}
        value={
          isMulti
            ? options.filter((option) => field.value?.includes(option.value))
            : options.find((option) => option.value === field.value)
        }
        onChange={(option: any, action) => {
          if (action.action === "clear") {
            isMulti ? field.onChange([]) : field.onChange(null);
            return;
          }
          if (isMulti) {
            const values = option.map((item: any) => item.value);
            field.onChange(values);
          } else {
            field.onChange(option?.value);
          }
        }}
        onBlur={() => setIsFocus(false)}
        onFocus={() => setIsFocus(true)}
        isClearable={isClearable}
        isMulti={isMulti}
        isDisabled={disabled}
      />
      <label
        className={`absolute origin-[0] top-0 transition peer-focus:text-red-500 text-md -translate-y-1/2 bg-white scale-75 left-4 px-1 ${
          isFocus
            ? "text-black"
            : errors[name]
            ? "text-red-500"
            : "text-zinc-400 "
        } `}
      >
        {label}
      </label>
    </div>
  );
};

export default Select;
