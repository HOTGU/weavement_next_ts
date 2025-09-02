"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Option = { value: string; label: string };

interface SelectProps {
  label: string;
  name: string;
  options: Option[];
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string; // 바깥 래퍼 커스터마이즈용
  menuClassName?: string; // 드롭다운 스타일 커스터마이즈용
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  defaultValue,
  disabled,
  required,
  className = "",
  menuClassName = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const initial = useMemo(
    () => options.find((o) => o.value === defaultValue) ?? null,
    [options, defaultValue]
  );
  const [selected, setSelected] = useState<Option | null>(initial);

  // 바깥 클릭 닫기
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [open]);

  // 키보드 ESC로 닫기(간단 버전)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div ref={containerRef} className={`w-full relative ${className}`}>
      {/* 폼 제출용 hidden input */}
      <input
        className=" opacity-0 h-[1px] absolute left-0 bottom-0"
        name={name}
        value={selected?.value ?? ""}
        required={required}
        readOnly
      />

      {/* 트리거 버튼: Input과 동일한 톤 */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`group w-[80%] text-lg text-stone-400 bg-transparent pt-10 pb-4 z-10 font-light border-b border-stone-400 hover:border-white focus:border-white focus:text-white outline-none transition disabled:cursor-not-allowed text-left`}
      >
        <span className="group-hover:text-white">
          {selected?.label || label}
        </span>
      </button>

      {open && (
        <div
          className={`absolute left-0 w-[80%] max-h-60 overflow-auto custom-scroll bg-neutral-900 z-50 ${menuClassName}`}
        >
          {options.map((opt) => {
            return (
              <div
                key={opt.value}
                tabIndex={0}
                onClick={() => {
                  setSelected(opt);
                  setOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelected(opt);
                    setOpen(false);
                  }
                }}
                className="px-4 py-2 text-lg font-thin font-ibm text-white hover:text-stone-400 cursor-pointer"
              >
                {opt.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
