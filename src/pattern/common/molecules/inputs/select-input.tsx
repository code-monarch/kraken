"use client";
import React, { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { inputVariants } from "@/components/ui/input";
import { VariantProps } from "class-variance-authority";
import { FieldSet } from "./fieldset";
import { Label } from "@/components/ui/label";

interface ISelectInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  options: { label: string; value: string }[];
  label: string;
  value: string;
  setValue: (value: string) => void;
}

const SelectInput: FC<ISelectInputProps> = ({
  options,
  label,
  placeholder,
  value,
  setValue,
}) => {
  return (
    <FieldSet>
      <Label>{label}</Label>
      <Select
        value={value}
        onValueChange={setValue}
        defaultValue={options[0]?.value}
      >
        <SelectTrigger className={cn(inputVariants(), "pl-3")}>
          <SelectValue placeholder={`${placeholder}` ?? "Select option"} />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ label, value }) => (
            <SelectItem key={value} value={`${value}`}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FieldSet>
  );
};

export default SelectInput;
