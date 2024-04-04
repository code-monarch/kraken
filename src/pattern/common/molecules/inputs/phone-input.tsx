import React, { FC } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FieldSet } from "./fieldset";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";
import InputErrorMessage from "../feedback/input-error-message";
import { ICustomInputProps } from "@/pattern/types";

const PhoneNumberInput: FC<ICustomInputProps> = ({ name, label }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name!}
      control={control}
      render={({ field: { value, name, onChange } }) => (
        <FieldSet>
          <Label>{label ?? "Phone Number"}</Label>
          <PhoneInput
            country={"ng"}
            value={value}
            onChange={onChange}
            enableSearch={true}
            disableSearchIcon
            inputProps={{ name: `${name}` }}
            containerClass={cn(
              "min-h-[48px] h-full w-full flex items-center font-medium font-raleway !py-0 !px-0 border border-[hsla(213,27%,84%,1)] rounded-[6px] transition-colors",
              "hover:border-primary focus:outline-none focus-within:border-primary focus-within:ring-[3px] focus-within:ring-[hsla(145,63%,42%,0.25)] rounded-[6px]",
              "disabled:cursor-not-allowed disabled:bg-border disabled:border-border"
            )}
            inputClass='min-w-full w-full min-h-[48px] h-full bg-transparent appearance-none font-[500] !font-raleway text-[1.125rem] text-[hsla(216,26%,30%,1)] py-[16px] ml-[8px] placeholder:text-sm !border-none !outline-none'
            buttonClass='!bg-[hsla(204,33%,97%,1)] appearance-none !font-raleway text-[1.125rem] px-[8px] border-none hover:bg-transparent focus:bg-transparent focus-within:bg-transparent outlone-y-none outline-l-none rounded-l-[6px] hover:!rounded-l-[6px] !shadow-none'
            searchClass='placeholder:!font-raleway'
          />
          <InputErrorMessage name={`${name}`} />
        </FieldSet>
      )}
    />
  );
};

export default PhoneNumberInput;
