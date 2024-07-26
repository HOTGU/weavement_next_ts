"use client";

import React, { useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { HiXMark } from "react-icons/hi2";
import { FaCheck, FaMinus } from "react-icons/fa";

import File from "@/components/inputs/File";
import Image from "next/legacy/image";
import Input from "@/components/inputs/Input";
import Textarea from "@/components/inputs/Textarea";
import Button from "@/components/Button";
import getTotalFileSize from "@/utils/getTotalFileSize";
import getSelectOptions from "@/actions/getSelectOptions";
import Select from "@/components/inputs/Select";
import { Portfolio } from "@prisma/client";

const PortfolioUpdate = ({ portfolio }: { portfolio: Portfolio }) => {
  // const updatePortfolio = useUpdatePortfolio();
  const selectOptions = getSelectOptions();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [thumbSize, setThumbSize] = useState<number>(0);
  const [filesSize, setFilesSize] = useState<number>(0);
  const [step, setStep] = useState<"desc" | "seo">("desc");

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FieldValues>({
    values: useMemo(() => {
      return {
        title: portfolio.title,
        category: portfolio.category,
        description: portfolio.description,
        metaTitle: portfolio.metaTitle,
        metaDescription: portfolio.metaDescription,
        metaKeywords: portfolio.metaKeywords,
        // isRep: portfolio.isRep ? "on" : "",
        blurThumb: portfolio.blurThumb,
        oldFiles: portfolio.images,
        oldThumb: portfolio.thumb,
        files: [],
        filesPreview: [],
        thumb: [],
        thumbPreview: "",
      };
    }, [portfolio]),
  });

  const title = watch("title");
  const description = watch("description");
  // const watchIsRep = watch("isRep");
  const watchOldFiles = watch("oldFiles");
  const watchOldThumb = watch("oldThumb");

  const watchFiles = watch("files");
  const watchFilesPreview = watch("filesPreview");
  const watchThumb = watch("thumb");
  const watchThumbPreview = watch("thumbPreview");

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
    if (portfolio) {
      if (watchOldFiles?.length === 0 && watchFiles.length === 0)
        return toast.error("하위사진을 선택해주세요");

      if (step === "desc") return setStep("seo");

      setLoading(true);
      const loadingToast = toast.loading("포트폴리오 수정중..");

      const fd = new FormData();
      fd.append("oldThumb", data.oldThumb);
      if (data.thumb[0]) {
        fd.append("thumb", data.thumb[0], data.thumb[0].name);
      }
      for (let i = 0; i < data.oldFiles.length; i++) {
        fd.append("oldImages", data.oldFiles[i]);
      }
      for (let i = 0; i < data.files.length; i++) {
        fd.append("images", data.files[i], data.files[i].name);
      }
      fd.append("title", data.title);
      fd.append("category", data.category);
      fd.append("description", data.description);
      fd.append("isRep", data.isRep);
      fd.append("blurThumb", data.blurThumb);
      fd.append("metaTitle", data.metaTitle);
      fd.append("metaDescription", data.metaDescription);
      fd.append("metaKeywords", data.metaKeywords);

      axios
        .put(`/api/portfolio/${portfolio.id}`, fd)
        .then(() => {
          toast.success("수정 성공", { id: loadingToast });
          router.push("/admin/portfolio");
          router.refresh();
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
    if (watchOldFiles) {
      const deletedFiles = watchOldFiles.filter(
        (__: string, index: number) => target !== index
      );
      setValue("oldFiles", deletedFiles);
    }
  };

  const deleteFile = (target: number) => {
    const deletedFiles = watchFiles.filter(
      (__: any, index: number) => target !== index
    );
    setValue("files", deletedFiles);
  };

  let body = (
    <>
      <div className="flex gap-4 justify-between">
        <div className="flex gap-4">
          <File
            control={control}
            name="thumb"
            label="대표사진선택"
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
    actionLabel = "수정";
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
      <div className="w-1/2 h-full flex flex-col gap-4 p-2 items-center border rounded">
        <div className="flex flex-col items-center gap-1 ">
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
          {watchThumbPreview ? (
            <>
              <Image
                objectFit="cover"
                layout="fill"
                alt="포트폴리오 썸네일"
                src={watchThumbPreview}
                onLoad={() => {
                  URL.revokeObjectURL(watchThumbPreview);
                }}
                className="rounded-md"
              />
              <div
                onClick={() => setValue("thumb", [])}
                className="absolute top-1 right-1 text-rose-500 bg-white/70 rounded-full cursor-pointer"
              >
                <HiXMark />
              </div>
            </>
          ) : (
            <Image
              objectFit="cover"
              alt="포트폴리오 썸네일"
              layout="fill"
              src={watchOldThumb}
              className="rounded-md"
            />
          )}
        </div>
        <div className="font-semibold text-lg">{title}</div>
        <div className=" whitespace-pre-line font-light text-center">
          {description}
        </div>
        <div className=" columns-3">
          {watchOldFiles && watchOldFiles.length > 0 && (
            <>
              {watchOldFiles.map((image: string, index: number) => (
                <div className="relative" key={image}>
                  <img
                    src={image}
                    className="mb-4 rounded"
                    alt="포트폴리오 사진"
                  />
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

          {watchFilesPreview.map((preview: string, index: number) => (
            <div className="relative" key={preview}>
              <img
                src={preview}
                alt="포트폴리오 사진"
                className="mb-4 rounded"
                onLoad={() => {
                  URL.revokeObjectURL(preview);
                }}
              />
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
      <div className="w-1/2 h-[80vh] sticky top-14 flex flex-col gap-4 p-4 shadow-xl border rounded">
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

export default PortfolioUpdate;
