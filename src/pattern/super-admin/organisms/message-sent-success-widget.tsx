"use client";
import React, { FC } from "react";
import SuccessIcon from "../../common/atoms/icons/success-icon";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";

interface IMessageSentSuccessProps {
  onCloseModal: () => void;
}

const MessageSentSuccessWidget: FC<IMessageSentSuccessProps> = ({
  onCloseModal,
}) => {
  return (
    <div className='space-y-[24px]'>
      {/* Content */}
      <CardContent className='flex flex-col items-center gap-6'>
        <SuccessIcon />
        <div className='flex flex-col items-center gap-2'>
          <h4 className='text-[hsla(216,26%,30%,1)] text-[1.125rem] font-semibold'>
            Message Sent Successfully
          </h4>
          <p className='text-[hsla(216,30%,18%,1)] text-base text-center font-normal'>
            Your message has been successfully sent to the selected recipients.
          </p>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className='w-full'>
        <Button
          variant='outlinePrimary'
          className='w-full h-[52px]'
          onClick={onCloseModal}
        >
          Close
        </Button>
      </CardFooter>
    </div>
  );
};

export default MessageSentSuccessWidget;
