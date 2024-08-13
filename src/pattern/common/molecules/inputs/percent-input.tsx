"use client"
import React, { FC, useState } from "react";
import InputErrorMessage from "../feedback/input-error-message";
import { FieldSet } from "./fieldset";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ICustomInputProps } from "@/pattern/types";
import PercentIcon from "../../atoms/icons/percent-icon";

const PercentInput: FC<Omit<ICustomInputProps, "suffixIcon">> = ({
  name,
  label,
  error,
  placeholder,
  prefixIcon,
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
                type="number"
                onChange={onChange}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                variant={error ? "error" : "default"}
                placeholder={placeholder ?? "Type here"}
                className='min-w-full pl-2 no-increment'
                {...props}
              />
              <span className='absolute top-[15px] right-[12px]'>
                <PercentIcon />
              </span>
            </div>
            <InputErrorMessage name={`${name}`} />
          </div>
        </FieldSet>
      )}
    />
  );
};

export default PercentInput;
