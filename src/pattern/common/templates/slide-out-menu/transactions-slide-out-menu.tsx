"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { create, useModal } from "@ebay/nice-modal-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import SuccessfulTransactionIcon from "../../atoms/icons/successful-transaction-icon";
import SlideOutTransactionDetailsWidget from "../../organisms/slide-out-transaction-details-widget";
import SlideOutDivider from "../../molecules/data-display/slide-out-divider";
import { Badge } from "@/components/ui/badge";
import UserDetailCard from "../../molecules/data-display/user-detail-card";

const TransactionsSlideOutMenu = create(() => {
  const { resolve, hide, visible } = useModal();
  const [scrollHeight, setScrollHeight] = useState(window.innerHeight - 30);

  useEffect(() => {
    function handleResize() {
      setScrollHeight(window.innerHeight - 30);
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

              <div className='px-4 space-y-[16px]'>
                {/* Transaction Details */}
                <SlideOutTransactionDetailsWidget
                  amount='100,000.00 NGN'
                  date='18/10/2023. | 12:45 pm'
                  transactionFee='0.00 NGN'
                  transactionId='1234567899'
                  transationType='Withdrawal'
                />
                {/* Pilgrim details */}
                <div className='w-full h-[192px] space-y-[30px] py-4'>
                  <SlideOutDivider>
                    <Badge
                      variant='accent'
                      className='min-h-[24px] min-w-[139px] rounded-[10px]'
                    >
                      Pilgrim details
                    </Badge>
                  </SlideOutDivider>
                  <UserDetailCard
                    ImageFallback='JA'
                    name='Josh to funny'
                    number='+2349036075477'
                  />
                </div>
                {/* Agent details */}
                <div className='w-full h-[192px] space-y-[30px] py-4'>
                  <SlideOutDivider>
                    <Badge
                      variant='accent'
                      className='min-h-[24px] min-w-[139px] rounded-[10px]'
                    >
                      Agent details
                    </Badge>
                  </SlideOutDivider>
                  <UserDetailCard
                    ImageFallback='JA'
                    name='Josh to funny'
                    number='+2349036075477'
                  />
                </div>
                {/* User message */}
                <div className='w-full h-[192px] space-y-[30px]'>
                  <SlideOutDivider>
                    <Badge
                      variant='accent'
                      className='min-h-[24px] min-w-[139px] rounded-[10px]'
                    >
                      User Message
                    </Badge>
                  </SlideOutDivider>
                  <p className='w-full text-sm text-accent-foreground font-normal'>
                    I noticed a discrepancy in the deposit amount. The receipt I
                    received shows a different amount. Please investigate and
                    resolve the issue. Thank you.
                  </p>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
});

export default TransactionsSlideOutMenu;
