"use client";
import React from "react";
import AuthCard from "../organisms/auth-card";
import ConfirmEmailInfoBanner from "../molecules/confirm-email-info-banner";

const ConfirmEmailTemplate = () => {

  return (
    <>
      <AuthCard
        title='Confirm your account'
        description='Click on the password reset link from your email to change your password.'
      >
        <div className='space-y-[24px]'>
          <ConfirmEmailInfoBanner email='adiejoel14@gmail.com' />
          <div>
            <p className='text-sm text-inherit font-raleway font-normal leading-22'>
              Didn&apos;t receive the email? Please check your spam folder or
              try to resend.
            </p>
            <p className='text-base font-raleway font-semibold'>
              Resend password reset link in <span>119s</span>
            </p>
          </div>
        </div>
      </AuthCard>
    </>
  );
};

export default ConfirmEmailTemplate;
