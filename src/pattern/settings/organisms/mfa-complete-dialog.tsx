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
import CompletedIcon from "@/pattern/common/atoms/icons/completed-icon";
import CompleteSectionIndicator from "@/pattern/common/atoms/icons/complete-mfa-stepper-indicator";

interface IProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

interface payload {
  verificationCode: string;
}

const MFACompleteDialog = ({ open, setOpen }: IProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='bg-secondary py-3 px-6 rounded-[6px] text-base font-semibold text-white'>
        Enable
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='space-y-4'>
          <CompleteSectionIndicator />
        </DialogHeader>

        <div className='my-2 space-y-2 text-center'>
          <div className='flex items-center justify-center'>
            <CompletedIcon />
          </div>
          <p className='font-semibold text-lg text-[#384860]'>
            Two Factor Authenticator Enabled
          </p>
          <p className='text-[#202b36] text-base'>
            You have successfully enabled Authenticator to protect your account
          </p>
        </div>

        <DialogFooter className=''>
          <Button
            type='button'
            variant='outlinePrimary'
            className=''
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MFACompleteDialog;
