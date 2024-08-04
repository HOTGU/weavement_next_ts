"use client";

import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import Input from "../inputs/Input";
import Modal from "./Modal";
import Select from "../inputs/Select";
import usePortfolioSearchModal from "@/hooks/usePortfolioSearchModal";
import getSelectOptions from "@/actions/getSelectOptions";
import qs from "query-string";

export const PortfolioSearchModal = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { isOpen, onClose } = usePortfolioSearchModal();
  const selectOptions = getSelectOptions();

  const paramsTerm = params?.get("term");
  const paramsCategory = params?.get("category");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    values: {
      term: paramsTerm,
      category: paramsCategory,
    },
  });

  const body = (
    <div className="space-y-4">
      <Input control={control} label="검색어" errors={errors} name="term" />
      <Select
        options={selectOptions.portfolioCategoryOptions}
        control={control}
        errors={errors}
        label="카테고리"
        name="category"
        placeholder="카테고리"
      />
    </div>
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const term = data.term;
    const category = data.category;

    let currentQuery = {} as any;

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const query = { term, category };

    const url = qs.stringifyUrl(
      {
        url: "/portfolio",
        query,
      },
      { skipNull: true }
    );

    onClose();
    router.push(url);
  };
  const init = () => {
    onClose();
    router.push("/portfolio");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      body={body}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel="검색"
      title="포트폴리오 검색"
      secondaryAction={init}
      secondaryActionLabel={paramsCategory || paramsTerm ? "초기화" : undefined}
      enableEnterKey
    />
  );
};
