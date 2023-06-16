import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  useController,
} from "react-hook-form";

interface TextareaProps {
  control: Control<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
  disabled?: boolean;
  label: string;
  name: string;
}

const Textarea = ({
  control,
  errors,
  required,
  disabled,
  label,
  name,
}: TextareaProps) => {
  const { field } = useController({
    name,
    control,
    rules: { required },
  });

  return (
    <div className={`w-full relative`}>
      <textarea
        placeholder=" "
        name={name}
        disabled={disabled}
        onChange={field.onChange}
        value={field.value}
        className={`peer w-full min-h-[250px] p-4 resize-none outline-none bg-white border focus:border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 ${
          errors[name]
            ? "border-rose-300 h-full focus:border-rose-500"
            : " border-neutral-300 focus:border-black"
        }`}
      />

      <label
        className={`absolute text-md duration-150 origin-[0] top-0 left-5 scale-75 bg-white -translate-y-1/2 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-4 peer-focus:scale-75 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-white ${
          errors[name] ? "text-rose-500" : "text-zinc-400 peer-focus:text-black"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default Textarea;
