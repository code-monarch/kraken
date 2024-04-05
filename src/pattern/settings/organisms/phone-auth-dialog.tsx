import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import PhoneSectionIndicator from "@/pattern/common/atoms/icons/phone-section-indicator";
import { Button } from "@/components/ui/button";
import PhoneNumberInput from "@/pattern/common/molecules/inputs/phone-input";
import GreyInfoIcon from "@/pattern/common/atoms/icons/grey-info-icon";
import ConfirmCodeDialog from "./confirm-code-dialog";
import { create, show, useModal } from "@ebay/nice-modal-react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const RequestOtpFormSchema = Yup.object().shape({
  phone: Yup.string().required("Phone number is Required"),
});

const PhoneAuthDialog = create(() => {
  const { resolve, remove, visible } = useModal();

  const handleCloseModal = () => {
    resolve({ resolved: true });
    remove();
  };

  const defaultValues = {
    phone: "",
  };

  const methods = useForm({
    mode: "onChange",
    resolver: yupResolver(RequestOtpFormSchema),
    reValidateMode: "onChange",
    delayError: 2000,
    defaultValues: defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods;

  console.log("FORM ERRORR: ", errors);

  const onSubmit = () => {
    handleCloseModal();
    show(ConfirmCodeDialog);
  };
  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-5'
        >
          <DialogContent>
            <DialogHeader className='space-y-4'>
              <PhoneSectionIndicator />
              <DialogDescription className='text-[#202b36] text-base text-center'>
                <p className='font-semibold'>
                  Enter your mobile phone number in the field below.
                </p>
                <p>
                  We will send an authenticator code when we detect a sign-in
                  attempt from an unrecognized location.
                </p>
              </DialogDescription>
            </DialogHeader>

            <div className='my-2 space-y-2'>
              {/* Phone number */}
              <PhoneNumberInput
                label='Phone Number'
                name='phone'
                error={errors["phone"]}
              />

              <div className='flex items-center gap-1 text-[#4F627D]'>
                <div>
                  <GreyInfoIcon />
                </div>
                <p className='text-sm'>
                  We will only use this phone number for the purpose of 2-Factor
                  authentication. Message and data rates may apply.
                </p>
              </div>
            </div>

            <DialogFooter className='sm:justify-start'>
              <DialogClose asChild>
                <Button type='button' variant='default' onClick={onSubmit}>
                  Next
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </FormProvider>
    </Dialog>
  );
});

export default PhoneAuthDialog;
