"use client";
import React from "react";
import AuthCard from "../organisms/auth-card";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import EmailInput from "@/pattern/common/molecules/inputs/email-input";
import PasswordInput from "@/pattern/common/molecules/inputs/password-input";
import { LinkButton } from "@/pattern/common/molecules/controls/link-button";
import LoadingButton from "@/pattern/common/molecules/feedback/loading-button";

const LoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email address")
    .required("Please enter your email address"),
  password: Yup.string().required("Password is required"),
});

const LoginTemplate = () => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(LoginFormSchema),
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
        title='Admin Login'
        description='Please enter your admin credentials to access the UmrahCash Admin Dashboard.'
      >
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full flex flex-col items-center gap-4'
          >
            <EmailInput
              label='Email address'
              name='email'
              error={errors["email"]}
            />
            <PasswordInput
              label='Password'
              name='password'
              error={errors["password"]}
            />

            {/* Controls */}
            <div className='w-full space-y-[28px]'>
              <div className='w-full flex items-center justify-end'>
                <LinkButton>Forgot Password</LinkButton>
              </div>
              <LoadingButton loading={false} disabled={!isDirty} type='submit'>
                Log into your account
              </LoadingButton>
            </div>
          </form>
        </FormProvider>
      </AuthCard>
    </>
  );
};

export default LoginTemplate;
