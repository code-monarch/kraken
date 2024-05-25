"use client";
import React, { FC, useState } from "react";
import { inputVariants } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { FieldSet } from "@/pattern/common/molecules/inputs/fieldset";
import { Label } from "@radix-ui/react-dropdown-menu";

const statuses = [
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

interface ISelectNewVerificationStatusWidgetProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label: string;
  value: "pending" | "approved" | "rejected";
  setValue: (value: "pending" | "approved" | "rejected") => void;
}

export const SelectNewVerificationStatusWidget: FC<
  ISelectNewVerificationStatusWidgetProps
> = ({
  name,
  placeholder,
  onChange,
  value,
  variant,
  className,
  label,
  setValue,
  ...props
}) => {
  return (
    <FieldSet>
      <Label className='text-sm text-[#6D7786]'>{label}</Label>
      <Select
        defaultValue={statuses[0].value}
        value={value}
        onValueChange={setValue}
      >
        <SelectTrigger
          className={cn(inputVariants({ variant, className }), "pl-3")}
        >
          <SelectValue placeholder='Select new status' />
        </SelectTrigger>
        <SelectContent>
          {statuses.map(({ label, value }) => (
            <SelectItem key={value} value={`${value}`}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FieldSet>
  );
};
