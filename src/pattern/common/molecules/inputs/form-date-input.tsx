"use client";
import React, { FC, useState } from "react";
import { Input } from "@/components/ui/input";
import { ICustomInputProps } from "@/pattern/types";
import { FieldSet } from "./fieldset";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import InputErrorMessage from "../feedback/input-error-message";
import DateInputIcon from "../../atoms/icons/date-input-icon";

// Component which acts as a trigger in displaying Calendar component
export const FormDateInput: FC<ICustomInputProps> = ({
  name,
  placeholder,
  error,
  label,
  suffixIcon,
  ...props
}) => {
  const { control } = useFormContext();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <Controller
      name={name!}
      control={control}
      render={({ field: { value, name, onChange } }) => (
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
                  <DateInputIcon focused={isFocus} />
                </span>
            </div>
            <InputErrorMessage name={`${name}`} />
          </div>
        </FieldSet>
      )}
    />
  );
};
