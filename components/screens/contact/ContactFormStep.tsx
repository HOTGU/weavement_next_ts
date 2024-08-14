import React from "react";
import { STEPS } from "./ContactClient";
import { FaCheck } from "react-icons/fa";

const ContactFormStep = ({ step }: { step: STEPS }) => {
  return (
    <div className="flex justify-around items-center mb-2 font-bold">
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full border ${
          step === STEPS.INFO
            ? "bg-accent text-white"
            : "bg-accent/70 text-white"
        }`}
      >
        {step === STEPS.INFO ? "1" : <FaCheck />}
      </div>
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full border ${
          step === STEPS.DESC
            ? "bg-accent text-white"
            : step > STEPS.DESC && "bg-accent/70 text-white"
        }`}
      >
        {step > STEPS.DESC ? <FaCheck /> : "2"}
      </div>
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full border ${
          step === STEPS.CLIENT
            ? "bg-accent text-white"
            : step > STEPS.CLIENT && "bg-accent/70 text-white"
        }`}
      >
        {step > STEPS.CLIENT ? <FaCheck /> : "3"}
      </div>
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full border ${
          step === STEPS.ACCEPT ? "bg-accent text-white" : ""
        }`}
      >
        4
      </div>
    </div>
  );
};

export default ContactFormStep;
