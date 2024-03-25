import React, { FC, useState } from "react";
import InputErrorMessage from "../feedback/input-error-message";
import { FieldSet } from "./fieldset";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ICustomInputProps } from "@/pattern/types";
import PasswordInputIcon from "../../atoms/icons/password-input-icon";
import PasswordInputToggle from "../../atoms/icons/password-input-toggle-icon";

const PasswordInput: FC<ICustomInputProps> = ({
  name,
  label,
  error,
  placeholder,
}) => {
  const { control } = useFormContext();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [toggleinputType, setToggleinputType] = useState<boolean>(false);

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
                type={toggleinputType ? "password" : "text"}
                onChange={onChange}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                variant={error ? "error" : "default"}
                placeholder={placeholder ?? "Enter password"}
                className='pr-[40px]'
              />
              {/* prefix Icon */}
              <span className='absolute top-[15px] left-[12px]'>
                <PasswordInputIcon focused={error ? false : isFocus} />
              </span>

              {/* Suffix Icon */}
              <span
                className='absolute top-[13px] right-[12px]'
                onClick={() => setToggleinputType(!toggleinputType)}
              >
                <PasswordInputToggle togglePasswordInput={toggleinputType} />
              </span>
            </div>
            <InputErrorMessage name={`${name}`} />
          </div>
        </FieldSet>
      )}
    />
  );
};

export default PasswordInput;
