"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { IoMdClose } from "react-icons/io";

import Slider from "@/components/Slider";
import useFileModal from "@/hooks/useFileModal";
import useDownloadFilesConfirm from "@/hooks/useDownloadFilesConfirm";

interface ContactImagsProps {
  images: string[];
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const ContactImages = ({ images, show, setShow }: ContactImagsProps) => {
  const fileModal = useFileModal();
  const downloadImagesConfirm = useDownloadFilesConfirm();

  const handleFilesDownload = () => {
    setShow(false);
    downloadImagesConfirm.onOpen(images);
  };

  const handleFilesUpdate = () => {
    setShow(false);
    fileModal.onOpen();
  };

  return (
    <div>
      {images.length > 0 && (
        <div
          className={`${
            show ? "fixed" : "hidden"
          } inset-0 bg-neutral-800 z-50 flex items-center justify-center`}
        >
          <div
            className="text-white absolute left-10 top-10 cursor-pointer hover:opacity-70 transition"
            onClick={() => setShow(false)}
          >
            <IoMdClose size={32} />
          </div>
          <div className="absolute right-10 top-10 flex gap-2">
            <div
              className="hover:opacity-70 transition p-2 rounded cursor-pointer bg-neutral-100"
              onClick={handleFilesDownload}
            >
              🗂️ 파일저장
            </div>
            <div
              className="cursor-pointer hover:opacity-70 transition bg-sky-100 p-2 rounded"
              onClick={handleFilesUpdate}
            >
              📁 파일수정
            </div>
          </div>
          <Slider images={images} />
        </div>
      )}
    </div>
  );
};

export default ContactImages;
