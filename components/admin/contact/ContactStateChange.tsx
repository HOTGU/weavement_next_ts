"use client";

import useCurrentContact from "@/hooks/useCurrentContact";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const stateArr = ["문의", "상담", "계약", "미수신", "불발", "완료"];

const ContactStateChange = () => {
  const { current, setCurrent } = useCurrentContact();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setValue, handleSubmit } = useForm<FieldValues>({
    values: useMemo(() => {
      return { state: current?.state };
    }, [current]),
  });

  if (!current) return null;

  const stateChange: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const handeClick = (value: string) => (e: React.MouseEvent) => {
    if (value === current.state || loading) return;
    const loadingToast = toast.loading("상태 수정중..");
    setLoading(loading);
    axios
      .put(`/api/contact/${current?.id}`, { state: value })
      .then((result) => {
        toast.success("수정성공", { id: loadingToast });
        router.refresh();
        setCurrent(result.data);
      })
      .catch((error) => {
        toast.error("수정실패", { id: loadingToast });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex gap-2 mb-4">
      {stateArr.map((stateItem: string) => (
        <div
          className={`px-2 rounded border transition ${
            current.state === stateItem
              ? "bg-accent text-white cursor-default"
              : "bg-neutral-50 text-neutral-700 cursor-pointer hover:bg-neutral-200"
          }`}
          key={stateItem}
          onClick={handeClick(stateItem)}
        >
          {stateItem}
        </div>
      ))}
    </div>
  );
};

export default ContactStateChange;
