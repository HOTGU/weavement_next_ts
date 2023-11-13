"use client";

import React, { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import useCreateModal from "@/hooks/useCreateModal";
import getSelectOptions from "@/actions/getSelectOptions";

import Modal from "./Modal";
import Calendar from "../inputs/Calendar";
import Select from "../inputs/Select";
import File from "../inputs/File";
import Input from "../inputs/Input";
import Tiptap from "../inputs/Tiptap";
import axios from "axios";
import FilesName from "../FilesName";

enum STEPS {
  INFO = 0,
  DESC = 1,
  CLIENT = 2,
  PROJECT = 3,
  NOTE = 4,
}

const defaultValues = {
  state: "상담",
  createdAt: undefined,
  contactPath: "",
  step: "",
  hasDesign: "",
  cost: "",
  schedule: "",
  pm: "미정",
  knowPlatform: "알수없음",
  description: "",
  files: [],
  clientCompany: "",
  name: "",
  phone: "",
  position: "",
  email: "",
  meterial: [],
  content: "",
  size: "",
  deadline: undefined,
  orderCompany: "",
  note: "",
};

const CreateModal = () => {
  const selectOptions = getSelectOptions();
  const router = useRouter();
  const [step, setStep] = useState(STEPS.INFO);
  const [isLoading, setIsLoading] = useState(false);
  const createModal = useCreateModal();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FieldValues>({
    defaultValues,
  });

  const watchFiles = watch("files");

  const onNext = () => setStep(step + 1);
  const onBack = () => setStep(step - 1);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.NOTE) {
      return onNext();
    }

    setIsLoading(true);
    const loadingToast = toast.loading("문의 생성중");

    if (data.files.length > 0) {
      // file이 있을때만 분기처리
      const fd = new FormData(); // file은 formdata만 받음

      for (let key in data) {
        if (key === "files") {
          data.files.map((file: Blob) => fd.append("files", file, file.name));
        }
      }
      fd.append("company", data.clientCompany);

      try {
        const res = await axios.post("/api/contact/file-upload", fd); // file만 업로드하는 api 호출
        if (res.status === 200) {
          data.images = res.data; // return 값은 image location array 형태
        }
      } catch (error) {
        toast.error("사진 올리는 도중 오류발생", { id: loadingToast });
        setIsLoading(false);
        return;
      }
    }

    // delete data.files; // files를 지워야 prisma 에러 발생 안함

    axios
      .post("/api/contact", data)
      .then(() => {
        toast.success("문의생성 성공", { id: loadingToast });
        router.refresh();
        createModal.onClose();
        setStep(STEPS.INFO);
        reset();
      })
      .catch((error: any) => toast.error("문의생성 실패", { id: loadingToast }))
      .finally(() => {
        setIsLoading(false);
      });
    return;
  };

  const actionLabel = useMemo(() => {
    if (step !== STEPS.NOTE) {
      return "다음";
    }
    return "생성";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "";
    }
    return "이전";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Calendar
          control={control}
          name="createdAt"
          showTime
          placeholder="문의날짜"
          isClearable
          disabled={isLoading}
        />
        <Select
          placeholder="문의경로"
          label="문의경로"
          control={control}
          name="contactPath"
          options={selectOptions.contactPathOptions}
          errors={errors}
          disabled={isLoading}
        />
      </div>
      <div className="flex gap-4">
        <Select
          placeholder="단계"
          label="단계"
          control={control}
          name="step"
          options={selectOptions.stepOptions}
          errors={errors}
          disabled={isLoading}
        />
        <Select
          placeholder="디자인여부"
          label="디자인여부"
          control={control}
          name="hasDesign"
          options={selectOptions.hasDesignOptions}
          errors={errors}
          disabled={isLoading}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          placeholder="예산"
          label="예산"
          control={control}
          name="cost"
          options={selectOptions.costOptions}
          errors={errors}
          disabled={isLoading}
        />
        <Select
          placeholder="일정"
          label="일정"
          control={control}
          name="schedule"
          options={selectOptions.scheduleOptions}
          errors={errors}
          disabled={isLoading}
        />
      </div>
      <div className="flex gap-4">
        <Select
          placeholder="PM"
          label="PM"
          control={control}
          name="pm"
          options={selectOptions.pmOptions}
          errors={errors}
          disabled={isLoading}
        />
        <Select
          placeholder="플랫폼"
          label="유입플랫폼"
          control={control}
          name="knowPlatform"
          options={selectOptions.knowPlatformOptions}
          errors={errors}
          disabled={isLoading}
          isClearable={false}
        />
      </div>
    </div>
  );

  if (step === STEPS.DESC) {
    bodyContent = (
      <div className="flex flex-col gap-2">
        <Tiptap
          label="문의노트"
          name="description"
          control={control}
          disabled={isLoading}
          small
        />
        <File control={control} name="files" multiple compressWidth={1480} />
        <FilesName type="files" files={watchFiles} setValue={setValue} />
      </div>
    );
  }

  if (step === STEPS.CLIENT) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Input
          control={control}
          errors={errors}
          name="clientCompany"
          label="기업명"
          disabled={isLoading}
        />
        <div className="flex gap-4">
          <Input control={control} errors={errors} name="name" label="고객명" />
          <Input
            control={control}
            errors={errors}
            name="phone"
            label="연락처"
            disabled={isLoading}
            formatterPhone
          />
        </div>
        <div className="flex gap-4">
          <Input
            control={control}
            errors={errors}
            disabled={isLoading}
            name="position"
            label="직급"
          />
          <Input
            control={control}
            disabled={isLoading}
            errors={errors}
            name="email"
            label="이메일"
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.PROJECT) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Select
          options={selectOptions.meterialOptions}
          control={control}
          name="meterial"
          placeholder="소재를 선택하세요"
          label="소재"
          errors={errors}
          disabled={isLoading}
          isMulti
        />
        <div className="flex gap-4">
          <Input
            control={control}
            errors={errors}
            name="content"
            disabled={isLoading}
            label="콘텐츠"
          />
          <Input name="size" control={control} errors={errors} label="크기" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            name="orderCompany"
            control={control}
            disabled={isLoading}
            errors={errors}
            label="협력사"
          />
          <Calendar
            control={control}
            name="deadline"
            showTime
            placeholder="납기일"
            disabled={isLoading}
            isClearable
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.NOTE) {
    bodyContent = <Tiptap label="상담노트" name="note" control={control} />;
  }

  return (
    <Modal
      isOpen={createModal.isOpen}
      title="문의생성"
      body={<div className="min-h-[40vh] py-2">{bodyContent}</div>}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={onBack}
      onClose={createModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={isLoading}
    />
  );
};

export default CreateModal;
