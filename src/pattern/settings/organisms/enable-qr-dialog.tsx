import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import MFACompleteDialog from "./mfa-complete-dialog";
import QRVerificationCodeInput from "@/pattern/common/molecules/inputs/qr-verification-code-input";
import EnableSectionIndicator from "@/pattern/common/atoms/icons/enable-mfa-section-indicator";
import AuthenticatorCodeInput from "@/pattern/common/molecules/inputs/authenticator-code-input";
import { create, show, useModal } from "@ebay/nice-modal-react";

interface IProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

interface payload {
  verificationCode: string;
  authenticatorCode: string;
}

const EnableQRDialog = create(() => {
  const { resolve, remove, visible } = useModal();

  const handleCloseModal = () => {
    resolve({ resolved: true });
    remove();
  };

  const defaultValues = {
    verificationCode: "",
    authenticatorCode: "",
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
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader className='space-y-4'>
          <EnableSectionIndicator />
          <DialogDescription className='text-[#202b36] text-base text-center'>
            <p className='font-semibold'>
              Your verification has been sent to +2348039367898, please confirm
              by entering it below.
            </p>
            <p>
              We will send you an authenticator code when we detect a sign-in
              attempt from an unrecognized location.
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className='my-2 space-y-2'>
          <FormProvider {...methods}>
            <form>
              <QRVerificationCodeInput
                label='Verification Code'
                name='verificationCode'
              />

              <AuthenticatorCodeInput
                label='Authenticator Code'
                name='authenticatorCode'
              />
            </form>
          </FormProvider>
        </div>

        <DialogFooter className='flex items-center justify-end'>
          <Button
            type='button'
            variant='accent'
            className='w-fit'
            onClick={() => {
              handleCloseModal();
            }}
          >
            Back
          </Button>
          <Button
            type='button'
            variant='default'
            className='w-fit'
            onClick={() => {
              handleSubmit(onSubmit);
              handleCloseModal();
              show(MFACompleteDialog);
            }}
          >
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default EnableQRDialog;
