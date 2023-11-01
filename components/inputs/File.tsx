"use client";

import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { HiXMark } from "react-icons/hi2";

import compressFiles from "@/actions/compressFiles";
import { BarLoader } from "react-spinners";
import { Control, useController } from "react-hook-form";
import { toast } from "react-hot-toast";

interface FileProps {
  control?: Control;
  label?: string;
  multiple?: boolean;
  compressWidth?: number;
  onlyOne?: boolean;
  disabled?: boolean;
  name: string;
  max?: number;
}

const File = ({
  multiple,
  label = "사진선택",
  compressWidth,
  onlyOne = false,
  disabled,
  control,
  name,
  max,
}: FileProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const { field } = useController({ name, control });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const inputFiles = target.files;
    if (!inputFiles) return;

    if (max && field.value.length >= max) {
      toast.error(`사진은 최대 ${max}장입니다.`);
      return;
    }

    setLoading(true);

    const filesNameArr = field.value.map((file: File) => {
      return file?.name;
    });

    let compressedFiles = [];

    for (let i = 0; i < inputFiles.length; i++) {
      if (!filesNameArr.includes(inputFiles[i].name)) {
        if (compressWidth) {
          const compressedFile = await compressFiles(
            inputFiles[i],
            compressWidth
          );
          compressedFiles.push(compressedFile);
        } else {
          compressedFiles.push(inputFiles[i]);
        }
      }
    }

    if (onlyOne) {
      field.onChange([compressedFiles[0]]);
    } else {
      field.onChange([...field.value, ...compressedFiles]);
    }

    setLoading(false);
  };

  return (
    <div>
      <input
        ref={inputRef}
        name={field.name}
        type="file"
        onChange={handleChange}
        multiple={multiple}
        disabled={loading}
        hidden
        className="peer"
        accept="image/*"
      />
      <div
        onClick={() => {
          if (inputRef.current && !loading && !disabled) {
            inputRef.current.click();
          }
        }}
        className={`w-28 h-12 text-zinc-800 cursor-pointer flex items-center justify-center border border-neutral-300 hover:opacity-70 rounded-md peer-disabled:opacity-70 peer-disabled:cursor-not-allowed peer-active:border-black ${
          disabled && "opacity-70 cursor-not-allowed"
        }`}
      >
        {loading ? <BarLoader /> : label}
      </div>
    </div>
  );
};

export default File;
