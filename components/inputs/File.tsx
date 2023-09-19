"use client";

import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { HiXMark } from "react-icons/hi2";

import compressFiles from "@/actions/compressFiles";
import { BarLoader } from "react-spinners";

interface FileProps {
  files: File[];
  setFiles: Dispatch<SetStateAction<any>>;
  label?: string;
  multiple?: boolean;
  compressWidth?: number;
  onlyOne?: boolean;
  hiddenFiles?: boolean;
  showInfo?: boolean;
  disabled?: boolean;
}

const File = ({
  files,
  setFiles,
  multiple,
  label = "사진선택",
  compressWidth,
  onlyOne = false,
  hiddenFiles,
  showInfo,
  disabled,
}: FileProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const inputFiles = target.files;

    if (!inputFiles) return;

    setLoading(true);

    const filesNameArr = files.map((file) => {
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
      setFiles([compressedFiles[compressedFiles.length - 1]]);
    } else {
      setFiles([...files, ...compressedFiles]);
    }

    setLoading(false);
  };

  const handleDelete = async (targetIndex: number) => {
    const deletedFiles = files.filter(
      (__, fileIndex) => targetIndex !== fileIndex
    );

    setFiles(deletedFiles);
  };
  return (
    <div>
      <input
        ref={inputRef}
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
      {showInfo && (
        <span className="text-xs text-neutral-500">
          ⚠️이미지 확장자(jpg, png, webp 등)만 가능합니다
        </span>
      )}
      {files.length > 0 && !hiddenFiles && (
        <div className="flex flex-wrap gap-2 pt-4">
          {files.map((file, index) => (
            <div
              key={file.size}
              className="font-light text-zinc-500 px-4 py-2 bg-zinc-100 flex items-center gap-2"
            >
              <span>{file.name}</span>
              <HiXMark
                color="#c23616"
                className="cursor-pointer"
                onClick={() => handleDelete(index)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default File;
