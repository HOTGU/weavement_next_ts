"use client";

import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useUpdatePortfolio from "@/hooks/useUpdatePortfolio";
import File from "@/components/inputs/File";
import { HiXMark } from "react-icons/hi2";
import Image from "next/legacy/image";
import Input from "@/components/inputs/Input";
import Textarea from "@/components/inputs/Textarea";
import Button from "@/components/Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const PortfolioUpdate = () => {
  const updatePortfolio = useUpdatePortfolio();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [oldThumb, setOldThumb] = useState<string>(
    updatePortfolio.target?.thumb || ""
  );
  const [oldFiles, setOldFiles] = useState<string[]>(
    updatePortfolio.target?.images || []
  );
  const [thumb, setThumb] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isRep, setIsRep] = useState("");
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      title: updatePortfolio.target?.title,
      description: updatePortfolio.target?.description,
    },
  });

  useEffect(() => {
    if (updatePortfolio.target) {
      setOldThumb(updatePortfolio.target?.thumb);
      setOldFiles(updatePortfolio.target?.images);
      reset({
        title: updatePortfolio.target?.title,
        description: updatePortfolio.target?.description,
      });
      setThumb([]);
      setFiles([]);
      setIsRep(updatePortfolio.target.isRep ? "on" : "");
    }
  }, [updatePortfolio.target]);

  const title = watch("title");
  const description = watch("description");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (updatePortfolio.target) {
      if (oldFiles?.length === 0 && files.length === 0)
        return toast.error("하위사진을 선택해주세요");

      setLoading(true);

      const loadingToast = toast.loading("포트폴리오 수정중..");

      const fd = new FormData();
      fd.append("oldThumb", oldThumb);
      if (thumb[0]) {
        fd.append("thumb", thumb[0], thumb[0].name);
      }

      for (let i = 0; i < oldFiles.length; i++) {
        fd.append("oldImages", oldFiles[i]);
      }
      for (let i = 0; i < files.length; i++) {
        fd.append("images", files[i], files[i].name);
      }

      fd.append("title", data.title);
      fd.append("description", data.description);
      fd.append("isRep", isRep);

      axios
        .put(`/api/portfolio/${updatePortfolio.target.id}`, fd)
        .then(() => {
          toast.success("수정 성공", { id: loadingToast });
          router.refresh();
          updatePortfolio.onClose();
        })
        .catch((error) => {
          if (process.env.NODE_ENV === "development") {
            console.log(error);
          }
          toast.error("수정 실패", { id: loadingToast });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const deleteOldFile = (target: number) => {
    if (oldFiles) {
      const deletedFiles = oldFiles.filter((__, index) => target !== index);
      setOldFiles(deletedFiles);
    }
  };

  const deleteFile = (target: number) => {
    const deletedFiles = files.filter((__, index) => target !== index);
    setFiles(deletedFiles);
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-50px)] p-6 overflow-y-auto relative">
      <div className="w-2/3 h-fit flex flex-col gap-4 items-center">
        <div className="relative w-full aspect-video">
          {thumb[0] ? (
            <>
              <Image
                objectFit="cover"
                layout="fill"
                src={URL.createObjectURL(thumb[0])}
                className="rounded-md"
              />
              <div
                onClick={() => setThumb([])}
                className="absolute top-1 right-1 text-rose-500 bg-white/70 rounded-full cursor-pointer"
              >
                <HiXMark />
              </div>
            </>
          ) : (
            <>
              {oldThumb && (
                <>
                  <Image
                    objectFit="cover"
                    layout="fill"
                    src={oldThumb}
                    className="rounded-md"
                  />
                </>
              )}
            </>
          )}
        </div>
        <div className="font-semibold text-lg">{title}</div>
        <div className=" whitespace-pre-line font-light text-center">
          {description}
        </div>
        <div className=" columns-3">
          {oldFiles && oldFiles.length > 0 && (
            <>
              {oldFiles.map((image, index) => (
                <div className="relative" key={image}>
                  <img src={image} className="mb-4" />
                  <div
                    onClick={() => deleteOldFile(index)}
                    className="absolute top-1 right-1 text-rose-500 bg-white/70 rounded-full cursor-pointer"
                  >
                    <HiXMark />
                  </div>
                </div>
              ))}
            </>
          )}
          {files.map((file, index) => (
            <div className="relative" key={file.size}>
              <img src={URL.createObjectURL(file)} className="mb-4" />
              <div
                onClick={() => deleteFile(index)}
                className="absolute top-1 right-1 text-rose-500 bg-white/70 rounded-full cursor-pointer"
              >
                <HiXMark />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/3 h-fit sticky top-0 flex flex-col gap-4 p-4 shadow-xl border rounded">
        <div className="flex gap-4">
          <File
            files={thumb}
            setFiles={setThumb}
            label="대표사진선택"
            compressWidth={2560}
            hiddenFiles
            disabled={loading}
            onlyOne
          />
          <File
            files={files}
            setFiles={setFiles}
            label="사진선택"
            compressWidth={1024}
            multiple
            hiddenFiles
            disabled={loading}
          />
        </div>

        <Input
          control={control}
          errors={errors}
          required
          name="title"
          label="제목"
          disabled={loading}
        />
        <Textarea
          control={control}
          errors={errors}
          name="description"
          required
          label="본문"
          disabled={loading}
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                setIsRep("on");
              } else {
                setIsRep("");
              }
            }}
            checked={Boolean(isRep)}
            className="w-4 h-4"
          />
          메인페이지 등록
        </label>
        <Button
          label="포트폴리오 수정"
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
        />
        <Button
          label="수정 취소"
          outline
          disabled={loading}
          onClick={updatePortfolio.onClose}
        />
      </div>
    </div>
  );
};

export default PortfolioUpdate;
