"use client";
import React from "react";
import AuthCard from "../organisms/auth-card";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordInput from "@/pattern/common/inputs/password-input";
import { LinkButton } from "@/pattern/common/controls/link-button";
import LoadingButton from "@/pattern/common/controls/loading-button";

const CreateNewPasswordFormSchema = Yup.object().shape({
  password: Yup.string()
    .min(
      8,
      "Password must be at least 8 characters including letters, numbers and symbols"
    )
    .required("Password is required"),
  passwordReentered: Yup.string()
    .min(
      8,
      "Password must be at least 8 characters including letters, numbers and symbols"
    )
    .required("Password is required"),
});

const CreateNewPasswordTemplate = () => {
  const defaultValues = {
    password: "",
    passwordReentered: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(CreateNewPasswordFormSchema),
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
  };
  return (
    <>
      <AuthCard
        title='Create new password'
        description="Create a password with at least 8 characters including letters, numbers and symbols. You'll need this passwords to log into your account"
      >
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full flex flex-col items-center gap-4'
          >
            <PasswordInput
              label='New Password'
              name='password'
              placeholder='Enter new password'
              error={errors["password"]}
            />
            <PasswordInput
              label='New Password'
              name='passwordReentered'
              placeholder='Re-enter new password'
              error={errors["passwordReentered"]}
            />

            {/* Control */}
            <LoadingButton loading={false} disabled={!isDirty} type='submit'>
              Continue
            </LoadingButton>
          </form>
        </FormProvider>
      </AuthCard>
    </>
  );
};

export default CreateNewPasswordTemplate;
