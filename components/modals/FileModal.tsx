"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Modal from "./Modal";
import useFileModal from "@/hooks/useFileModal";
import File from "../inputs/File";
import useCurrentContact from "@/hooks/useCurrentContact";
import { HiXMark } from "react-icons/hi2";

const FileModal = () => {
  const router = useRouter();
  const { current, setCurrent } = useCurrentContact();
  const fileModal = useFileModal();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [filesStr, setFilesStr] = useState<string[]>([]);

  const { handleSubmit, reset } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    const loadingToast = toast.loading("파일수정중..");

    data.images = filesStr;

    if (files.length > 0) {
      try {
        const fd = new FormData();
        fd.append("company", current?.clientCompany || "");

        files.map((file) => fd.append("files", file, file.name));

        const res = await axios.post("/api/contact/file-upload", fd);

        data.images = [...data.images, ...res.data];
      } catch (error) {
        setLoading(false);
        toast.error("파일 업로드 중 오류발생", { id: loadingToast });
        return;
      }
    }

    delete data.client;
    delete data.id;

    axios
      .put(`/api/contact/${current?.id}`, data)
      .then((result) => {
        toast.success("파일수정 성공", { id: loadingToast });
        fileModal.onClose();
        setCurrent(result.data);
        setFiles([]);
        router.refresh();
      })
      .catch(() => toast.error("파일 수정 중 오류발생", { id: loadingToast }))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = useCallback(
    (targetIndex: number) => {
      const deletedFiles = filesStr.filter(
        (__, fileIndex) => targetIndex !== fileIndex
      );

      setFilesStr(deletedFiles);
    },
    [filesStr]
  );

  useEffect(() => {
    reset(current);
    setFilesStr([]);
    if (current && current.images && current.images.length > 0) {
      setFilesStr(current?.images);
    }
  }, [current, reset]);

  if (!current) {
    return null;
  }

  const bodyContent = (
    <>
      <div className=" flex flex-col gap-2">
        <File files={files} setFiles={setFiles} />
        <div className="flex gap-2 flex-wrap">
          {filesStr.map((fileStr, index) => (
            <div
              key={fileStr}
              className="font-light text-zinc-500 px-4 py-2 bg-zinc-100 flex items-center gap-2"
            >
              {fileStr.split("/").pop()?.split("__").pop()}
              <HiXMark
                color="#c23616"
                className="cursor-pointer"
                onClick={() => handleDelete(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <Modal
      isOpen={fileModal.isOpen}
      onClose={fileModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      title="파일수정"
      actionLabel="업로드"
      disabled={loading}
    />
  );
};

export default FileModal;
