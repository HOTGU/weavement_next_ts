"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import Modal from "./Modal";
import useFileModal from "@/hooks/useFileModal";
import File from "../inputs/File";
import useCurrentContact from "@/hooks/useCurrentContact";
import FilesName from "../FilesName";

const FileModal = () => {
  const router = useRouter();
  const { current, setCurrent } = useCurrentContact();
  const fileModal = useFileModal();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control, watch, setValue } = useForm<FieldValues>({
    values: useMemo(() => {
      return { ...current, files: [] };
    }, [current]),
  });

  const watchFiles = watch("files");
  const watchImages = watch("images");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    const loadingToast = toast.loading("파일수정중..");

    delete data.client;
    delete data.id;

    if (data.files.length > 0) {
      const fd = new FormData();

      for (let key in data) {
        if (key === "files") {
          data.files.map((file: Blob) => fd.append("files", file, file.name));
        }
      }

      fd.append("company", data.clientCompany);

      try {
        const res = await axios.post("/api/contact/file-upload", fd);
        if (res.status === 200) {
          data.images = [...data.images, ...res.data];
        }
      } catch (error) {
        toast.error("사진 올리는 도중 오류발생", { id: loadingToast });
        setLoading(false);
        return;
      }
    }

    delete data.files;

    axios
      .put(`/api/contact/${current?.id}`, data)
      .then((result) => {
        toast.success("파일수정 성공", { id: loadingToast });
        fileModal.onClose();
        setCurrent(result.data);
        router.refresh();
      })
      .catch(() => toast.error("파일 수정 중 오류발생", { id: loadingToast }))
      .finally(() => {
        setLoading(false);
      });
  };

  if (!current) {
    return null;
  }

  const bodyContent = (
    <div className=" flex flex-col gap-2">
      <File control={control} name="files" multiple compressWidth={760} />
      <div className="flex gap-2 flex-wrap">
        {watchImages && (
          <FilesName type="images" files={watchImages} setValue={setValue} />
        )}
        {watchFiles && (
          <FilesName type="files" files={watchFiles} setValue={setValue} />
        )}
      </div>
    </div>
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
