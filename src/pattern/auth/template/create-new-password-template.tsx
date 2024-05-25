"use client";
import React from "react";
import AuthCard from "../organisms/auth-card";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PasswordInput from "@/pattern/common/molecules/inputs/password-input";
import { LinkButton } from "@/pattern/common/molecules/controls/link-button";
import LoadingButton from "@/pattern/common/molecules/controls/loading-button";
import {
  IChangePasswordPayload,
  useChangePasswordMutation,
} from "@/redux/services/auth/change-password.api-slice";

const CreateNewPasswordFormSchema = Yup.object().shape({
  password: Yup.string()
    .min(
      8,
      "Password must be at least 8 characters including letters, numbers and symbols"
    )
    .required("Password is required"),
  newPassword: Yup.string()
    .min(
      8,
      "Password must be at least 8 characters including letters, numbers and symbols"
    )
    .required("Password is required"),
});

const CreateNewPasswordTemplate = () => {
  const defaultValues = {
    password: "",
    newPassword: "",
  };

  const [changePassword, { isLoading }] = useChangePasswordMutation();

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

  const onSubmit: SubmitHandler<IChangePasswordPayload> = (data) => {
    changePassword({
      password: data.password,
      newPassword: data.newPassword,
    })
      .unwrap()
      .then((res) => {
        console.log(res.responseMessage);
      });
    console.log("DATA TO SUBMIT: ");
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
            <LoadingButton loading={false} disabled={!isDirty} type="submit">
              Continue
            </LoadingButton>
          </form>
        </FormProvider>
      </AuthCard>
    </>
  );
};

export default CreateNewPasswordTemplate;
