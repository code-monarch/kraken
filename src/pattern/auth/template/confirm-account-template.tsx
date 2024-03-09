"use client";
import React from "react";
import AuthCard from "../organisms/auth-card";
import { LinkButton } from "@/pattern/common/controls/link-button";
import ConfirmEmailInfoBanner from "../molecules/confirm-email-info-banner";

const ConfirmAccountTemplate = () => {
  return (
    <>
      <AuthCard
        title='Confirm your account'
        description='Click on the password reset link from your email to change your password.'
      >
        <div className="space-y-[24px]">
          <ConfirmEmailInfoBanner email='adiejoel14@gmail.com' />
          <div>
            <p className='text-sm text-inherit font-raleway font-normal leading-22'>
              Didn&apos;t receive the email? Please check your spam folder or
              try to resend.
            </p>
          </div>
        </div>
      </AuthCard>
    </>
  );
};

export default ConfirmAccountTemplate;
