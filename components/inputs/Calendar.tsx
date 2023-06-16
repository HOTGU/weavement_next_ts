"use client";

import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale"; //한국어 설정

import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date) => void;
  showTime?: boolean;
  disabled?: boolean;
  placeholder?: string;
  isClearable?: boolean;
}

const Calendar: React.FC<DatePickerProps> = ({
  value,
  onChange,
  showTime,
  disabled,
  placeholder,
  isClearable,
}) => {
  return (
    <div className="w-full">
      <DatePicker
        locale={ko}
        onChange={onChange}
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
