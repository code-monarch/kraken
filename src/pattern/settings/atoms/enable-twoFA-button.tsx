import React, { FC } from "react";
import { Button, ButtonProps } from "@/components/ui/button";

interface IEnableTwoFAButtonProps extends ButtonProps {}

const EnableTwoFAButton: FC<IEnableTwoFAButtonProps> = ({ onClick, disabled }) => {
  return (
    <Button
    //   className='bg-secondary py-3 px-6 rounded-[6px] text-base font-semibold text-white'
      onClick={onClick}
      variant="secondary"
      disabled={disabled}
    >
      Enable
    </Button>
  );
};

export default EnableTwoFAButton;
