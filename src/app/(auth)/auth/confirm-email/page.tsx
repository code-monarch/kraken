"use client";
import React, { useEffect } from "react";
import ConfirmEmailTemplate from "@/pattern/auth/template/confirm-email-template";
import { CONFIRM_EMAIL } from "@/lib/constants";
import { show } from "@ebay/nice-modal-react";
import RequestPasswordResetModal from "@/pattern/auth/organisms/request-password-reset-modal";

const ConfirmEmailPage = () => {
  const shouldConfirmEmail = localStorage.getItem(`${CONFIRM_EMAIL}`);

  // Check is a confirmEmail localStorage variable is set else change route to reset password
  useEffect(() => {
    if (shouldConfirmEmail) {
      return;
    } else {
      show(RequestPasswordResetModal);
    }
  }, [shouldConfirmEmail]);
  return (
    <>
      <ConfirmEmailTemplate />
    </>
  );
};

export default ConfirmEmailPage;
