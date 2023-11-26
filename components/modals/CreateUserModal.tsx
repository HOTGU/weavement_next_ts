"use client";

import React, { useState } from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Modal from "./Modal";
import Input from "../inputs/Input";
import useCreateUserModal from "@/hooks/useCreateUserModal";
import { useRouter } from "next/navigation";

const defaultValues = {
  admin_id: "",
  password: "",
  verifyPassword: "",
};

const CreateUserModal = () => {
  const modal = useCreateUserModal();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loadingToast = toast.loading("로딩..");
    setLoading(true);
    axios
      .post("/api/user", data)
      .then((res) => {
        toast.success("회원가입 성공", {
          id: loadingToast,
        });
        reset(defaultValues);
        modal.onClose();
        router.refresh();
      })
      .catch((error) => {
        toast.error(error.response.data, {
          id: loadingToast,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const body = (
    <form className=" flex flex-col gap-4">
      <Input
        name="admin_id"
        control={control}
        errors={errors}
        label="아이디"
        disabled={loading}
        required
      />
      <Input
        name="password"
        control={control}
        errors={errors}
        label="비밀번호"
        type="password"
        disabled={loading}
        required
      />
      <Input
        name="verifyPassword"
        control={control}
        errors={errors}
        label="비밀번호 확인"
        type="password"
        disabled={loading}
        required
      />
    </form>
  );

  return (
    <Modal
      title="회원가입"
      isOpen={modal.isOpen}
      onClose={modal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="생성"
      body={body}
      disabled={loading}
    />
  );
};

export default CreateUserModal;
