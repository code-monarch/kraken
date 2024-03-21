import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ConfirmSectionIndicator from "@/pattern/common/atoms/icons/confirm-section-indicator";
import VerificationCodeInput from "@/pattern/common/molecules/inputs/verification-code-input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import MFACompleteDialog from "./mfa-complete-dialog";

interface IProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

interface payload {
  verificationCode: string;
}

const ConfirmCodeDialog = ({ open, setOpen }: IProps) => {
  const [completeOpen, setCompleteOpen] = useState<boolean>(false);

  const defaultValues = {
    verificationCode: "",
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="bg-[#2277f0] py-3 px-6 rounded-[6px] text-base font-semibold text-white">
          Enable
        </DialogTrigger>
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

          <div className="my-2 space-y-2">
            <FormProvider {...methods}>
              <form>
                <VerificationCodeInput
                  label="Verification Code"
                  name="verificationCode"
                />
              </form>
            </FormProvider>
          </div>

          <DialogFooter className="flex items-center justify-end">
            <Button
              type="button"
              variant="accent"
              className="w-fit"
              onClick={() => {
                setOpen(false);
              }}
            >
              Back
            </Button>
            <Button
              type="button"
              variant="default"
              className="w-fit"
              onClick={() => {
                handleSubmit(onSubmit);
                setOpen(false);
                setCompleteOpen(true);
              }}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="hidden">
        <MFACompleteDialog open={completeOpen} setOpen={setCompleteOpen} />
      </div>
    </div>
  );
};

export default ConfirmCodeDialog;
