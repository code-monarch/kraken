"use client";
import React, { FC, useState } from "react";
import { Input, inputVariants } from "@/components/ui/input";
import { SearchInputIcon } from "../../atoms/icons/search-input-icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sortBy = [
  { label: "Ascending", value: "ascending" },
  { label: "Descending", value: "descending" },
];

interface IFilterInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  order: string;
  setOrder: (value: string) => void;
}

export const FilterSelectInput: FC<IFilterInputProps> = ({
  name,
  placeholder,
  onChange,
  value,
  variant,
  className,
  order,
  setOrder,
  ...props
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <div className="relative w-full">
      <Select
        defaultValue={sortBy[0].value}
        value={order}
        onValueChange={setOrder}
      >
        <SelectTrigger
          className={cn(inputVariants({ variant, className }), "pl-3")}
        >
          <span className="text-[#94A3B8] text-base font-normal">Sort by:</span>
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          {sortBy.map(({ label, value }) => (
            <SelectItem key={value} value={`${value}`}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
