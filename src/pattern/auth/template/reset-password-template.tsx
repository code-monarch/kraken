"use client";
import React from "react";
import AuthCard from "../organisms/auth-card";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import EmailInput from "@/pattern/common/molecules/inputs/email-input";
import PasswordInput from "@/pattern/common/molecules/inputs/password-input";
import { LinkButton } from "@/pattern/common/molecules/controls/link-button";
import LoadingButton from "@/pattern/common/molecules/controls/loading-button";
import { CONFIRM_EMAIL } from "@/lib/constants";
import {
  IResetPasswordPayload,
  useResetPasswordMutation,
} from "@/redux/services/auth/reset-password.api-slice";

const ResetPasswordFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email address")
    .required("Please enter an email address"),
});

const ResetPasswordTemplate = () => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(ResetPasswordFormSchema),
    reValidateMode: "onChange",
    delayError: 2000,
    defaultValues: defaultValues,
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods;

  const onSubmit: SubmitHandler<IResetPasswordPayload> = (data) => {
    console.log("DATA TO SUBMIT: ");
    resetPassword({
      email: data.email,
    })
      .unwrap()
      .then((res) => {
        console.log(res.responseMessage);
        localStorage.setItem(`${CONFIRM_EMAIL}`, "true"); // set confitmEmail localStorage variable to true
      });
  };
  return (
    <>
      <AuthCard
        title="Forgot password"
        description="Can't remember your password? enter your registered email address and we'll send you a password reset link."
      >
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center gap-4"
          >
            <EmailInput
              label="Email address"
              name="email"
              placeholder="Type your email address here"
              error={errors["email"]}
            />

            {/* Control */}
            <LoadingButton loading={false} disabled={!isDirty} type="submit">
              Find account
            </LoadingButton>
          </form>
        </FormProvider>
      </AuthCard>
    </>
  );
};

export default ResetPasswordTemplate;
