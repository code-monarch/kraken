"use client";
import React from "react";
import AuthCard from "../organisms/auth-card";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import EmailInput from "@/pattern/common/inputs/email-input";
import PasswordInput from "@/pattern/common/inputs/password-input";
import { LinkButton } from "@/pattern/common/controls/link-button";
import LoadingButton from "@/pattern/common/controls/loading-button";
import { CONFIRM_EMAIL } from "@/lib/constants";

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

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods;

  const onSubmit = () => {
    console.log("DATA TO SUBMIT: ");
    localStorage.setItem(`${CONFIRM_EMAIL}`, "true"); // set confitmEmail localStorage variable to true
  };
  return (
    <>
      <AuthCard
        title='Forgot password'
        description="Can't remember your password? enter your registered email address and we'll send you a password reset link."
      >
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full flex flex-col items-center gap-4'
          >
            <EmailInput
              label='Email address'
              name='email'
              placeholder='Type your email address here'
              error={errors["email"]}
            />

            {/* Control */}
            <LoadingButton loading={true} disabled={!isDirty} type='submit'>
              Find account
            </LoadingButton>
          </form>
        </FormProvider>
      </AuthCard>
    </>
  );
};

export default ResetPasswordTemplate;
