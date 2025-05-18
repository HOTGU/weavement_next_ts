"use client";

import React, { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Modal from "./Modal";
import useUpdateUserModal from "@/hooks/useUpdateUserModal";
import Input from "../inputs/Input";
import CheckBox from "../inputs/CheckBox";
import axios from "axios";
import { useRouter } from "next/navigation";

const UpdateUserModal = () => {
  const updateModal = useUpdateUserModal();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    values: useMemo(() => {
      return {
        id: updateModal.target?.id,
        isAdmin: updateModal.target?.isAdmin,
        username: updateModal.target?.username,
        password: "",
        verifyPassword: "",
      };
    }, [updateModal.target]),
  });

  const onValid: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    const toastId = toast.loading("수정중..");

    axios
      .put(`/api/user`, data)
      .then((res) => {
        toast.success("수정성공", { id: toastId });
        updateModal.onClose();
        router.refresh();
      })
      .catch((err) => {
        if (process.env.NODE_ENV === "development") {
          console.log(err);
        }
        const message = err.response.data.message || "수정실패";
        toast.error(message, { id: toastId });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const body = (
    <form className="flex flex-col gap-4 py-6">
      <Input
        name="username"
        label="이름"
        control={control}
        errors={errors}
        disabled={loading}
      />
      <Input
        type="password"
        control={control}
        name="password"
        label="변경할 비밀번호"
        errors={errors}
        disabled={loading}
      />
      <Input
        type="password"
        control={control}
        name="verifyPassword"
        label="비밀번호 확인"
        errors={errors}
        disabled={loading}
      />
      {updateModal.target?.admin_id !== process.env.NEXT_PUBLIC_MASTER_ID && (
        <CheckBox
          control={control}
          name="isAdmin"
          label="어드민 자격"
          errors={errors}
          disabled={loading}
        />
      )}
    </form>
  );

  return (
    <Modal
      title="정보수정"
      isOpen={updateModal.isUpdate}
      onClose={updateModal.onClose}
      onSubmit={handleSubmit(onValid)}
      body={body}
      actionLabel="수정"
      disabled={loading}
    />
  );
};

export default UpdateUserModal;
