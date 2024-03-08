import React, { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BrandLogoIcon from "@/pattern/common/icons/brand-logo-icon";

interface IAuthCardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title: string;
  description: string;
}

const AuthCard: FC<IAuthCardProps> = ({ title, description, children }) => {
  return (
    <div className='w-[401px] flex flex-col items-center gap-y-24'>
      <BrandLogoIcon />

      <Card className='w-full min-h-[457px]'>
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
