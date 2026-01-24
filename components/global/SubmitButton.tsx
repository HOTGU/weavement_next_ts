"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReverseUnderlineText from "../framer/ReverseUnderlineText";
import { ClipLoader } from "react-spinners";
import { ActionResult } from "@/types";

type ErrorModalProps = {
  message: string;
  onClose: () => void;
};

const ErrorModal = ({ message, onClose }: ErrorModalProps) => {
  // document.body가 있는지 체크 (Next.js SSR 안전)
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {message ? (
        <motion.div
          key="overlay"
          className="fixed top-0 left-0 w-screen h-screen bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            key="modal"
            className="w-[30%] bg-white rounded-lg relative px-8 py-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center justify-center gap-4 text-black">
              <div className="text-xl font-semibold mb-4">⚠️ 오류 발생</div>
              <p className="text-sm whitespace-pre-wrap">{message}</p>
              <div
                onClick={onClose}
                className="mt-6 w-full rounded-lg bg-black text-white py-2 font-medium hover:bg-gray-800 transition cursor-pointer text-center"
              >
                확인
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
};

type SubmitButtonProps<T> = {
  label: string;
  onSubmit: (formData: FormData) => Promise<ActionResult<T>>;
};

const SubmitButton = <T,>({ label, onSubmit }: SubmitButtonProps<T>) => {
  const [pending, setPending] = useState(false);
  const [err, setErr] = useState("");

  const handleClick: React.FormEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget.form;
    if (!form) return;

    const formData = new FormData(form);

    setPending(true);
    setErr("");

    const res: ActionResult<T> = await onSubmit(formData);
    if (!res.success) setErr(res.error);
    else console.log("Submit success:", res.data);

    setPending(false);
  };

  return (
    <>
      <button
        type="submit"
        disabled={pending}
        onClick={handleClick}
        className="flex items-center justify-center min-h-[40px] min-w-[120px]"
      >
        {pending ? (
          <ClipLoader size={36} color="gray" />
        ) : (
          <ReverseUnderlineText label={label} color="white" size="md" />
        )}
      </button>

      {/* ErrorModal: 항상 포털로 브라우저 최상단에 렌더링 */}
      <ErrorModal message={err} onClose={() => setErr("")} />
    </>
  );
};

export default SubmitButton;
