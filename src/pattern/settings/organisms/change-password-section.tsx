import React from "react";
import LoadingButton from "@/pattern/common/molecules/controls/loading-button";
import PasswordInput from "@/pattern/common/molecules/inputs/password-input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface payload {
  oldPassword: string;
  newPassword: string;
}

const ChangePasswordSection = () => {
  const defaultValues = {
    oldPassword: "",
    newPassword: "",
  };

  const methods = useForm<payload>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods;

  const onSubmit: SubmitHandler<payload> = (data) => {
    console.log("DATA TO SUBMIT: ");
  };

  return (
    <div>
      <div>
        <p className="text-lg text-[#202b3c] font-medium">Change Password</p>
        <p className="text-sm text-[#4F627D]">
          Choose a strong and unique password to protect your information
        </p>
      </div>

      <div>
        <FormProvider {...methods}>
          <form className="w-1/2 space-y-2">
            <PasswordInput label="Old Pin" name="oldPassword" />
            <PasswordInput label="New Pin" name="newPassword" />
            <PasswordInput label="Confirm New Pin" name="newPassword" />

            <div className="my-2">
              <LoadingButton
                loading={false}
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
