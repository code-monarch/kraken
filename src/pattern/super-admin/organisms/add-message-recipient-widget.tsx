"use client";
import React, { FC, useState } from "react";
import EditMessageWidget from "../molecules/edit-message-widget";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/pattern/common/molecules/controls/loading-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LinkButton } from "@/pattern/common/molecules/controls/link-button";
import { Checkbox } from "@/components/ui/checkbox";
import RecipientWidget from "../molecules/recipient-widget";
import { Separator } from "@/components/ui/separator";

interface IAddMessageRecipientWidgetProps {
  goNext: () => void;
  goBack: () => void;
}

const AddMessageRecipientWidget: FC<IAddMessageRecipientWidgetProps> = ({
  goNext,
  goBack,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  return (
    <>
      <CardContent className='flex flex-col gap-[32px]'>
        <EditMessageWidget
          message='Figma ipsum component variant main layer. Project auto layout underline fill. Pencil component content variant rotate. Font main slice layer undo font underline reesizing. Selection flows frame stroke move pencil.'
          title='Title'
        />
        <div className='w-full h-full flex flex-col gap-5'>
          <div className='w-full flex items-center justify-between'>
            {/* Title */}
            <span className='text-[#384860] text-[1.125rem] font-semibold'>
              Select Recipient(s)
            </span>
            <div className='flex items-center gap-2'>
              <Checkbox
                checked={selectAll}
                onCheckedChange={() => setSelectAll(!selectAll)}
                aria-label='Select all'
              />
              {/* Select All Button */}
              <LinkButton
                className='min-w-fit w-fit text-base font-semibold'
                onClick={() => setSelectAll(!selectAll)}
              >
                Select all
              </LinkButton>
            </div>
          </div>

          <ScrollArea className='w-full h-[320px] rounded-sm'>
            {/* Recipients */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className='w-full h-fit'>
                <div className='flex items-center gap-3 py-3 px-4'>
                  <Checkbox
                    checked={selectAll}
                    onCheckedChange={() => setSelectAll(!selectAll)}
                    aria-label='Select all'
                  />
                  <RecipientWidget firstName='Aisha' lastName='Abdullahi' />
                </div>
                <Separator />
              </div>
            ))}
          </ScrollArea>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter>
        {/* Controls */}
        <div className='w-full flex items-center justify-end'>
          <div className='flex items-center justify-end gap-x-3'>
            {/* Cancel Button */}
            <Button size='sm' variant='outline' onClick={goBack}>
              Back
            </Button>

            {/* Add User Button */}
            <LoadingButton
              size='sm'
              loading={false}
              type='button'
              onClick={goNext}
            >
              Next
            </LoadingButton>
          </div>
        </div>
      </CardFooter>
    </>
  );
};

export default AddMessageRecipientWidget;
