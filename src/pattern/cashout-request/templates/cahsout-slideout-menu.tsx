'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { create, useModal } from '@ebay/nice-modal-react'
import { ScrollArea } from '@/components/ui/scroll-area'
// import SlideOutDivider from '../../molecules/data-display/slide-out-divider'
import { Badge } from '@/components/ui/badge'
import SlideOutCahsoutDetailsWidget from '../organisms/slideout-cashout-details-widget'
import SlideOutDivider from '@/pattern/common/molecules/data-display/slide-out-divider'
import PaymentInformation from '../organisms/payment-information'
import { Label } from '@/components/ui/label'
import LoadingButton from '@/pattern/common/molecules/controls/loading-button'
import AgentDetailsCard from '../molecules/agent-detail-card'

interface IProps {
  amount: string | number
  date: string
  transactionId: string
  transactionType: string
  status: string
  accountName: string
  accountNumber: string
  bankName: string
  name: string
  phoneNumber: string
  totalRewards: string | number;
  withdrawableAmount: string | number;
}

const CashoutSlideOutMenu = create(
  ({
    amount,
    date,
    transactionId,
    transactionType,
    status,
    accountName,
    accountNumber,
    bankName,
    name,
    phoneNumber,
    totalRewards,
    withdrawableAmount,
  }: IProps) => {
    const { resolve, remove, visible } = useModal()
    const [scrollHeight, setScrollHeight] = useState(window.innerHeight - 30)
    const hujf = 'parents'

    useEffect(() => {
      function handleResize() {
        setScrollHeight(window.innerHeight - 30)
      }

      window.addEventListener('resize', handleResize)

      return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleCloseModal = () => {
      resolve({ resolved: true })
      remove()
    }
    return (
      <Sheet modal open={visible} onOpenChange={handleCloseModal}>
        <SheetContent>
          <div className='relative h-full'>
            <ScrollArea
              className='w-full rounded-sm'
              style={{ height: `${scrollHeight}px` }}
            >
              <SheetHeader className='absolute top-0 right-0 left-0 z-10'>
                <SheetTitle>Request Summary</SheetTitle>
              </SheetHeader>
              <div className='w-full mt-[72px] px-[24px] pt-[24px] font-raleway space-y-[16px]'>
                <div className='px-4 space-y-[16px]'>
                  {/* Cashout Details */}
                  <SlideOutCahsoutDetailsWidget
                    amount={amount}
                    date={date}
                    transactionId={transactionId}
                    transactionType={transactionType}
                    status={status}
                  />

                  {/* Payment information */}
                  <div className='w-full h-[192p] space-y-[30px] py-4'>
                    <PaymentInformation
                      accountName={accountName}
                      accountNumber={accountNumber}
                      bankName={bankName}
                    />
                  </div>

                  {status.toLowerCase() === 'pending' ? (
                    <div className='w-full flex flex-col items-center justify-between gap-3'>
                      <LoadingButton
                        size='sm'
                        variant='default'
                        onClick={() => {}}
                        loading={false}
                      >
                        I have made this payment
                      </LoadingButton>
                      <Button
                        size='sm'
                        variant='outlineDestructive'
                        onClick={handleCloseModal}
                      >
                        Decline Payment
                      </Button>
                    </div>
                  ) : (
                    <>
                      {/* Agent details */}
                      <div className='w-full h-[192p] space-y-[30px] py-4 font-medium text-sm'>
                        <SlideOutDivider>
                          <Badge
                            variant='accent'
                            className='min-h-[24px] min-w-[139px] rounded-[10px]'
                          >
                            Agent details
                          </Badge>
                        </SlideOutDivider>
                        <AgentDetailsCard
                          ImageFallback='JA'
                          name='Josh to funny'
                          number='+2349036075477'
                        />

                        <div className='w-full flex items-start justify-between text-sm'>
                          <Label htmlFor='amount'>
                            Total Rewards:
                          </Label>
                          <div className='flex flex-col items-end'>
                            <div id='amount' className='font-medium text-[#2A2E33]'>
                              {totalRewards} NGN
                            </div>
                            <div
                              id='amount'
                              className='text-xs font-medium text-[#6D7786]'
                            >
                              {totalRewards} SAR
                            </div>
                          </div>
                        </div>

                        <div className='w-full flex items-start justify-between text-sm'>
                          <Label htmlFor='amount'>Withdrawable Amount:</Label>
                          <div id='amount' className='text-[#2A2E33]'>{withdrawableAmount} SAR</div>
                        </div>
                      </div>

                      {/* View receipt */}
                      <div className='w-full space-y-[30px]'>
                        <div>
                          <div className='rounded-lg bg-[#FFFDED] text-sm p-3'>
                            Click this button only when you&apos;ve actually
                            made the payment.
                          </div>
                        </div>

                        <Button
                          size='sm'
                          variant='outlineSecondary'
                          onClick={handleCloseModal}
                        >
                          View Receipt
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    )
  },
)

export default CashoutSlideOutMenu
