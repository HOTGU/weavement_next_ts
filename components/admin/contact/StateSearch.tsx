"use client";

import React from "react";

import { GiLoveLetter } from "react-icons/gi";
import { BiHeadphone } from "react-icons/bi";
import { FaHandshake, FaSadTear } from "react-icons/fa";
import { ImHappy2 } from "react-icons/im";

import { useSearchParams } from "next/navigation";
import StateBlock from "./StateBlock";

export const status = [
  { label: "문의", icon: GiLoveLetter },
  { label: "상담", icon: BiHeadphone },
  { label: "계약", icon: FaHandshake },
  { label: "불발", icon: FaSadTear },
  { label: "완료", icon: ImHappy2 },
];

const StateSearch = () => {
  const params = useSearchParams();

  return (
    <div className="w-full sm:w-fit flex items-center justify-between px-10 gap-4">
      {status.map((state) => (
        <StateBlock
          key={state.label}
          selected={params?.get("state") === state.label}
          label={state.label}
          icon={state.icon}
        />
      ))}
    </div>
  );
};

export default StateSearch;
