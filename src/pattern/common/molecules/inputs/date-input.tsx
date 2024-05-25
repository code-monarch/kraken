"use client";
import React, { FC, useState } from "react";
import { Input } from "@/components/ui/input";
import { ICustomInputProps } from "@/pattern/types";
import { FieldSet } from "./fieldset";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "../../atoms/icons/calendar-icon";

// Component which acts as a trigger in displaying Calendar component
const DateInput: FC<ICustomInputProps> = ({
  name,
  placeholder,
  error,
  label,
  suffixIcon,
  value,
  onChange,
  ...props
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <>
      <FieldSet>
        <Label>{label}</Label>
        <div className='w-full space-y-[4px]'>
          <div className='relative w-full'>
            <Input
              name={name}
              value={value}
              onChange={onChange}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              variant={error ? "error" : "default"}
              placeholder={placeholder ?? "DD / MM / YYYY"}
              readOnly
              className='pl-[12px] pr-[40px]'
              {...props}
            />
            {/* suffix Icon */}
            <span className='absolute top-[15px] right-[12px]'>
              <CalendarIcon />
            </span>
          </div>
        </div>
      </FieldSet>
    </>
  );
};

export default DateInput;
