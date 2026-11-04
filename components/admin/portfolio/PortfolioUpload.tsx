"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiXMark } from "react-icons/hi2";
import { slugify } from "transliteration";

import Button from "@/components/Button";
import FileInput from "@/components/inputs/File";
import Input from "@/components/inputs/Input";
import Textarea from "@/components/inputs/Textarea";
import Select from "@/components/inputs/Select";
import getTotalFileSize from "@/utils/getTotalFileSize";
import getSelectOptions from "@/actions/getSelectOptions";

type ImageItem = {
  file: globalThis.File;
  preview: string;
  caption: string;
};

const EMPTY_FILES: globalThis.File[] = [];

function splitCommaSeparated(value: unknown): string[] {
  if (typeof value !== "string") return [];

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeSelectValues(value: unknown): string[] {
  if (!Array.isArray(value)) return splitCommaSeparated(value);

  return value
    .map((item) => {
      if (typeof item === "string") return item.trim();

      if (item && typeof item === "object") {
        const option = item as { value?: unknown; label?: unknown };

        if (typeof option.value === "string") return option.value.trim();
        if (typeof option.label === "string") return option.label.trim();
      }

      return "";
    })
    .filter(Boolean);
}

const PortfolioUpload = ({ close }: { close: () => void }) => {
  const router = useRouter();
  const selectOptions = getSelectOptions();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"desc" | "seo">("desc");
  const [thumbSize, setThumbSize] = useState(0);
  const [filesSize, setFilesSize] = useState(0);
  const [thumbPreview, setThumbPreview] = useState("");
  const [imageItems, setImageItems] = useState<ImageItem[]>([]);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const imageItemsRef = useRef<ImageItem[]>([]);

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
      slug: "",
      subtitle: "",
      description: "",
      challenge: "",
      solution: "",
      clientCompany: "",
      size: "",
      projectDate: "",
      location: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      category: [],
      material: [],
      files: [],
      thumb: [],
      isRep: false,
    },
  });

  const title = watch("title") || "";
  const description = watch("description") || "";
  const category = normalizeSelectValues(watch("category"));
  const material = normalizeSelectValues(watch("material"));

  const rawFiles = watch("files");
  const watchFiles: globalThis.File[] = Array.isArray(rawFiles)
    ? rawFiles
    : EMPTY_FILES;

  const rawThumb = watch("thumb");
  const watchThumb: globalThis.File[] = Array.isArray(rawThumb)
    ? rawThumb
    : EMPTY_FILES;

  const watchIsRep = Boolean(watch("isRep"));

  // 제목으로 slug 자동 생성
  useEffect(() => {
    if (slugManuallyEdited) return;

    setValue("slug", slugify(title), {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [title, slugManuallyEdited, setValue]);

  // 대표 이미지 미리보기
  useEffect(() => {
    const file = watchThumb[0];

    if (!file) {
      setThumbPreview("");
      setThumbSize(0);
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setThumbPreview(previewUrl);
    setThumbSize(getTotalFileSize([file]));

    return () => URL.revokeObjectURL(previewUrl);
  }, [watchThumb[0]]);

  // 파일 객체 기준으로 미리보기와 캡션 유지
  useEffect(() => {
    const previousItems = imageItemsRef.current;

    const nextItems = watchFiles.map((file) => {
      const existing = previousItems.find((item) => item.file === file);

      return (
        existing ?? {
          file,
          preview: URL.createObjectURL(file),
          caption: "",
        }
      );
    });

    previousItems.forEach((item) => {
      if (!watchFiles.includes(item.file)) {
        URL.revokeObjectURL(item.preview);
      }
    });

    imageItemsRef.current = nextItems;
    setImageItems(nextItems);
    setFilesSize(getTotalFileSize(watchFiles));
  }, [watchFiles]);

  // 컴포넌트가 언마운트될 때 미리보기 URL 정리
  useEffect(() => {
    return () => {
      imageItemsRef.current.forEach((item) => {
        URL.revokeObjectURL(item.preview);
      });
    };
  }, []);

  // 특정 사진의 설명만 수정
  const updateCaption = (file: globalThis.File, caption: string) => {
    const nextItems = imageItemsRef.current.map((item) =>
      item.file === file ? { ...item, caption } : item,
    );

    imageItemsRef.current = nextItems;
    setImageItems(nextItems);
  };

  const resetInput = useCallback(() => {
    reset({
      title: "",
      slug: "",
      subtitle: "",
      description: "",
      challenge: "",
      solution: "",
      clientCompany: "",
      size: "",
      projectDate: "",
      location: "",
      metaTitle: "",
      metaDescription: "",
      metaKeywords: "",
      category: [],
      material: [],
      files: [],
      thumb: [],
      isRep: false,
    });

    imageItemsRef.current = [];
    setImageItems([]);
    setSlugManuallyEdited(false);
    setStep("desc");
  }, [reset]);

  const deleteFile = (target: number) => {
    const deletedFiles = watchFiles.filter((_, index) => index !== target);

    setValue("files", deletedFiles, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const files = Array.isArray(data.files)
      ? (data.files as globalThis.File[])
      : [];

    const thumb = Array.isArray(data.thumb)
      ? (data.thumb as globalThis.File[])[0]
      : undefined;

    if (!thumb) {
      toast.error("대표사진을 선택해주세요.");
      return;
    }

    if (files.length === 0) {
      toast.error("하위사진을 선택해주세요.");
      return;
    }

    if (thumbSize + filesSize > 4) {
      toast.error("전체 사진 용량은 4MB 이하여야 합니다.");
      return;
    }

    // 첫 번째 단계: SEO 기본값 설정
    if (step === "desc") {
      const keywords = [
        "조형물 제작",
        "조형물 제작업체",
        ...category,
        ...material,
        String(data.title || "").trim(),
      ];

      // 빈 값 제거 및 중복 키워드 제거
      const uniqueKeywords = Array.from(new Set(keywords.filter(Boolean)));

      setValue("metaTitle", String(data.title || "").trim(), {
        shouldDirty: true,
      });

      setValue(
        "metaDescription",
        [
          String(data.subtitle || "").trim(),
          String(data.description || "").trim(),
        ]
          .filter(Boolean)
          .join(". "),
        { shouldDirty: true },
      );

      setValue("metaKeywords", uniqueKeywords.join(", "), {
        shouldDirty: true,
      });

      setStep("seo");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("포트폴리오 생성 중...");

    try {
      const fd = new FormData();

      fd.append("thumb", thumb, thumb.name);

      files.forEach((file) => {
        fd.append("images", file, file.name);
      });

      // 사진 파일과 같은 순서로 string[] 생성
      const captions: string[] = files.map((file) => {
        const item = imageItemsRef.current.find(
          (imageItem) => imageItem.file === file,
        );

        return item?.caption.trim() || "";
      });

      // FormData에는 문자열로 전송하고 API에서 string[]로 복원
      fd.append("imageCaptions", JSON.stringify(captions));

      fd.append("title", String(data.title || "").trim());
      fd.append("slug", String(data.slug || "").trim());
      fd.append("subtitle", String(data.subtitle || "").trim());
      fd.append("description", String(data.description || "").trim());
      fd.append("challenge", String(data.challenge || "").trim());
      fd.append("solution", String(data.solution || "").trim());
      fd.append("clientCompany", String(data.clientCompany || "").trim());
      fd.append("size", String(data.size || "").trim());
      fd.append("projectDate", String(data.projectDate || "").trim());
      fd.append("location", String(data.location || "").trim());

      fd.append("category", JSON.stringify(category));
      fd.append("material", JSON.stringify(material));
      fd.append("isRep", String(Boolean(data.isRep)));

      fd.append("metaTitle", String(data.metaTitle || data.title || "").trim());
      fd.append(
        "metaDescription",
        String(data.metaDescription || data.description || "").trim(),
      );
      fd.append(
        "metaKeywords",
        JSON.stringify(splitCommaSeparated(data.metaKeywords)),
      );

      await axios.post("/api/portfolio", fd);

      toast.success("생성 성공", { id: loadingToast });
      router.refresh();
      resetInput();
      close();
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }

      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : undefined;

      toast.error(typeof message === "string" ? message : "생성 실패", {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };

  let body = (
    <>
      <div className="flex gap-4">
        <FileInput
          control={control}
          name="thumb"
          label="대표사진 선택"
          compressWidth={2560}
          disabled={loading}
          onlyOne
        />

        <FileInput
          control={control}
          name="files"
          label="상세사진 선택"
          compressWidth={768}
          multiple
          disabled={loading}
        />
      </div>

      <div className="flex gap-4">
        <Select
          errors={errors}
          control={control}
          name="category"
          label="카테고리"
          options={selectOptions.portfolioCategoryOptions}
          placeholder="카테고리 선택"
          isMulti
          required
        />

        <Select
          errors={errors}
          control={control}
          name="material"
          label="소재"
          options={selectOptions.portfolioMaterialOptions}
          placeholder="소재 선택"
          isMulti
          required
        />
      </div>

      <Input
        control={control}
        errors={errors}
        name="title"
        label="프로젝트 제목"
        required
        disabled={loading}
      />

      <Input
        control={control}
        errors={errors}
        name="slug"
        label="URL 슬러그"
        disabled={loading}
      />

      <Input
        control={control}
        errors={errors}
        name="subtitle"
        label="부제목"
        disabled={loading}
      />

      <Textarea
        control={control}
        errors={errors}
        name="description"
        label="프로젝트 개요"
        required
        disabled={loading}
      />

      <Textarea
        control={control}
        errors={errors}
        name="challenge"
        label="제작 난제 (Challenge)"
        disabled={loading}
      />

      <Textarea
        control={control}
        errors={errors}
        name="solution"
        label="해결 방법 (Solution)"
        disabled={loading}
      />

      <Input
        control={control}
        errors={errors}
        name="clientCompany"
        label="클라이언트"
        disabled={loading}
      />

      <Input
        control={control}
        errors={errors}
        name="size"
        label="크기 및 규격"
        disabled={loading}
      />

      <Input
        control={control}
        errors={errors}
        name="projectDate"
        label="프로젝트 날짜 (예: 2026-03)"
        disabled={loading}
      />

      <Input
        control={control}
        errors={errors}
        name="location"
        label="설치 장소"
        disabled={loading}
      />

      <label className="flex items-center gap-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={watchIsRep}
          onChange={(event) =>
            setValue("isRep", event.target.checked, {
              shouldDirty: true,
            })
          }
          disabled={loading}
        />
        메인 페이지에 대표 포트폴리오로 노출
      </label>
    </>
  );

  let actionLabel = "다음";

  if (step === "seo") {
    actionLabel = "생성";

    body = (
      <>
        <div className="text-center font-bold">SEO 설정</div>

        <Input
          control={control}
          errors={errors}
          name="metaTitle"
          label="SEO 제목"
          required
          disabled={loading}
        />
        <Textarea
          control={control}
          errors={errors}
          name="metaDescription"
          label="SEO 설명"
          required
          disabled={loading}
        />
        <Input
          control={control}
          errors={errors}
          name="metaKeywords"
          label="SEO 키워드 (쉼표로 구분)"
          disabled={loading}
        />

        <p className="text-xs text-neutral-500">
          이미지 설명은 왼쪽의 각 사진 아래에서 입력할 수 있습니다.
        </p>
      </>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-50px)] w-full gap-4 py-4">
      <div className="flex-1 flex flex-col items-center gap-4 rounded border p-2">
        <div className="flex flex-col items-center gap-1">
          {thumbSize + filesSize > 4 && (
            <div className="text-xs text-rose-500">
              사진이 4MB를 초과했습니다.
            </div>
          )}

          <span className="text-xs text-neutral-500">
            {(thumbSize + filesSize).toFixed(2)}MB / 4MB (대표:{" "}
            {thumbSize.toFixed(2)}MB, 상세: {filesSize.toFixed(2)}MB)
          </span>
        </div>

        <div className="relative w-full aspect-video overflow-hidden">
          {thumbPreview && (
            <>
              <Image
                objectFit="cover"
                layout="fill"
                alt="포트폴리오 대표 이미지 미리보기"
                src={thumbPreview}
                className="rounded-md"
              />

              <button
                type="button"
                onClick={() => setValue("thumb", [])}
                aria-label="대표 이미지 삭제"
                className="absolute right-1 top-1 rounded-full bg-white/80 text-rose-500"
              >
                <HiXMark />
              </button>
            </>
          )}
        </div>

        <div className="text-lg font-semibold">{title}</div>

        <div className="whitespace-pre-line text-center font-light">
          {description}
        </div>

        <div className="w-full space-y-5">
          {imageItems.map((item, index) => (
            <div
              key={`${item.file.name}-${item.file.lastModified}-${index}`}
              className="relative rounded-md border border-neutral-200 p-3"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="text-xs text-neutral-500">
                  이미지 {index + 1} · {item.file.name}
                </span>

                <button
                  type="button"
                  onClick={() => deleteFile(index)}
                  disabled={loading}
                  aria-label={`이미지 ${index + 1} 삭제`}
                  className="rounded-full bg-white text-rose-500"
                >
                  <HiXMark size={20} />
                </button>
              </div>

              <img
                src={item.preview}
                alt={`업로드 미리보기 ${index + 1}`}
                className="mb-3 w-full rounded object-cover"
              />

              <label className="mb-1 block text-sm font-medium">
                이미지 설명 (선택)
              </label>

              <input
                type="text"
                value={item.caption}
                onChange={(event) =>
                  updateCaption(item.file, event.target.value)
                }
                disabled={loading}
                placeholder="예: 금속 프레임 제작 과정"
                className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500"
              />

              <p className="mt-1 text-xs text-neutral-500">
                비워두면 프로젝트 제목을 기본 alt로 사용합니다.
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky top-14 flex h-[80vh] flex-1 flex-col gap-4 overflow-y-auto rounded border p-4 shadow-xl">
        {body}

        <div className="mt-auto flex gap-4 pt-4">
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
