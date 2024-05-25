"use client";
import React, { useCallback, useEffect } from "react";
import AuthCard from "../organisms/auth-card";
import ConfirmEmailInfoBanner from "../molecules/confirm-email-info-banner";
import { useCountdown } from "@/lib/hooks/useCountdown";
import Hidden from "@/pattern/common/molecules/data-display/hidden";
import { LinkButton } from "@/pattern/common/molecules/controls/link-button";
import { CREATE_PASSWORD_TRIGGER_TIME, EMAIL_TO_CONFIRM } from "@/lib/constants";
import LocalStore from "@/lib/helper/storage-manager";
import { useResetPasswordMutation } from "@/redux/services/auth/reset-password.api-slice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ConfirmEmailTemplate = () => {
  const { push } = useRouter()

  // helper functions for starting and reseting trigger timer
  const [count, { start, reset }] = useCountdown({
    countStart: CREATE_PASSWORD_TRIGGER_TIME,
  });

  // Get entered Email for resending Email verification email
  const emailToConfirm = LocalStore.getItem({ key: EMAIL_TO_CONFIRM })

  // Reset Password API mutation
  const [resetPassword, { isLoading, isError, isSuccess }] = useResetPasswordMutation();

  useEffect(() => {
    if (isLoading) {
      // display Loading toast
      toast.loading("Sending...", {
        description: "Sending password reset email",
        id: "sending-email"
      })
    } else if (isError || isSuccess) {
      toast.dismiss("sending-email");
    }
  }, [isLoading, isError, isSuccess])


  // Start countdown timer on template render if user has access to re confirm Email
  useEffect(() => {
    start();
  }, [start]);


  const handleResendPassword = useCallback(() => {
    // reset timer
    reset();
    resetPassword({
      email: `${emailToConfirm}`,
    })
      .unwrap()
      .then((res) => {
        // display Success message
        toast.success("Successfull", {
          description: `${res?.responseMessage ?? "A password reset link has been sent to your email address"}`,
          duration: 8000,
          cancel: {
            label: 'Ok',
            onClick: () => console.log('Cancel!'),
          },
        })

        // route to confirm Email page
        push("confirm-email")
      }).catch((err) => {
        // display error message
        toast.error("Unexpected error", {
          description: `${err?.data?.responseMessage ?? "Password reset request error"}`,
          duration: 8000,
          cancel: {
            label: 'Cancel',
            onClick: () => console.log('Cancel!'),
          },
        })
      })
    start();
  }, [push, reset, resetPassword, start, emailToConfirm]);

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
