import { ReactNode } from "react";

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
