"use client";

import React, { useCallback, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useCreateModal from "@/hooks/useCreateModal";
import getSelectOptions from "@/actions/getSelectOptions";

import Modal from "./Modal";
import Calendar from "../inputs/Calendar";
import Select from "../inputs/Select";
import Textarea from "../inputs/Textarea";
import File from "../inputs/File";
import Input from "../inputs/Input";
import Tiptap from "../inputs/Tiptap";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  INFO = 0,
  DESC = 1,
  CLIENT = 2,
  FILE = 3,
  PROJECT = 4,
  NOTE = 5,
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
  knowPlatform: "",
  description: "",
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
  const [files, setFiles] = useState<File[]>([]);
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
  const createdAt = watch("createdAt");
  const deadline = watch("deadline");

  const onNext = () => setStep(step + 1);
  const onBack = () => setStep(step - 1);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.NOTE) {
      return onNext();
    }

    setIsLoading(true);
    const loadingToast = toast.loading("문의 생성중");

    if (files.length > 0) {
      const fd = new FormData();
      files.map((file) => fd.append("files", file, file.name));
      fd.append("company", data.clientCompany);
      try {
        const res = await axios.post("/api/contact/file-upload", fd);
        if (res.status === 200) {
          data.images = res.data;
        }
      } catch (error) {
        toast.error("사진 올리는 도중 오류발생", { id: loadingToast });
        setIsLoading(false);
        return;
      }
    }

    axios
      .post("/api/contact", data)
      .then(() => {
        toast.success("문의생성 성공", { id: loadingToast });
        createModal.onClose();
        router.refresh();
        setStep(STEPS.INFO);
        reset();
      })
      .catch((error: any) => toast.error("문의생성 실패", { id: loadingToast }))
      .finally(() => {
        setIsLoading(false);
      });
    return console.log(data);
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
          value={createdAt}
          onChange={(date) => setValue("createdAt", date)}
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
        />
      </div>
    </div>
  );

  if (step === STEPS.DESC) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Textarea
          control={control}
          errors={errors}
          label="본문내용"
          name="description"
          disabled={isLoading}
        />
      </div>
    );
  }

  if (step === STEPS.FILE) {
    bodyContent = <File multiple files={files} setFiles={setFiles} />;
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
            value={deadline}
            onChange={(date) => setValue("deadline", new Date(date))}
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
    bodyContent = <Tiptap name="note" control={control} />;
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
