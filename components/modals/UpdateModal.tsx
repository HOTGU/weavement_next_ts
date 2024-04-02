"use client";

import React, { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

import Modal from "./Modal";
import useUpdateModal from "@/hooks/useUpdateModal";
import useCurrentContact from "@/hooks/useCurrentContact";
import Select from "../inputs/Select";
import getSelectOptions from "@/actions/getSelectOptions";
import Input from "../inputs/Input";
import Calendar from "../inputs/Calendar";
import Tiptap from "../inputs/Tiptap";
import { useRouter } from "next/navigation";

const UpdateModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const selectOptions = getSelectOptions();
  const updateModal = useUpdateModal();
  const { current, setCurrent } = useCurrentContact();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    values: useMemo(() => current, [current]),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    const loadingToast = toast.loading("로딩...");

    delete data.client;
    delete data.id;

    axios
      .put(`/api/contact/${current?.id}`, data)
      .then((result) => {
        toast.success("수정성공", { id: loadingToast });
        updateModal.onClose();
        setCurrent(result.data);
        router.refresh();
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
        }
        toast.error("수정실패", { id: loadingToast });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!current) {
    return null;
  }

  let bodyContent = <></>;

  if (updateModal.step === "INFO") {
    bodyContent = (
      <div className="flex flex-col gap-4 py-2">
        <div className="flex flex-col sm:flex-row gap-4">
          <Calendar
            control={control}
            name="createdAt"
            placeholder="문의시각"
            disabled={isLoading}
            showTime
          />
          <Input
            control={control}
            errors={errors}
            name="clientCompany"
            label="고객명"
            disabled={isLoading}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select
            options={selectOptions.knowPlatformOptions}
            control={control}
            errors={errors}
            name="knowPlatform"
            disabled={isLoading}
            placeholder="알게된경로"
            label="알게된경로"
            isClearable={false}
          />
          <Select
            options={selectOptions.contactPathOptions}
            control={control}
            errors={errors}
            name="contactPath"
            placeholder="유입경로"
            disabled={isLoading}
            label="유입경로"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Select
            options={selectOptions.stepOptions}
            control={control}
            name="step"
            errors={errors}
            placeholder="단계"
            label="단계"
            disabled={isLoading}
          />
          <Select
            options={selectOptions.hasDesignOptions}
            control={control}
            name="hasDesign"
            errors={errors}
            placeholder="디자인여부"
            label="디자인여부"
            disabled={isLoading}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select
            options={selectOptions.costOptions}
            control={control}
            errors={errors}
            name="cost"
            placeholder="예산"
            label="예산"
            disabled={isLoading}
          />
          <Select
            options={selectOptions.scheduleOptions}
            control={control}
            errors={errors}
            name="schedule"
            placeholder="일정"
            label="일정"
            disabled={isLoading}
          />
        </div>
      </div>
    );
  }

  if (updateModal.step === "DESC") {
    bodyContent = (
      <Tiptap
        name="description"
        label="문의노트"
        control={control}
        disabled={isLoading}
      />
    );
  }

  if (updateModal.step === "PROJECT") {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-3/4">
            <Select
              control={control}
              errors={errors}
              name="meterial"
              options={selectOptions.meterialOptions}
              label="소재"
              placeholder="소재"
              isMulti
            />
          </div>
          <div className="w-full sm:w-1/4">
            <Select
              control={control}
              errors={errors}
              name="pm"
              options={selectOptions.pmOptions}
              label="담당자"
              placeholder="PM"
              isClearable={false}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <Input
            control={control}
            name="content"
            errors={errors}
            disabled={isLoading}
            label="콘텐츠"
          />
          <Input
            control={control}
            name="size"
            errors={errors}
            label="크기"
            disabled={isLoading}
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Calendar
            control={control}
            name="deadline"
            placeholder="납기일"
            showTime
            isClearable
            disabled={isLoading}
          />
          <Input
            control={control}
            name="orderCompany"
            errors={errors}
            label="협력사"
            disabled={isLoading}
          />
        </div>
      </div>
    );
  }

  if (updateModal.step === "NOTE") {
    bodyContent = (
      <Tiptap
        label="상담노트"
        name="note"
        control={control}
        disabled={isLoading}
      />
    );
  }

  return (
    <Modal
      isOpen={updateModal.isOpen}
      onClose={updateModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="수정"
      body={bodyContent}
      actionLabel="수정"
      disabled={isLoading}
    />
  );
};

export default UpdateModal;
