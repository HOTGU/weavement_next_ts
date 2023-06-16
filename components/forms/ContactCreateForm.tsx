"use client";

import React from "react";
import Heading from "../Heading";
import Button from "../Button";

interface ContactCreateFormProps {
  actionLabel: string;
  onSubmit: () => void;
  secondaryActionLabel?: string;
  secondaryAction?: () => void;
  disabled: boolean;
  content: React.ReactElement;
  headingContent: {
    title: string;
    subtitle: string;
  };
}

const ContactCreateForm = ({
  actionLabel,
  onSubmit,
  secondaryAction,
  secondaryActionLabel,
  disabled,
  content,
  headingContent,
}: ContactCreateFormProps) => {
  return (
    <div className=" w-full md:w-3/5 lg:w-1/2 xl:w-2/5 mx-auto rounded flex flex-col border border-zinc-200 min-h-[75vh]">
      <div className="p-4">
        <Heading
          title={headingContent.title}
          subtitle={headingContent.subtitle}
        />
      </div>
      <hr />
      <div className="flex-auto p-4">{content}</div>
      <hr />
      <div className="flex gap-4 p-4">
        {secondaryAction && secondaryActionLabel && (
          <Button
            label={secondaryActionLabel}
            onClick={secondaryAction}
            outline
            disabled={disabled}
            small
          />
        )}
        <Button label={actionLabel} onClick={onSubmit} disabled={disabled} />
      </div>
    </div>
  );
};

export default ContactCreateForm;
