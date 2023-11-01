import React, { useMemo } from "react";
import { FieldValues, SetValueConfig, UseFormSetValue } from "react-hook-form";
import { HiXMark } from "react-icons/hi2";

interface FilesNameProps {
  files: any[];
  setValue: UseFormSetValue<FieldValues>;
  type: "images" | "files";
}

const FilesName = ({ setValue, files, type }: FilesNameProps) => {
  const handleDelete = (targetIndex: number) => {
    const deletedFiles = files.filter(
      (__: any, fileIndex: number) => targetIndex !== fileIndex
    );

    setValue(type, deletedFiles);
  };

  const filesNameArr = files.map((file) => {
    let name = "";
    if (type === "images") {
      name = file.split("/").pop().split("__").pop();
    }
    if (type === "files") {
      name = file.name;
    }
    return name;
  });

  return (
    <div className="flex flex-wrap gap-2">
      {filesNameArr.map((name: string, index: number) => (
        <div
          key={index}
          className="font-light text-zinc-500 px-4 py-2 bg-zinc-100 flex items-center gap-2"
        >
          <span>{name}</span>
          <HiXMark
            color="#c23616"
            className="cursor-pointer"
            onClick={() => handleDelete(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default FilesName;
