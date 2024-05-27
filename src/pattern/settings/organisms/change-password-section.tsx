import React from "react";
import LoadingButton from "@/pattern/common/molecules/controls/loading-button";
import PasswordInput from "@/pattern/common/molecules/inputs/password-input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useChangePasswordMutation } from "@/redux/services/auth/change-password.api-slice";
import { show } from "@ebay/nice-modal-react";
import { PasswordErrorModal } from "./password-error-modal";
import { SuccessModal } from "./success-modal";

interface payload {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePasswordFormSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Please enter your old password"),
  newPassword: Yup.string().required("Please enter your new password"),
  confirmNewPassword: Yup.string()
    .label("confirm password")
    .required("Please re-enter your new password")
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match"),
});

const ChangePasswordSection = () => {
  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const methods = useForm<payload>({
    mode: "onChange",
    resolver: yupResolver(ChangePasswordFormSchema),
    delayError: 2000,
    reValidateMode: "onChange",
    defaultValues: defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = methods;

  const [
    changePassword,
    { isLoading, isSuccess, isError, error: changePasswordError },
  ] = useChangePasswordMutation();

  const onSubmit: SubmitHandler<payload> = (data) => {
    changePassword({
      password: data.oldPassword,
      newPassword: data.newPassword,
    })
      .unwrap()
      .then((res) => {
        console.log("password changed successfully");
        show(SuccessModal);
        reset();
      })
      .catch((err) => {
        console.log(changePasswordError);
        if (
          changePasswordError &&
          "status" in changePasswordError &&
          changePasswordError?.status === 404
        ) {
          show(PasswordErrorModal);
        }
        console.log(`${err.error || err?.data?.message}`);
      });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <p className="text-lg text-[#202b3c] font-medium">Change Password</p>
        <p className="text-sm text-[#4F627D]">
          Choose a strong and unique password to protect your information
        </p>
      </div>

      <div>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[307px] space-y-6"
          >
            <div className="space-y-4">
              <PasswordInput
                label="Old Password"
                name="oldPassword"
                error={errors["oldPassword"]}
              />
              <PasswordInput
                label="New Password"
                name="newPassword"
                error={errors["newPassword"]}
              />
              <PasswordInput
                label="Confirm New Password"
                name="confirmNewPassword"
                error={errors["confirmNewPassword"]}
              />
            </div>

            <div className="my-2">
              <LoadingButton
                loading={isLoading}
                disabled={!isDirty}
                type="submit"
                size={"sm"}
                className="w-fit"
              >
                Submit
              </LoadingButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ChangePasswordSection;
