"use client";

import React, { useState } from "react";
import { FaFolderOpen, FaTimes } from "react-icons/fa";

interface FileInputProps {
  name: string;
  label: string;
  required?: boolean;
  className?: string;
  buttonClassName?: string;
  maxFiles?: number;
}

const FileInput: React.FC<FileInputProps> = ({
  name,
  label,
  required,
  className = "",
  buttonClassName = "",
  maxFiles = 5,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length + files.length > maxFiles) {
      alert(`최대 ${maxFiles}개 파일까지 업로드 가능합니다.`);
      return;
    }

    setFiles((prev) => [...prev, ...selectedFiles]);
    e.target.value = ""; // 같은 파일 선택 가능하게 초기화
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={`flex flex-col gap-2 pt-10 relative ${className}`}>
      {label && <span className="text-lg text-stone-400">{label}</span>}

      {/* 숨겨진 파일 input */}
      <input
        type="file"
        name={name}
        id={name}
        className="hidden"
        multiple
        onChange={handleChange}
        required={required && files.length === 0}
        accept="image/*"
      />

      {/* 파일 선택 버튼 */}
      <label
        htmlFor={name}
        className={`self-start flex gap-2 items-center w-auto px-4 py-2 font-medium transition cursor-pointer 
    border border-stone-600 bg-black text-stone-400 hover:bg-stone-800 
    ${buttonClassName}`}
      >
        <span>파일선택</span>
        <FaFolderOpen />
      </label>

      {/* 선택된 파일 리스트 */}
      <div className="flex flex-wrap gap-1 mt-2">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center gap-2 justify-between px-4 py-2 rounded-full border border-stone-600 bg-black text-stone-400"
          >
            <span className="truncate max-w-[200px]">{file.name}</span>
            <FaTimes
              onClick={() => removeFile(index)}
              className="text-red-500 cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileInput;
