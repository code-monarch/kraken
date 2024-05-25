import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import MfaCard from "../molecules/mfa-card";
import MfaKeyIcon from "@/pattern/common/atoms/icons/mfa-key-icon";
import QRAuthDialog from "./qr-auth-dialog";
import MfaMessageIcon from "@/pattern/common/atoms/icons/mfa-message-icon";
import PhoneAuthDialog from "./phone-auth-dialog";
import EnableTwoFAButton from "../atoms/enable-twoFA-button";
import { show } from "@ebay/nice-modal-react";
import { Button } from "@/components/ui/button";

interface IProps {
  twoFactorActivated: boolean;
}

const TwoFactorAuthSection = ({twoFactorActivated}: IProps) => {
  // const [mfaActivated, setMfaActivated] = useState<boolean>(false);
  return (
    <div  className='space-y-4'>
      <div className='space-y-1'>
        <div className='text-lg font-medium text-[#202b3c]'>
          Two Factor Authenticator{" "}
          {twoFactorActivated ? (
            <Badge variant='active'>ON</Badge>
          ) : (
            <Badge variant='off'>OFF</Badge>
          )}
        </div>
        <p className='text-sm text-[#4f627d]'>
          Select authenticator method to get started
        </p>
      </div>

      <MfaCard
        title='Through Authenticator App'
        description='Use an authenticator app such as Odozi MPC Wallet, Google authenticator, 1Passord etc to generate authentication code.'
        icon={<MfaKeyIcon />}
        recommended={true}
        linked={false}
        action={<EnableTwoFAButton onClick={() => show(QRAuthDialog)} />}
      />

      <MfaCard
        title='Through SMS Text Message'
        description='We will send an authentication code your mobile device.'
        icon={<MfaMessageIcon />}
        recommended={false}
        linked={twoFactorActivated}
        action={<EnableTwoFAButton disabled={twoFactorActivated} onClick={() => show(PhoneAuthDialog)} />}
      />
    </div>
  );
};

export default TwoFactorAuthSection;
