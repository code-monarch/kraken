'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { create, show, useModal } from '@ebay/nice-modal-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import SlideOutCahsoutDetailsWidget from '../organisms/slideout-cashout-details-widget'
import SlideOutDivider from '@/pattern/common/molecules/data-display/slide-out-divider'
import PaymentInformation from '../organisms/payment-information'
import { Label } from '@/components/ui/label'
import LoadingButton from '@/pattern/common/molecules/controls/loading-button'
import AgentDetailsCard from '../molecules/agent-detail-card'
import ConfirmApprovalModal from '../organisms/confirm-approval-modal'
import { ApprovalSuccessfulModal } from '../organisms/approval-successful-modal'
import { useGetSingleCashoutRequestQuery } from '@/redux/services/transactions/get-cashout-requests.api-slice'
import { RequestDeclinedModal } from '../organisms/request-declined-modal'
import { DeclineRequestModal } from '../organisms/decline-request-modal'
import { formatNumber } from '@/lib/helper/format-number'
import TransactionsSlideOutMenuSkeleton from '@/pattern/common/molecules/skeletons/transactions-slide-out-menu-skeleton'
import { IMAGE_FALLBACK_PLACEHOLDER } from '@/lib/constants'
import { useGetAdminProfileQuery } from '@/redux/services/admin/admin.api-slice'
import { getInitials } from '@/lib/helper/get-initials'

interface IProps {
  transactionId: string
}

const CashoutSlideOutMenu = create(({ transactionId }: IProps) => {
  // Get Admin API query
  const { data: adminProfileInfo } = useGetAdminProfileQuery()

  const initials = getInitials(
    `${adminProfileInfo?.data.firstname} ${adminProfileInfo?.data.lastname}`,
  )

  const { data, isLoading, isSuccess, isError } =
    useGetSingleCashoutRequestQuery({
      id: transactionId,
    })

  const { resolve, remove, visible } = useModal()
  const [scrollHeight, setScrollHeight] = useState(window.innerHeight - 30)

  useEffect(() => {
    const handleResize = () => {
      setScrollHeight(window.innerHeight - 30)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleCloseModal = () => {
    resolve({ resolved: true })
    remove()
  }

  const handleShowReceipt = () => {
    if (data?.data.status === 'approved') {
      show(ApprovalSuccessfulModal, {
        amount: data?.data.amount,
        accountName: 'Cecilia Davis',
        accountNumber: '2078672378',
        bankName: 'GTCO',
      })
    } else {
      show(RequestDeclinedModal, {
        amount: data?.data.amount,
        accountName: 'Cecilia Davis',
        accountNumber: '2078672378',
        bankName: 'GTCO',
        comment: data?.data.comment ?? 'Reason for decline',
      })
    }
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
            {/* Display skeleton when loading content */}
            {isLoading && <TransactionsSlideOutMenuSkeleton />}

            {isSuccess && !isLoading && (
              <div className='w-full mt-[72px] px-[24px] pt-[24px] font-raleway space-y-[16px]'>
                <div className='px-4 space-y-[16px]'>
                  {/* Cashout Details */}
                  <SlideOutCahsoutDetailsWidget
                    amount={data?.data.amount as number}
                    date={data?.data.createdAt as string}
                    transactionId={data?.data.transaction.reference as string}
                    transactionType={data?.data.transaction.type as string}
                    status={data?.data.status as string}
                    currency={data?.data.currency as string}
                  />

                  {/* Payment information */}
                  <div className='w-full h-[192p] space-y-[30px] py-4'>
                    <PaymentInformation
                      accountName={'Cecilia Davis'}
                      accountNumber={'2078672378'}
                      bankName={'GTCO'}
                    />
                  </div>

                  {data?.data.status.toLowerCase() === 'pending' ? (
                    <div className='w-full flex flex-col items-center justify-between gap-3'>
                      <LoadingButton
                        size='sm'
                        variant='default'
                        onClick={() =>
                          show(ConfirmApprovalModal, {
                            accountName: 'Cecilia Davis',
                            accountNumber: '2078672378',
                            bankName: 'GTCO',
                            amount: data?.data.amount,
                            id: data?.data.transactionid,
                          })
                        }
                        loading={false}
                      >
                        I have made this payment
                      </LoadingButton>
                      <Button
                        size='sm'
                        variant='outlineDestructive'
                        onClick={() => {
                          show(DeclineRequestModal, {
                            accountName: 'Cecilia Davis',
                            accountNumber: '2078672378',
                            bankName: 'GTCO',
                            amount: data?.data.amount,
                            transactionId: data?.data.transactionid,
                          })
                        }}
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
                          ImageFallback={initials}
                          name={`${data?.data?.transaction?.metadata?.agent?.firstname} ${data?.data?.transaction?.metadata?.agent?.lastname}`}
                          number={
                            data?.data?.transaction?.metadata?.agent
                              ?.phoneNumber ?? '08166687292'
                          }
                          imageUrl={
                            data?.data?.transaction?.metadata?.agent
                              ?.imageUrl ?? IMAGE_FALLBACK_PLACEHOLDER
                          }
                        />

                        <div className='w-full flex items-start justify-between text-sm'>
                          <Label htmlFor='amount'>Total Rewards:</Label>
                          <div className='flex flex-col items-end'>
                            <div
                              id='amount'
                              className='font-medium text-[#2A2E33]'
                            >
                              {formatNumber({
                                number: data?.data.rewards,
                                mantissa: 2,
                              })}{' '}
                              {data?.data.currency}
                            </div>
                            <div
                              id='amount'
                              className='text-xs font-medium text-[#6D7786]'
                            >
                              {formatNumber({
                                number: data?.data.rewards,
                                mantissa: 2,
                              })}{' '}
                              {data?.data.currency}
                            </div>
                          </div>
                        </div>

                        <div className='w-full flex items-start justify-between text-sm'>
                          <Label htmlFor='amount'>Withdrawable Amount:</Label>
                          <div id='amount' className='text-[#2A2E33]'>
                            {data?.data.amount} {data?.data.currency}
                          </div>
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
                          onClick={handleShowReceipt}
                        >
                          View Receipt
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {isError && <div>Something went wrong</div>}
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
})

export default CashoutSlideOutMenu
