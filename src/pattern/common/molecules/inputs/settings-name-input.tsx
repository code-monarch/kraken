import React, { FC, useState } from "react";
import InputErrorMessage from "../feedback/input-error-message";
import { FieldSet } from "./fieldset";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ICustomInputProps } from "@/pattern/types";
import EmailInputIcon from "../../atoms/icons/email-input-icon";

const SettingsNameInput: FC<ICustomInputProps> = ({
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
        <div className="space-y-[4px]">
          <Input
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            variant={error ? "error" : "default"}
            placeholder={placeholder ?? ""}
            {...props}
            className="w-fit"
          />
          <InputErrorMessage name={`${name}`} />
        </div>
      )}
    />
  );
};

export default SettingsNameInput;
