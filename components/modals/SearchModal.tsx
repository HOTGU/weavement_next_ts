"use client";

import React, { useCallback, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import formatISO from "date-fns/formatISO";
import { FaTimes } from "react-icons/fa";
import qs from "query-string";
import differenceInDays from "date-fns/differenceInDays";

import useSearchModal from "@/hooks/useSearchModal";
import getSelectOptions from "@/actions/getSelectOptions";

import Modal from "./Modal";
import Calendar from "../inputs/Calendar";
import Select from "../inputs/Select";
import Input from "../inputs/Input";
import useCurrentContact from "@/hooks/useCurrentContact";

const SearchModal = () => {
  const searchModal = useSearchModal();
  const selectOptions = getSelectOptions();
  const currentContact = useCurrentContact();
  const router = useRouter();
  const params = useSearchParams();

  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const pm = params?.get("pm");
  const term = params?.get("term");

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      startDate: startDate ? new Date(startDate as string) : null,
      endDate: endDate ? new Date(endDate as string) : null,
      pm,
      term,
    },
  });

  const watchStartDate = watch("startDate");
  const watchEndDate = watch("endDate");

  useEffect(() => {
    const check = differenceInDays(watchEndDate, watchStartDate);

    if (check < 0) {
      setValue("startDate", watchEndDate);
      setValue("endDate", watchStartDate);
    }
  }, [watchStartDate, watchEndDate, setValue]);

  const initFilter = useCallback(() => {
    searchModal.onClose();
    reset();
    router.push("/admin/contact");
  }, [router, reset, searchModal]);

  const dateInit = useCallback(() => {
    setValue("startDate", null);
    setValue("endDate", null);
  }, [setValue]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      pm: data.pm,
      term: data.term,
      startDate: null,
      endDate: null,
    };

    if (data.startDate && data.endDate) {
      updatedQuery.startDate = formatISO(data.startDate);
      updatedQuery.endDate = formatISO(data.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/admin/contact",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    searchModal.onClose();
    currentContact.reset();
    router.push(url);
  };

  let bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <Calendar
          value={watchStartDate}
          onChange={(date) => setValue("startDate", date)}
          placeholder="시작날짜"
        />
        <span className="">~</span>
        <Calendar
          value={watchEndDate}
          onChange={(date) => setValue("endDate", date)}
          placeholder="끝날짜"
        />
        <div
          onClick={dateInit}
          className="flex items-center justify-center p-4 text-accent w-12 bg-zinc-200 rounded cursor-pointer transition hover:opacity-70"
        >
          <FaTimes size={26} />
        </div>
      </div>
      <hr />
      <Select
        placeholder="모두"
        label="PM"
        options={selectOptions.pmOptions}
        name="pm"
        errors={errors}
        control={control}
      />
      <hr />
      <Input label="검색어" errors={errors} name="term" control={control} />
    </div>
  );

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="필터링"
      body={bodyContent}
      actionLabel="검색"
      secondaryActionLabel="초기화"
      secondaryAction={initFilter}
    />
  );
};

export default SearchModal;
