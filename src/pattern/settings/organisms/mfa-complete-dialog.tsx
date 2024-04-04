import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CompletedIcon from "@/pattern/common/atoms/icons/completed-icon";
import CompleteSectionIndicator from "@/pattern/common/atoms/icons/complete-mfa-stepper-indicator";
import { create, useModal } from "@ebay/nice-modal-react";

interface IProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

interface payload {
  verificationCode: string;
}

const MFACompleteDialog = create(() => {
  const { resolve, hide, visible } = useModal();

  const handleCloseModal = () => {
    resolve({ resolved: true });
    hide();
  };
  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
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
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default MFACompleteDialog;
