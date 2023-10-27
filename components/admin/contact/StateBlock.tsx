"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import React, { useCallback } from "react";
import { IconType } from "react-icons";

interface StateBlockProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const StateBlock = ({ icon: Icon, label, selected }: StateBlockProps) => {
  const params = useSearchParams();
  const router = useRouter();

  const onClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      state: label,
    };

    if (params?.get("state") === label) {
      delete updatedQuery.state;
    }

    const url = qs.stringifyUrl(
      { url: "/admin/contact", query: updatedQuery },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={onClick}
      className={`flex flex-col justify-center items-center hover:text-accent transition cursor-pointer ${
        selected ? "text-accent" : "text-neutral-500"
      }`}
    >
      <Icon size={24} />
      <div className=" font-medium text-xs">{label}</div>
    </div>
  );
};

export default StateBlock;
