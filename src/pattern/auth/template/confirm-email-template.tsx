"use client";
import React, { useEffect } from "react";
import AuthCard from "../organisms/auth-card";
import ConfirmEmailInfoBanner from "../molecules/confirm-email-info-banner";
import { useCountdown } from "@/lib/hooks/useCountdown";
import { CONFIRM_EMAIL } from "@/lib/constants";
import Hidden from "@/pattern/common/data-display/hidden";
import { LinkButton } from "@/pattern/common/controls/link-button";

const shouldConfirmEmail = localStorage.getItem(`${CONFIRM_EMAIL}`);
const COUNT_START = 120;

const ConfirmEmailTemplate = () => {
  const [count, { start, stop, reset }] = useCountdown({
    countStart: COUNT_START,
  });

  // Start countdown timer on template render if user has access to re confirm Email
  useEffect(() => {
    if (!shouldConfirmEmail) {
      return;
    } else {
      start();
    }
  }, [start]);

  const handleResendPassword = () => {
    // call resend reset link endpoint then
    reset();
  };

  return (
    <>
      <AuthCard
        title='Confirm your account'
        description='Click on the password reset link from your email to change your password.'
        className='!min-h-[321px] h-[321px]'
      >
        <div className='space-y-[24px]'>
          <ConfirmEmailInfoBanner email='adiejoel14@gmail.com' />
          <div className='space-y-[12px]'>
            <p className='text-sm text-card-foreground font-raleway font-normal leading-22'>
              Didn&apos;t receive the email? Please check your spam folder or
              try to resend.
            </p>
            <Hidden visible={count > 0}>
              <p className='text-base text-secondary font-raleway font-semibold'>
                Resend password reset link in <span>{count}s</span>
              </p>
            </Hidden>
            <Hidden visible={count === 0}>
              <LinkButton onClick={handleResendPassword}>
                Resend password reset link
              </LinkButton>
            </Hidden>
          </div>
        </div>
      </AuthCard>
    </>
  );
};

export default ConfirmEmailTemplate;
