"use client";

import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale"; //한국어 설정
import { parseISO } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";
import { Control, useController } from "react-hook-form";
import { useMemo } from "react";

interface DatePickerProps {
  showTime?: boolean;
  disabled?: boolean;
  placeholder?: string;
  isClearable?: boolean;
  control?: Control;
  name: string;
}

const Calendar: React.FC<DatePickerProps> = ({
  showTime,
  disabled,
  placeholder,
  isClearable,
  name,
  control,
}) => {
  const { field } = useController({ name, control });

  const value = useMemo(() => {
    let fieldValue = field.value;
    if (typeof fieldValue === "string") {
      fieldValue = parseISO(fieldValue);
    }
    return fieldValue;
  }, [field.value]);

  return (
    <div className="w-full">
      <DatePicker
        locale={ko}
        onChange={field.onChange}
        selected={value}
        showTimeSelect={showTime}
        dateFormat={showTime ? "yy년MM월dd일 HH시mm분" : "yy년 MM월 dd일"}
        disabled={disabled}
        wrapperClassName="w-full"
        className="w-full border border-neutral-300 transition cursor-pointer p-4 rounded hover:opacity-70"
        placeholderText={placeholder}
        isClearable={isClearable}
      />
    </div>
  );
};

export default Calendar;
