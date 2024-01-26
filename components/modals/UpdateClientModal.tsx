"use client";

import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";

import Input from "../inputs/Input";
import Modal from "./Modal";
import useUpdateClientModla from "@/hooks/useUpdateClientModal";
import { useRouter } from "next/navigation";
import useCurrentContact from "@/hooks/useCurrentContact";

const UpdateClientModal = () => {
  const updateClientModal = useUpdateClientModla();
  const currentContact = useCurrentContact();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: { ...updateClientModal.target },
  });

  useEffect(() => {
    reset(updateClientModal.target);
  }, [updateClientModal.target]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    const loadingToast = toast.loading("수정중...");

    delete data.id;

    axios
      .put(`/api/client/${updateClientModal.target?.id}`, data)
      .then((result) => {
        toast.success("수정성공", { id: loadingToast });
        updateClientModal.onClose();
        router.refresh();
        currentContact.setCurrent(result.data);
      })
      .catch((error) => {
        toast.error("수정실패", { id: loadingToast });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const body = (
    <div className="flex flex-col gap-6">
      <div className="flex gap-6">
        <Input
          control={control}
          name="name"
          label="성함"
          errors={errors}
          disabled={isLoading}
        />
        <Input
          control={control}
          name="position"
          label="직급"
          errors={errors}
          disabled={isLoading}
        />
      </div>
      <Input
        control={control}
        name="email"
        label="이메일"
        errors={errors}
        disabled={isLoading}
      />
      <Input
        control={control}
        name="phone"
        label="번호"
        errors={errors}
        disabled={isLoading}
        formatterPhone
      />
    </div>
  );

  return (
    <Modal
      title="클라이언트 수정"
      isOpen={updateClientModal.isOpen}
      disabled={isLoading}
      onClose={updateClientModal.onClose}
      actionLabel="수정"
      body={body}
      onSubmit={handleSubmit(onSubmit)}
      enableEnterKey
    />
  );
};

export default UpdateClientModal;
