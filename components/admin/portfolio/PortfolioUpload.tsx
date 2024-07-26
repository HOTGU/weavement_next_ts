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
import Select from "@/components/inputs/Select";
import getSelectOptions from "@/actions/getSelectOptions";

const PortfolioUpload = ({ close }: { close: () => void }) => {
  const router = useRouter();
  const selectOptions = getSelectOptions();
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<"desc" | "seo">("desc");

  const [thumbSize, setThumbSize] = useState<number>(0);
  const [filesSize, setFilesSize] = useState<number>(0);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
    setValue,
    resetField,
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      category: "",
      files: [],
      thumb: [],
      isRep: "",
    },
  });

  const resetInput = useCallback(() => {
    reset({
      title: "",
      category: "",
      description: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      // isRep: "",
      files: [],
      filesPreview: [],
      thumb: [],
      thumbPreview: "",
    });
  }, [router, reset]);

  const title = watch("title");
  const description = watch("description");
  const category = watch("category");
  const watchFiles = watch("files");
  const watchThumb = watch("thumb");
  // const watchIsRep = watch("isRep");
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
    if (step === "desc") {
      setValue("metaTitle", title);
      setValue("metaDescription", description);
      setValue(
        "metaKeywords",
        `조형물제작, 조형물제작업체, ${title},${category.map(
          (c: string) => ` ${c}`
        )} `
      );
      setStep("seo");
      return;
    }

    setLoading(true);

    const loadingToast = toast.loading("포트폴리오 생성중..");

    const fd = new FormData();
    fd.append("thumb", data.thumb[0], data.thumb[0].name);

    for (let i = 0; i < data.files.length; i++) {
      fd.append("images", data.files[i], data.files[i].name);
    }
    fd.append("title", data.title);
    fd.append("category", data.category);
    fd.append("description", data.description);
    // fd.append("isRep", data.isRep);
    fd.append("metaTitle", data.metaTitle);
    fd.append("metaDescription", data.metaDescription);
    fd.append("metaKeywords", data.metaKeywords);

    axios
      .post("/api/portfolio", fd)
      .then(() => {
        toast.success("생성 성공", { id: loadingToast });
        router.refresh();
        close();
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

  let body = (
    <>
      <div className="flex gap-4 justify-between">
        <div className="flex gap-4">
          <File
            control={control}
            name="thumb"
            label="대표사진선택"
            compressWidth={2560}
            disabled={loading}
            onlyOne
          />
          <File
            control={control}
            name="files"
            label="사진선택"
            compressWidth={768}
            multiple
            disabled={loading}
          />
        </div>
        {/* <div
          className={` ${
            Boolean(watchIsRep) && "bg-accent text-white"
          } border border-neutral-300 w-36 h-12 rounded-md flex items-center justify-center cursor-pointer transition-colors`}
          onClick={() => {
            Boolean(watchIsRep)
              ? setValue("isRep", "")
              : setValue("isRep", "on");
          }}
        >
          {Boolean(watchIsRep) ? <FaCheck className="" /> : <FaMinus />}
          <span className="pl-2">메인페이지 등록</span>
        </div> */}
      </div>
      <Select
        errors={errors}
        control={control}
        name="category"
        label="카테고리"
        options={selectOptions.portfolioCategoryOptions}
        placeholder="카테고리"
        isMulti
        required
      />

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
    </>
  );
  let actionLabel = "다음";

  if (step === "seo") {
    actionLabel = "생성";
    body = (
      <>
        <div className=" font-bold text-center">SEO</div>
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
      </>
    );
  }

  return (
    <div className="flex gap-4 min-h-[calc(100vh-50px)] w-full py-4 ">
      <div className="flex-1 h-full flex flex-col gap-4 p-2 items-center border rounded">
        <div className="flex flex-col items-center gap-1">
          {thumbSize + filesSize > 4 && (
            <div className="text-xs text-rose-500">
              사진이 4MB를 초과했습니다.
            </div>
          )}
          <span className="text-xs text-neutral-500">
            {(thumbSize + filesSize).toFixed(2)}MB / 4MB (썸네일: {thumbSize}
            MB 하위사진:
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
      <div className="flex-1 h-[80vh] sticky top-14 flex flex-col gap-4 p-4 shadow-xl border rounded ">
        {body}
        <div className="mt-auto flex gap-4">
          {step === "seo" && (
            <Button
              label="이전"
              disabled={loading}
              onClick={() => setStep("desc")}
              outline
            />
          )}
          <Button
            label={actionLabel}
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioUpload;
