"use client";
import React from "react";
import { create, useModal } from "@ebay/nice-modal-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeleteAccountHeaderIcon } from "@/pattern/common/atoms/icons/delete-account-header-icon";

export const DeleteAccountModal = create(() => {
  const { resolve, hide, visible } = useModal();

  const handleCloseModal = () => {
    resolve({ resolved: true });
    hide();
  };

  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent className='w-fit h-fit p-0 outline-none border-none shadow-none'>
        <Card className='w-[400px] min-h-[308px] h-fit p-6'>
          {/* Header */}
          <CardHeader className='w-full flex flex-col items-start gap-y-5'>
            <DeleteAccountHeaderIcon />
            <CardTitle className='text-[1.125rem] text-foreground font-semibold'>
              Delete Account
            </CardTitle>
          </CardHeader>

          {/* Content */}
          <CardContent className='space-y-[16px] mb-[8px]'>
            <p className='text-sm text-[#4F627D]'>
              Are you sure you want to delete the account of the user
              <span className='text-secondary'>
                &lsquo;Aisha Abdullahi&lsquo;
              </span>{" "}
              (User ID: <span className='text-secondary'>123456</span>)? This
              action cannot be undone, and all associated data will be removed
              from the system.
            </p>
          </CardContent>

          {/* Footer */}
          <CardFooter className='w-full flex items-center justify-between gap-3'>
            <Button size='sm' variant='outline' onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button size='sm' variant="destructive">Confirm</Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
});
