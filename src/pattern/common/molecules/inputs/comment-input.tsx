"use client";
import React, { FC } from "react";
import { FieldSet } from "./fieldset";
import { Label } from "@/components/ui/label";
import { Textarea, TextareaProps } from "@/components/ui/textarea";

interface ICommentInputProps extends TextareaProps {
  label: string;
  value: string;
  setValue: (value: string) => void;
}

export const CommentInput: FC<ICommentInputProps> = ({
  name,
  placeholder,
  onChange,
  label,
  value,
  setValue,
  className,
  ...props
}) => {
  return (
    <FieldSet>
      <Label>{label}</Label>
      <Textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </FieldSet>
  );
};
