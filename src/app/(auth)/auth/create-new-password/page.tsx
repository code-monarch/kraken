import React from "react";
import ConfirmAccountTemplate from "@/pattern/auth/template/confirm-account-template";
import CreateNewPasswordTemplate from "@/pattern/auth/template/create-new-password-template";

const CreateNewPasswordPage = () => {
  return (
    <>
      <CreateNewPasswordTemplate />
      <ConfirmAccountTemplate />
    </>
  );
};

export default CreateNewPasswordPage;
