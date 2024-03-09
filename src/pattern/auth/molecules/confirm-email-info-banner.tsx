import React, { FC } from "react";
import InfoIcon from "@/pattern/common/icons/info-icon";

interface IConfirmEmailInfoBannerProps {
  email: string;
}

const ConfirmEmailInfoBanner: FC<IConfirmEmailInfoBannerProps> = ({
  email,
}) => {
  return (
    <div className='bg-[hsla(207,88%,94%,1)] w-full h-[60px] flex items-start gap-2 text-[hsla(216,36%,11%,1)] py-2 pl-[8px] pr-4 rounded-l-[8px]'>
      <span>
        <InfoIcon />
      </span>
      <p className='text-sm text-inherit font-raleway font-normal leading-22'>
        Password reset link has been sent to your email address
        <span>{email ?? "ex*****@gmail.com"}</span>
      </p>
    </div>
  );
};

export default ConfirmEmailInfoBanner;
