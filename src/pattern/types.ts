import { Dispatch, ReactElement, ReactNode, SetStateAction } from "react";
import { FieldError } from "react-hook-form";

export interface IIconProps extends React.SVGAttributes<SVGElement> {
  children?: never;
  color?: string;
  height?: string;
  width?: string;
  className?: string;
}
export interface ITypographyProps {
  children: string | ReactNode;
  className?: string;
}
export interface IInputIconProps extends IIconProps {
  focused?: boolean; // input focus state
  togglePasswordInput?: boolean; // password input visible state
}
export interface ICustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: FieldError;
  prefixIcon?: ReactElement;
  suffixIcon?: ReactElement;
  disabled?: boolean;
}

export interface IListType {
  label: string;
  value: string;
}

export enum UserType {
  "Pilgrim",
  "Agent",
}

export enum Status {
  "active",
  "inactive",
}
export interface ITransactionsTableHeaderProps {
  searchQuery: string
  setSearchQuery: Dispatch<SetStateAction<string>>
  status: 'all' | 'COMPLETED' | 'PENDING' | 'FAILED' | undefined
  setStatus: Dispatch<
    SetStateAction<'all' | 'COMPLETED' | 'PENDING' | 'FAILED' | undefined>
  >
  order: 'asc' | 'desc' 
  setOrder: Dispatch<SetStateAction<'asc' | 'desc'>>,
  startDate: string,
  setStartDate: Dispatch<SetStateAction<string>>
  endDate: string,
  setEndDate: Dispatch<SetStateAction<string>>
  transactionType: 'all' | 'Trade' | 'Withdrawal' | 'Swap' | 'Deposit' | undefined
  setTransactionType: Dispatch<
    SetStateAction<
     'all' | 'Trade' | 'Withdrawal' | 'Swap' | 'Deposit' | undefined
    >
  >
  totalTransations: number
}