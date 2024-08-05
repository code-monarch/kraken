"use client";
import React from "react";
import AuthCard from "../organisms/auth-card";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordInput from "@/pattern/common/molecules/inputs/password-input";
import LoadingButton from "@/pattern/common/molecules/controls/loading-button";
import {
  IResetPasswordPayload,
  useResetPasswordMutation,
} from "@/redux/services/auth/reset-password.api-slice";
import { useRouter, useSearchParams } from "next/navigation";
import LocalStore from "@/lib/helper/storage-manager";
import { EMAIL_TO_CONFIRM } from "@/lib/constants";
import { toast } from "sonner";

const CreateNewPasswordFormSchema = Yup.object().shape({
  password: Yup.string()
    .min(
      8,
      "Password must be at least 8 characters including letters, numbers and symbols",
    )
    .required("Password is required"),
  newPassword: Yup.string()
    .required("Please re-enter your new password")
    .oneOf([Yup.ref("password"), ""], "Passwords must match"),
});

const CreateNewPasswordTemplate = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  // Get search param
  const resetPasswordToken = searchParams.get("token");

  // Get email
  const emailToConfirm = LocalStore.getItem({ key: EMAIL_TO_CONFIRM });

  const defaultValues = {
    password: "",
    newPassword: "",
  };

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

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

  const onSubmit: SubmitHandler<any> = (data) => {
    resetPassword({
      email: emailToConfirm!,
      password: data.password,
      token: resetPasswordToken!,
    })
      .unwrap()
      .then((res) => {
        toast.success("Successfull", {
          description: `${res?.responseMessage ?? "Your password has been successfully reset"}`,
          duration: 8000,
          cancel: {
            label: "Ok",
          },
        });

        push("login");
      })
      .catch((err) => {
        toast.error("Unexpected error", {
          description: `${err?.data?.responseMessage ?? "Password reset error"}`,
          duration: 8000,
          cancel: {
            label: "Close",
          },
        });
      });
  };
  return (
    <>
      <AuthCard
        title="Create new password"
        description="Create a password with at least 8 characters including letters, numbers and symbols. You'll need this passwords to log into your account"
      >
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center gap-4"
          >
            <PasswordInput
              label="New Password"
              name="password"
              placeholder="Enter new password"
              error={errors["password"]}
            />
            <PasswordInput
              label="New Password"
              name="newPassword"
              placeholder="Re-enter new password"
              error={errors["newPassword"]}
            />

            {/* Control */}
            <LoadingButton
              loading={isLoading}
              disabled={!isDirty}
              type="submit"
            >
              Continue
            </LoadingButton>
          </form>
        </FormProvider>
      </AuthCard>
    </>
  );
};

export default CreateNewPasswordTemplate;
