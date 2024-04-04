import React, { FC, useState } from "react";
import InputErrorMessage from "../feedback/input-error-message";
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
        <div className='flex flex-col items-start space-y-[10px]'>
          <div className='space-y-[4px]'>
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
                className='w-fit bg-[#f5fffa] text-primary border-0'
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
