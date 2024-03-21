import React, { FC, useState } from "react";
import InputErrorMessage from "../feedback/input-error-message";
import { FieldSet } from "./fieldset";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ICustomInputProps } from "@/pattern/types";
import GreyInfoIcon from "../../atoms/icons/grey-info-icon";

const QRVerificationCodeInput: FC<ICustomInputProps> = ({
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
          <Label>{label}</Label>
          <div className="relative w-full">
            <Input
              name={name}
              value={value}
              onChange={onChange}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              variant={error ? "error" : "default"}
              placeholder={placeholder ?? "803 000 000"}
              {...props}
            />
            <span
              onClick={() => {}}
              className="absolute top-[15px] right-[12px] text-[#08C168] underline font-semibold text-sm cursor-pointer"
            >
              Get code
            </span>
          </div>
          <InputErrorMessage name={`${name}`} />
          <div className="flex items-center gap-2 !mb-4">
            <GreyInfoIcon />
            <p className="text-sm text-[#4f627d]">
              Enter the 6 digit code sent to al***@cbdc.com
            </p>
          </div>
        </FieldSet>
      )}
    />
  );
};

export default QRVerificationCodeInput;
