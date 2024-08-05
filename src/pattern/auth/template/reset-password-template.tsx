"use client";
import React, { useCallback, useRef } from "react";
import AuthCard from "../organisms/auth-card";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import EmailInput from "@/pattern/common/molecules/inputs/email-input";
import LoadingButton from "@/pattern/common/molecules/controls/loading-button";
import { CONFIRM_EMAIL, EMAIL_TO_CONFIRM } from "@/lib/constants";
import {
  IResetPasswordRequestPayload,
  useResetPasswordRequestMutation,
} from "@/redux/services/auth/reset-password.api-slice";
import LocalStore from "@/lib/helper/storage-manager";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const ResetPasswordFormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email address")
    .required("Please enter an email address"),
});

const ResetPasswordTemplate = () => {
  const { push } = useRouter()

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

  // Reset Password API mutation
  const [resetPasswordRequest, { isLoading }] = useResetPasswordRequestMutation();

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods;


  const onSubmit: SubmitHandler<IResetPasswordRequestPayload> = (data) => {
    LocalStore.setItem({ key: EMAIL_TO_CONFIRM, value: data.email })
    resetPasswordRequest({
      email: data.email,
    })
      .unwrap()
      .then((res) => {
        LocalStore.setItem({ key: CONFIRM_EMAIL, value: "true" }) // set confitmEmail localStorage variable to true. Used to conditionally render the content of the next page

        // Go to next page
        push("confirm-email")
      }).catch((err) => {
        // display error message
        toast.error('Unexpected error', {
          description: `${err?.data?.responseMessage ?? 'Password reset request error'}`,
          duration: 8000,
          cancel: {
            onClick: () => {},
            label: 'Cancel',
          },
        })
      })
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
            <LoadingButton loading={isLoading} disabled={!isDirty} type="submit">
              Continue
            </LoadingButton>
          </form>
        </FormProvider>
      </AuthCard>
    </>
  );
};

export default ResetPasswordTemplate;
