"use client";

import React, { useCallback, useEffect, useState } from "react";
import Button from "../Button";

interface ConfirmProps {
  isOpen: boolean;
  onSubmit: () => void;
  onClose: () => void;
  text: string;
  disabled?: boolean;
}

const Confirm = ({
  isOpen,
  onClose,
  onSubmit,
  text,
  disabled,
}: ConfirmProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex items-center justify-center fixed overflow-x-hidden overflow-y-auto inset-0 z-[60] ouline-none bg-neutral-800/70">
      <div className="relative w-96 my-6 mx-auto h-auto">
        <div
          className={` translate duration-300 h-full ${
            showModal
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
        >
          <div className="translate h-full md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="p-4 flex-auto text-xl">{text}</div>
            <div className="flex items-center gap-4 w-full justify-end p-4">
              <div className="w-1/5">
                <Button
                  disabled={disabled}
                  label="아니오"
                  onClick={handleClose}
                  outline
                  small
                />
              </div>
              <div className="w-1/5">
                <Button
                  small
                  disabled={disabled}
                  label="네"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
