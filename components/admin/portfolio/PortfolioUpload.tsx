"use client";

import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiXMark } from "react-icons/hi2";

import Button from "@/components/Button";
import File from "@/components/inputs/File";
import Input from "@/components/inputs/Input";
import Textarea from "@/components/inputs/Textarea";
import getTotalFileSize from "@/utils/getTotalFileSize";

const PortfolioUpload = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [thumbSize, setThumbSize] = useState<number>(0);
  const [filesSize, setFilesSize] = useState<number>(0);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      files: [],
      thumb: [],
      isRep: "",
    },
  });

  const resetInput = useCallback(() => {
    reset({
      title: "",
      description: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      isRep: "",
      files: [],
      filesPreview: [],
      thumb: [],
      thumbPreview: "",
    });
  }, [router, reset]);

  const title = watch("title");
  const description = watch("description");
  const watchFiles = watch("files");
  const watchThumb = watch("thumb");
  const watchIsRep = watch("isRep");
  const thumbPreview = watch("thumbPreview");
  const filesPreview = watch("filesPreview");

  useEffect(() => {
    if (watchThumb[0]) {
      const thumbPreview = URL.createObjectURL(watchThumb[0]);
      setValue("thumbPreview", thumbPreview);

      const thumbMbSize = getTotalFileSize(watchThumb);
      setThumbSize(thumbMbSize);
    } else {
      setValue("thumbPreview", "");
      setThumbSize(0);
    }
  }, [watchThumb]);

  useEffect(() => {
    const filesPreview = watchFiles.map((file: File) =>
      URL.createObjectURL(file)
    );
    setValue("filesPreview", filesPreview);

    const filesMbSize = getTotalFileSize(watchFiles);
    setFilesSize(filesMbSize);
  }, [watchFiles]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!watchThumb[0]) return toast.error("대표사진을 선택해주세요");
    if (watchFiles.length === 0) return toast.error("하위사진을 선택해주세요");

    setLoading(true);

    const loadingToast = toast.loading("포트폴리오 생성중..");

    const fd = new FormData();
    fd.append("thumb", data.thumb[0], data.thumb[0].name);

    for (let i = 0; i < data.files.length; i++) {
      fd.append("images", data.files[i], data.files[i].name);
    }
    fd.append("title", data.title);
    fd.append("description", data.description);
    fd.append("isRep", data.isRep);
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
    const deletedFiles = watchFiles.filter(
      (__: any, index: number) => target !== index
    );
    setValue("files", deletedFiles);
    const deleteFilesPreview = filesPreview.filter(
      (__: any, index: number) => target !== index
    );
    setValue("filesPreview", deleteFilesPreview);
  };

  return (
    <div className="flex gap-6 h-[calc(100vh-50px)] p-6 overflow-y-auto relative">
      <div className="w-2/3 h-fit flex flex-col gap-4 items-center">
        <div className="flex flex-col items-center">
          {thumbSize + filesSize > 4 && (
            <div className="text-xs text-rose-500">
              사진이 4MB를 초과했습니다.
            </div>
          )}
          <span className="text-xs">
            {(thumbSize + filesSize).toFixed(2)}MB / 4MB (썸네일: {thumbSize}MB
            하위사진:
            {filesSize}MB )
          </span>
        </div>
        <div className="relative w-full aspect-video">
          {thumbPreview && (
            <>
              <Image
                objectFit="cover"
                layout="fill"
                alt="포트폴리오 썸네일"
                src={thumbPreview}
                onLoad={() => {
                  URL.revokeObjectURL(thumbPreview);
                }}
                className="rounded-md"
              />
              <div
                onClick={() => {
                  setValue("thumb", []);
                  setValue("thumbPreview", "");
                }}
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
        <div className=" columns-3">
          {filesPreview &&
            filesPreview.map((preview: string, index: number) => (
              <div className="relative" key={preview}>
                <img
                  src={preview}
                  alt="포트폴리오 사진"
                  className="mb-4 rounded"
                  onLoad={() => URL.revokeObjectURL(preview)}
                />
                <div
                  onClick={() => {
                    deleteFile(index);
                  }}
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
            control={control}
            name="thumb"
            label="대표사진선택"
            // compressWidth={2560} //대표사진은 노압축이 화질이 좋음
            disabled={loading}
            onlyOne
          />
          <File
            control={control}
            name="files"
            label="사진선택"
            compressWidth={1024}
            multiple
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
            checked={Boolean(watchIsRep)}
            onChange={(e) => {
              if (e.target.checked) {
                setValue("isRep", "on");
              } else {
                setValue("isRep", "");
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
