import React from "react";
import { Badge } from "@/components/ui/badge";
import MfaCard from "../molecules/mfa-card";
import MfaKeyIcon from "@/pattern/common/atoms/icons/mfa-key-icon";
import QRAuthDialog from "./qr-auth-dialog";
import MfaMessageIcon from "@/pattern/common/atoms/icons/mfa-message-icon";
import PhoneAuthDialog from "./phone-auth-dialog";

const TwoFactorAuthSection = () => {
  return (
    <div>
      <div>
        <p className="text-lg font-medium text-[#202b3c]">
          Two Factor Authenticator <Badge variant="destructive">OFF</Badge>
        </p>
        <p className="text-sm text-[#4f627d]">
          Select authenticator method to get started
        </p>
      </div>

      <MfaCard
        title="Through Authenticator App"
        description="Use an authenticator app such as Odozi MPC Wallet, Google authenticator, 1Passord etc to generate authentication code."
        icon={<MfaKeyIcon />}
        recommended={true}
        linked={false}
        action={<QRAuthDialog />}
      />

      <MfaCard
        title="Through SMS Text Message"
        description="We will send an authentication code your mobile device."
        icon={<MfaMessageIcon />}
        recommended={false}
        linked={false}
        action={<PhoneAuthDialog />}
      />
    </div>
  );
};

export default TwoFactorAuthSection;
