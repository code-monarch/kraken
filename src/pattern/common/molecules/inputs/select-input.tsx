'use client'
import React, { FC } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { inputVariants } from '@/components/ui/input'
import { VariantProps } from 'class-variance-authority'
import { FieldSet } from './fieldset'
import { Label } from '@/components/ui/label'
import { Controller, useFormContext } from 'react-hook-form'
import InputErrorMessage from '../feedback/input-error-message'

interface ISelectInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  options: { label: string; value: string }[]
  label: string
  // value: string
  // setValue: (value: string) => void
}

const SelectInput: FC<ISelectInputProps> = ({
  options,
  label,
  placeholder,
  // value,
  // setValue,
  name,
}) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name!}
      control={control}
      render={({ field: { value, name, onChange, onBlur } }) => (
        <FieldSet>
          <Label>{label}</Label>
          <Select
            name={name}
            value={value}
            onValueChange={onChange}
            defaultValue={''}
          >
            <SelectTrigger className={cn(inputVariants(), 'pl-3')}>
              <SelectValue placeholder={`${placeholder}` ?? 'Select option'} />
            </SelectTrigger>
            <SelectContent>
              {options.map(({ label, value }) => (
                <SelectItem key={value} value={`${value}`}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <InputErrorMessage name={`${name}`} />
        </FieldSet>
      )}
    />
  )
}

export default SelectInput
