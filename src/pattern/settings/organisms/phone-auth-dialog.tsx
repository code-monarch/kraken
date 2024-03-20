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
import PhoneSectionIndicator from "@/pattern/common/atoms/icons/phone-section-indicator";
import { Button } from "@/components/ui/button";
import PhoneNumberInput from "@/pattern/common/molecules/inputs/phone-input";
import GreyInfoIcon from "@/pattern/common/atoms/icons/grey-info-icon";
import ConfirmCodeDialog from "./confirm-code-dialog";
import { FormProvider } from "react-hook-form";

const PhoneAuthDialog = () => {
  const [phone, setPhone] = useState<string>("");
  const [open, setOpen] = useState<boolean>();
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const onSubmit = () => {};
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="bg-[#2277f0] py-3 px-6 rounded-[6px] text-base font-semibold text-white">
          Enable
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="space-y-4">
            <PhoneSectionIndicator />
            <DialogDescription className="text-[#202b36] text-base text-center">
              <p className="font-semibold">
                Enter your mobile phone number in the field below.
              </p>
              <p>
                We will send an authenticator code when we detect a sign-in
                attempt from an unrecognized location.
              </p>
            </DialogDescription>
          </DialogHeader>

          <div className="my-2 space-y-2">
            <PhoneNumberInput phone={phone} setPhone={setPhone} />

            <div className="flex items-center gap-1 text-[#4F627D]">
              <div>
                <GreyInfoIcon />
              </div>
              <p className="text-sm">
                We will only use this phone number for the purpose of 2-Factor
                authentication. Message and data rates may apply.
              </p>
            </div>
          </div>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="default"
                onClick={() => {
                  onSubmit();
                  setOpen(false);
                  setConfirmOpen(true);
                }}
              >
                Next
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="hidden">
        <ConfirmCodeDialog open={confirmOpen} setOpen={setConfirmOpen} />
      </div>
    </div>
  );
};

export default PhoneAuthDialog;
