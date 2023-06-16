"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";

const defaultValues = { email: "", password: "" };

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({ defaultValues });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const toastLoading = toast.loading("로그인중..");
    setIsLoading(true);
    signIn("credentials", { ...data, redirect: false })
      .then((callback) => {
        if (callback?.error) {
          return toast.error("아이디와 비밀번호를 확인하세요", {
            id: toastLoading,
          });
        }
        if (callback?.ok) {
          toast.success("로그인 성공", { id: toastLoading });
          router.push("/admin");
          return;
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form className="my-12 flex flex-col gap-4 mx-auto max-w-md">
      <Heading title="로그인" subtitle="위브먼트 화이팅" />
      <Input
        name="admin_id"
        label="ID"
        errors={errors}
        disabled={isLoading}
        control={control}
        required
      />
      <Input
        name="password"
        label="PW"
        errors={errors}
        disabled={isLoading}
        type="password"
        control={control}
        required
      />
      <Button
        label="로그인"
        disabled={isLoading}
        onClick={handleSubmit(onSubmit)}
      />
    </form>
  );
};

export default LoginForm;
