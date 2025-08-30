import React from "react";

interface TextareaProps {
  label: string;
  disabled?: boolean;
  required?: boolean;
  name: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  disabled,
  required,
  name,
}) => {
  return (
    <div className="w-full relative">
      <textarea
        disabled={disabled}
        id={name}
        name={name}
        placeholder=" "
        required={required}
        rows={5}
        className={`peer w-[80%] text-lg text-stone-400 bg-transparent mt-10 pb-4 z-10 font-light border-b border-stone-400 hover:border-white focus:border-white focus:text-white outline-none transition disabled:cursor-not-allowed resize-none custom-scroll`}
        autoComplete="off"
      />
      <label
        htmlFor={name}
        className={`absolute text-lg duration-150 transform text-stone-400 top-2 scale-75 z-[0] origin-[0] left-0 hover:cursor-text 
          peer-placeholder-shown:scale-100 peer-placeholder-shown:top-12 
          peer-focus:scale-75 peer-focus:top-0`}
      >
        {label}
      </label>
    </div>
  );
};

export default Textarea;
