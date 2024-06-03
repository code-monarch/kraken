import React, { FC } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import LoadingButton from "@/pattern/common/molecules/controls/loading-button";

interface IEnableTwoFAButtonProps extends ButtonProps {
  loading?: boolean;
  activated: boolean;
}

const EnableTwoFAButton: FC<IEnableTwoFAButtonProps> = ({ onClick, disabled, loading, activated }) => {
  return (
    <LoadingButton
    //   className='bg-secondary py-3 px-6 rounded-[6px] text-base font-semibold text-white'
      onClick={onClick}
      variant={activated ? "destructive" : "secondary"}
      disabled={disabled}
      loading={loading}
    >
      {activated ? "Disable" : "Enable"}
    </LoadingButton>
  );
};

export default EnableTwoFAButton;
