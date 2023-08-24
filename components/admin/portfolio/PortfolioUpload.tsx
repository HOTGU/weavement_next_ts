"use client";

import Button from "@/components/Button";
import File from "@/components/inputs/File";
import Input from "@/components/inputs/Input";
import Textarea from "@/components/inputs/Textarea";
import axios from "axios";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiXMark } from "react-icons/hi2";

const PortfolioUpload = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [thumb, setThumb] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isRep, setIsRep] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<FieldValues>();

  const resetInput = useCallback(() => {
    setFiles([]);
    setThumb([]);
    setIsRep("");
    reset({
      title: "",
      description: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
    });
  }, [router]);

  const title = watch("title");
  const description = watch("description");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!thumb[0]) return toast.error("대표사진을 선택해주세요");
    if (files.length === 0) return toast.error("하위사진을 선택해주세요");

    setLoading(true);

    const loadingToast = toast.loading("포트폴리오 생성중..");

    const fd = new FormData();
    fd.append("thumb", thumb[0], thumb[0].name);

    for (let i = 0; i < files.length; i++) {
      fd.append("images", files[i], files[i].name);
    }
    fd.append("title", data.title);
    fd.append("description", data.description);
    fd.append("isRep", isRep);
    fd.append("metaTitle", data.metaTitle);
    fd.append("metaDescription", data.metaDescription);
    fd.append("metaKeywords", data.metaKeywords);

    axios
      .post("/api/portfolio", fd)
      .then(() => {
        toast.success("생성 성공", { id: loadingToast });
        router.refresh();
        resetInput();
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
        }
        toast.error("생성 실패", { id: loadingToast });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteFile = (target: number) => {
    const deletedFiles = files.filter((__, index) => target !== index);
    setFiles(deletedFiles);
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-50px)] p-6 overflow-y-auto relative">
      <div className="w-2/3 h-fit flex flex-col gap-4 items-center">
        <div className="relative w-full aspect-video">
          {thumb[0] && (
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
          )}
        </div>
        <div className="font-semibold text-lg">{title}</div>
        <div className=" whitespace-pre-line font-light text-center">
          {description}
        </div>
        {files.length > 0 && (
          <div className=" columns-3">
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
        )}
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
            checked={Boolean(isRep)}
            onChange={(e) => {
              if (e.target.checked) {
                setIsRep("on");
              } else {
                setIsRep("");
              }
            }}
            className="w-4 h-4"
          />
          메인페이지 등록
        </label>
        <Input
          control={control}
          errors={errors}
          required
          name="metaTitle"
          label="SEO제목"
          disabled={loading}
        />
        <Textarea
          control={control}
          errors={errors}
          required
          name="metaDescription"
          label="SEO본문"
          disabled={loading}
        />
        <Input
          control={control}
          errors={errors}
          required
          name="metaKeywords"
          label="SEO키워드"
          disabled={loading}
        />
        <Button
          label="포트폴리오 생성"
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
        />
      </div>
    </div>
  );
};

export default PortfolioUpload;
