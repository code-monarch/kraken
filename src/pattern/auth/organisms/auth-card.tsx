import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BrandLogoIcon from "@/pattern/common/icons/brand-logo-icon";
import { cn } from "@/lib/utils";

interface IAuthCardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title: string;
  description: string;
}

const AuthCard: FC<IAuthCardProps> = ({
  title,
  description,
  className,
  children,
}) => {
  return (
    <div className='w-[401px] flex flex-col items-center gap-y-24'>
      <BrandLogoIcon />

      <Card className={cn("w-full min-h-[337px] h-fit", className)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default AuthCard;
