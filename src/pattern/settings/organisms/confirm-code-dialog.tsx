import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ConfirmSectionIndicator from "@/pattern/common/atoms/icons/confirm-section-stepper-indicator";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import MFACompleteDialog from "./mfa-complete-dialog";
import { create, show, useModal } from "@ebay/nice-modal-react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "@/pattern/common/molecules/inputs/form-input";
import LoadingButton from "@/pattern/common/molecules/controls/loading-button";
import { useConfirmToggle2FaMutation } from "@/redux/services/two-factor/toggle-2fa";
import { ErrorModal } from "@/pattern/activity-logs/organisms/error-modal";

interface IConfirmCodeInput {
  verificationCode: string;
}

const ConfirmCodeSchema = Yup.object().shape({
  verificationCode: Yup.string().required("Verification code is Required"),
});

const ConfirmCodeDialog = create(() => {
  const { resolve, remove, visible } = useModal();

  const handleCloseModal = () => {
    resolve({ resolved: true });
    remove();
  };

  const defaultValues = {
    verificationCode: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(ConfirmCodeSchema),
    reValidateMode: "onChange",
    delayError: 2000,
    defaultValues: defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods;

  console.log("FORM ERRORR: ", errors);

  const [confirmToggle2Fa, { isLoading, isSuccess, isError }] =
    useConfirmToggle2FaMutation();

  const onSubmitHandler: SubmitHandler<IConfirmCodeInput> = (data) => {
    confirmToggle2Fa({
      token: data.verificationCode,
    })
      .unwrap()
      .then((res) => {
        console.log(res);
        handleCloseModal();
        show(MFACompleteDialog);
      })
      .catch((err) => {
        show(ErrorModal);
        console.log(`${err.error || err?.data?.message || err}`);
      });
  };

  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <FormProvider {...methods}>
        <DialogContent>
          <DialogHeader className="space-y-4">
            <ConfirmSectionIndicator />
            <DialogDescription className="text-[#202b36] text-base text-center">
              <p className="font-semibold">
                Your verification has been sent to +2348039367898, please
                confirm by entering it below.
              </p>
              <p>
                We will send you an authenticator code when we detect a sign-in
                attempt from an unrecognized location.
              </p>
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="my-2 space-y-2">
              <FormInput
                label="Verification Code"
                name="verificationCode"
                placeholder="803 000 000"
                error={errors["verificationCode"]}
              />
            </div>

            <DialogFooter className="flex items-center justify-end">
              <Button
                type="button"
                variant="accent"
                className="w-fit"
                onClick={handleCloseModal}
              >
                Back
              </Button>

              {/* Submit Button */}
              <LoadingButton
                loading={isLoading}
                disabled={!isDirty}
                className="w-fit"
                type="submit"
              >
                Continue
              </LoadingButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
});

export default ConfirmCodeDialog;
