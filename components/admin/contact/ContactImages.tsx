"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { IoMdClose } from "react-icons/io";

import Slider from "@/components/Slider";
import useFileModal from "@/hooks/useFileModal";
import axios from "axios";
import { toast } from "react-hot-toast";

interface ContactImagsProps {
  images: string[];
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const ContactImages = ({ images, show, setShow }: ContactImagsProps) => {
  const fileModal = useFileModal();
  const [loading, setLoading] = useState(false);

  const handleImagesDownload = async () => {
    if (loading) {
      return;
    }
    const loadingToast = toast.loading("다운로드중..");
    setLoading(true);
    try {
      images.map(async (image: string) => {
        const key = image.split("com/")[1]; // ex)CONTACT/production/올리/2023년10월3일6시59분__DSC_1255.JPG
        const keyArrayOfSlash = key.split("/"); // ex) ["CONTACT", "production", "올리", "2023년10월3일6시59분__DSC_1255.JPG"]
        const fileNameArray = keyArrayOfSlash.filter((item, index) => {
          if (index === 0 || index === 1) {
            return false;
          }

          return true;
        }); // ex) ["올리", "2023년10월3일6시59분__DSC_1255.JPG"]
        const fileNameStr = fileNameArray.join("-");

        const { data } = await axios.post("/api/contact/file-download", {
          key,
        });
        const a = window.document.createElement("a");
        a.href = `data:${data.contentType};base64,${data.base64Data}`;
        a.download = `${fileNameStr}`;
        a.click();
        toast.success("파일 다운로드 성공", {
          id: loadingToast,
        });
      });
    } catch (error) {
      toast.error("파일 다운로드 실패", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const handleImagesUpdate = () => {
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
              className={`hover:opacity-70 transition p-2 rounded ${
                loading
                  ? "cursor-not-allowed bg-neutral-300"
                  : "cursor-pointer bg-neutral-100"
              }`}
              onClick={handleImagesDownload}
            >
              🗂️ 파일저장
            </div>
            <div
              className="cursor-pointer hover:opacity-70 transition bg-sky-100 p-2 rounded"
              onClick={handleImagesUpdate}
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
