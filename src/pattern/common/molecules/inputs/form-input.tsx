import React, { FC, useState } from "react";
import InputErrorMessage from "../feedback/input-error-message";
import { FieldSet } from "./fieldset";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ICustomInputProps } from "@/pattern/types";
import Hidden from "../data-display/hidden";

const FormInput: FC<ICustomInputProps> = ({
  name,
  label,
  error,
  placeholder,
  prefixIcon,
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
                placeholder={placeholder ?? "example@gmail.com"}
                {...props}
              />
              {/* prefix Icon */}
              <Hidden visible={!!prefixIcon}>
                <span className='absolute top-[15px] left-[12px]'>
                  {prefixIcon}
                </span>
              </Hidden>
              {/* suffix Icon */}
              <Hidden visible={!!suffixIcon}>
                <span className='absolute top-[15px] right-[12px]'>
                  {suffixIcon}
                </span>
              </Hidden>
            </div>
            <InputErrorMessage name={`${name}`} />
          </div>
        </FieldSet>
      )}
    />
  );
};

export default FormInput;
