"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { create, useModal } from "@ebay/nice-modal-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import SuccessfulTransactionIcon from "../../atoms/icons/successful-transaction-icon";

const TransactionsSlideOutMenu = create(() => {
  const { resolve, hide, visible } = useModal();
  const [scrollHeight, setScrollHeight] = useState(window.innerHeight - 90);

  useEffect(() => {
    function handleResize() {
      setScrollHeight(window.innerHeight - 90);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCloseModal = () => {
    resolve({ resolved: true });
    hide();
  };
  return (
    <Sheet modal open={visible} onOpenChange={handleCloseModal}>
      <SheetContent>
        <div className='relative h-full'>
          <ScrollArea
            className='w-full rounded-sm'
            style={{ height: `${scrollHeight}px` }}
          >
            <SheetHeader className='absolute top-0 right-0 left-0 z-10'>
              <SheetTitle>Transactions details</SheetTitle>
            </SheetHeader>
            <div className='w-full mt-[72px] px-[24px] pt-[24px] font-raleway space-y-[16px]'>
              <div className='w-full h-[204px] flex flex-col items-center justify-center gap-y-6'>
                <SuccessfulTransactionIcon />
                <div className='w-full flex flex-col items-center space-y-[4px]'>
                  <h3 className='text-foreground text-24 font-raleway font-semibold'>
                    100,000.00 <span>NGN</span>
                  </h3>
                  <p className='text-accent-foreground text-base font-medium'>
                    100,000.00 SAR
                  </p>
                  <h4 className='text-primary text-base font-semibold'>
                    Successful!
                  </h4>
                </div>
              </div>
              <Button variant='outlineDestructive'>Flag transaction</Button>
            </div>
          </ScrollArea>
        </div>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type='submit'>Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
});

export default TransactionsSlideOutMenu;
