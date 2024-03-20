import React, { FC, useState } from "react";
import InputErrorMessage from "../feedback/input-error-message";
import { FieldSet } from "./fieldset";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ICustomInputProps } from "@/pattern/types";
import GreyInfoIcon from "../../atoms/icons/grey-info-icon";

const AuthenticatorCodeInput: FC<ICustomInputProps> = ({
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
          <InputErrorMessage name={`${name}`} />
          <div className="flex items-center gap-2 !mb-4">
            <GreyInfoIcon />
            <p className="text-sm text-[#4f627d]">
              Enter the 6 digit code from your authenticator app.
            </p>
          </div>
        </FieldSet>
      )}
    />
  );
};

export default AuthenticatorCodeInput;
