"use client";
import React, { useState } from "react";
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
import VerifyStatusHeaderIcon from "@/pattern/common/atoms/icons/verify-status-header-icon";
import { SelectNewVerificationStatusWidget } from "../molecules/select-new-verification-status-widget";
import { CommentInput } from "@/pattern/common/molecules/inputs/comment-input";

export const ChangeVerificationStatusModal = create(() => {
  const { resolve, hide, visible } = useModal();

  const handleCloseModal = () => {
    resolve({ resolved: true });
    hide();
  };

  // Controls status state. In the future the default value of this would be gotten from the API
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">(
    "pending"
  );
  // Controls value of comment
  const [comment, setComment] = useState<string>(
    ""
  );
  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent className='w-fit h-fit p-0 outline-none border-none shadow-none'>
        <Card className='w-[400px] min-h-[460px] h-fit p-6'>
          {/* Header */}
          <CardHeader className='w-full flex flex-col items-start gap-y-5'>
            <VerifyStatusHeaderIcon />
            <CardTitle className='text-[1.125rem] text-foreground font-semibold'>
              Change Verification Status
            </CardTitle>
          </CardHeader>

          {/* Content */}
          <CardContent className='space-y-[16px] mb-[8px]'>
            <SelectNewVerificationStatusWidget
              label='Select New Verification Status'
              value={status}
              setValue={setStatus}
            />

            {/* Comment */}
            <CommentInput
              label='Comments'
              value={comment}
              setValue={setComment}
            />
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
