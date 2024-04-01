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
import { FreezeAccountHeaderIcon } from "@/pattern/common/atoms/icons/freeze-account-header-icon";

export const FreezeAccountModal = create(() => {
  const { resolve, hide, visible } = useModal();

  const handleCloseModal = () => {
    resolve({ resolved: true });
    hide();
  };

  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent className='w-fit h-fit p-0 outline-none border-none shadow-none'>
        <Card className='w-[400px] min-h-[328px] h-fit p-6'>
          {/* Header */}
          <CardHeader className='w-full flex flex-col items-start gap-y-5'>
            <FreezeAccountHeaderIcon />
            <CardTitle className='text-[1.125rem] text-foreground font-semibold'>
              Freeze Account
            </CardTitle>
          </CardHeader>

          {/* Content */}
          <CardContent className='space-y-[16px] mb-[8px]'>
            <p className='text-sm text-[#4F627D]'>
              Are you sure you want to freeze the account of the user
              <span className='text-secondary'>
                &lsquo;Aisha Abdullahi&lsquo;
              </span>{" "}
              (User ID: <span className='text-secondary'>123456</span>)?
              Freezing the account will temporarily disable the user&lsquo;s
              ability to perform transactions and access the UmrahCash services
            </p>
          </CardContent>

          {/* Footer */}
          <CardFooter className='w-full flex items-center justify-between gap-3'>
            <Button size='sm' variant='outline' onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button size='sm'>Confirm</Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
});
