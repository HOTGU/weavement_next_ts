"use client";

import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

import Input from "../inputs/Input";
import Button from "../Button";
import Heading from "../Heading";
import { toast } from "react-hot-toast";

const defaultValues = {
  admin_id: "",
  password: "",
  verifyPassword: "",
};

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues,
  });
  const [code, setCode] = useState({
    code: "",
    accept: false,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loadingToast = toast.loading("로딩..");
    setLoading(true);
    axios
      .post("/api/register", data)
      .then((res) => {
        toast.success("회원가입 성공", {
          id: loadingToast,
        });
        reset(defaultValues);
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

  return (
    <form className=" max-w-md mx-auto flex flex-col gap-4 mt-12">
      <Heading title="회원가입" />
      <Input
        name="admin_id"
        control={control}
        errors={errors}
        label="ID"
        required
      />
      <Input
        name="username"
        control={control}
        errors={errors}
        label="이름"
        required
      />
      <Input
        name="password"
        control={control}
        errors={errors}
        label="PW"
        type="password"
        required
      />
      <Input
        name="verifyPassword"
        control={control}
        errors={errors}
        label="VERIFY PW"
        type="password"
        required
      />
      <Button
        onClick={handleSubmit(onSubmit)}
        label="생성"
        disabled={loading}
      />
    </form>
  );
};

export default RegisterForm;
