import { Separator } from "@/components/ui/separator";
import React from "react";
import TwoFactorAuthSection from "./two-factor-auth-section";
import ChangePasswordSection from "./change-password-section";
import CurrencyConversionSection from "./currency-conversion-section";
import CurrentLanguageSection from "./current-language-section";

const AccountSettingsTab = () => {
  return (
    <div>
      <p className="text-lg text-[#202b3c] font-semibold mb-2">
        Account Settings
      </p>
      <Separator />

      <div className="my-2">
        <TwoFactorAuthSection />
      </div>
      <Separator />

      <div className="my-3">
        <ChangePasswordSection />
      </div>
      <Separator />

      <div className="my-3">
        <CurrencyConversionSection />
      </div>
      <Separator />

      <div className="my-3">
        <CurrentLanguageSection />
      </div>
      <Separator />
    </div>
  );
};

export default AccountSettingsTab;
