import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import MfaCard from "../molecules/mfa-card";
import MfaKeyIcon from "@/pattern/common/atoms/icons/mfa-key-icon";
import ScanQrDialog from "./scan-qr-dialog";
import MfaMessageIcon from "@/pattern/common/atoms/icons/mfa-message-icon";
import ToggleSms2FaDialog from "./toggle-sms-2fa-dialog";
import EnableTwoFAButton from "../atoms/enable-twoFA-button";
import { show } from "@ebay/nice-modal-react";
import { useGenerateTotpMutation } from "@/redux/services/two-factor/totp.api-slice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { SuccessModal } from "@/pattern/common/organisms/success-modal";
import DisableTotpDialog from "./disable-totp-dialog";
import { toast } from "sonner";

const TwoFactorAuthSection = () => {
  // const [mfaActivated, setMfaActivated] = useState<boolean>(false);

  const sms2Fa = useSelector((state: RootState) => state.userDetails?.sms2fa);
  const totp2Fa = useSelector(
    (state: RootState) => state.userDetails?.google2fa
  );

  const twoFactorActivated = sms2Fa || totp2Fa;

  const [generateTotp, { isLoading, isSuccess, isError }] =
    useGenerateTotpMutation();

  const toggleTotp = () => {
    generateTotp()
      .unwrap()
      .then((res) => {
        if (!totp2Fa) {
          show(ScanQrDialog, {
            secret: res.data.secret,
            qrCode: res.data.qr_code,
          });
        } else {
          show(DisableTotpDialog)
        }
      })
      .catch((err) => {
        toast.error("Unexpected error", {
          description: `${
            err?.data?.responseMessage ??
            "An error occured while trying to complete the action. Please try again"
          }`,
          duration: 8000,
          cancel: {
            label: "Cancel",
            onClick: () => console.log("Cancel!"),
          },
        });
      })
  };
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <div className="text-lg font-medium text-[#202b3c]">
          Two Factor Authenticator{" "}
          {twoFactorActivated ? (
            <Badge variant="active">ON</Badge>
          ) : (
            <Badge variant="off">OFF</Badge>
          )}
        </div>
        <p className="text-sm text-[#4f627d]">
          Select authenticator method to get started
        </p>
      </div>

      <MfaCard
        title="Through Authenticator App"
        description="Use an authenticator app such as Odozi MPC Wallet, Google authenticator, 1Passord etc to generate authentication code."
        icon={<MfaKeyIcon />}
        recommended={true}
        linked={totp2Fa!}
        action={
          <EnableTwoFAButton
            activated={totp2Fa!}
            loading={isLoading}
            onClick={toggleTotp}
          />
        }
      />

      <MfaCard
        title="Through SMS Text Message"
        description="We will send an authentication code your mobile device."
        icon={<MfaMessageIcon />}
        recommended={false}
        linked={sms2Fa!}
        action={
          <EnableTwoFAButton
            activated={sms2Fa!}
            onClick={() => show(ToggleSms2FaDialog)}
          />
        }
      />
    </div>
  );
};

export default TwoFactorAuthSection;
