"use client";

import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

import Modal from "./Modal";
import useAddClientModal from "@/hooks/useAddClientModal";
import Input from "../inputs/Input";
import useCurrentContact from "@/hooks/useCurrentContact";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddClientModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [contactId, setContactId] = useState<string>("");
  const currentContact = useCurrentContact();
  const { isOpen, onClose } = useAddClientModal();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", phone: "", position: "" },
  });

  useEffect(() => {
    if (currentContact.current) {
      setContactId(currentContact.current.id);
    }
  }, [currentContact.current]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const loadingToast = toast.loading("생성중..");
    setIsLoading(true);

    data.contactId = contactId;

    axios
      .post("/api/client", data)
      .then((result) => {
        toast.success("생성 완료", { id: loadingToast });
        currentContact.setCurrent(result.data);
        router.refresh();
        onClose();
      })
      .catch(() => {
        toast.error("생성 실패", { id: loadingToast });
      })
      .finally(() => setIsLoading(false));
  };

  const bodyContent = (
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

  if (!currentContact.current) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="클라이언트 추가"
      body={bodyContent}
      actionLabel="생성"
      onSubmit={handleSubmit(onSubmit)}
      disabled={isLoading}
    />
  );
};

export default AddClientModal;
