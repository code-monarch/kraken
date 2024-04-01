import React, { FC, useState } from "react";
import InputErrorMessage from "../feedback/input-error-message";
import { FieldSet } from "./fieldset";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ICustomInputProps } from "@/pattern/types";
import EmailInputIcon from "../../atoms/icons/email-input-icon";

const SettingsEmailInput: FC<ICustomInputProps> = ({
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
        <div className="flex flex-col items-start space-y-[10px]">
          {/* <Label>{label}</Label> */}
          <div className="space-y-[4px]">
            <div className='relative'>
              <Input
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                variant={error ? "error" : "default"}
                placeholder={placeholder ?? ""}
                {...props}
                className="text-[#08C168] bg-[#f5fffa] border-0 w-fit"
              />
              {/* prefix Icon */}
              <span className='absolute top-[15px] left-[12px]'>
                <EmailInputIcon focused={error ? false : isFocus} />
              </span>
            </div>
            <InputErrorMessage name={`${name}`} />
          </div>
        </div>
      )}
    />
  );
};

export default SettingsEmailInput;
