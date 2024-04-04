import React, { FC, useState } from "react";
import InputErrorMessage from "../feedback/input-error-message";
import { FieldSet } from "./fieldset";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ICustomInputProps } from "@/pattern/types";
import EmailInputIcon from "../../atoms/icons/email-input-icon";
import Hidden from "../data-display/hidden";

const EmailInput: FC<ICustomInputProps> = ({
  name,
  label,
  error,
  placeholder,
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
          {/* Label */}
          <Hidden visible={!!label}>
            <Label>{label}</Label>
          </Hidden>
          
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
              <span className='absolute top-[15px] left-[12px]'>
                <EmailInputIcon focused={error ? false : isFocus} />
              </span>
            </div>
            <InputErrorMessage name={`${name}`} />
          </div>
        </FieldSet>
      )}
    />
  );
};

export default EmailInput;
