"use client";

import React, { Dispatch, SetStateAction } from "react";
import { ImFolderUpload } from "react-icons/im";
import { IoMdClose } from "react-icons/io";

import Slider from "@/components/Slider";
import useFileModal from "@/hooks/useFileModal";

interface ContactImagsProps {
  images: string[];
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const ContactImages = ({ images, show, setShow }: ContactImagsProps) => {
  const fileModal = useFileModal();
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
          <div
            className="text-white absolute right-10 top-10 cursor-pointer hover:opacity-70 transition bg-accent p-2 rounded"
            onClick={() => {
              setShow(false);
              fileModal.onOpen();
            }}
          >
            <ImFolderUpload />
          </div>
          <Slider images={images} />
        </div>
      )}
    </div>
  );
};

export default ContactImages;
