"use client";

import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Select from "../inputs/Select";
import Input from "../inputs/Input";
import Button from "../Button";
import { toast } from "react-hot-toast";
import axios from "axios";

const categoryOptions = [{ label: "문의경로", value: "contactPath" }];

const AdminDbChangeForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { before: "", after: "", category: "" },
  });

  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    try {
      const res = await axios.post("/api/contact/db-update", data);
      console.log(res);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
      }
      toast.error("DB 변경 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className=" underline text-rose-400 cursor-pointer mb-10 font-bold"
        onClick={() => setShow(!show)}
      >
        {show ? "❌ 취소" : "❗️데이터베이스 조작"}
      </div>
      {show ? (
        <div className="w-full space-y-3">
          <Select
            name="category"
            control={control}
            errors={errors}
            label="카테고리"
            placeholder="카테고리"
            options={categoryOptions}
          />
          <Input
            name="before"
            control={control}
            errors={errors}
            label="변경대상"
          />
          <Input
            name="after"
            control={control}
            errors={errors}
            label="변경할 값"
          />
          <Button onClick={handleSubmit(onSubmit)} label="수정" outline />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AdminDbChangeForm;
