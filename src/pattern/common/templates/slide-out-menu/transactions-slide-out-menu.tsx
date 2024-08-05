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
import SlideOutTransactionDetailsWidget from '../../organisms/slide-out-transaction-details-widget'
import SlideOutDivider from '../../molecules/data-display/slide-out-divider'
import { Badge } from '@/components/ui/badge'
import UserDetailCard from '../../molecules/data-display/user-detail-card'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  FAILED_ICON_COLOUR,
  PENDING_ICON_COLOUR,
  SUCCESSFUL_ICON_COLOUR,
  TRANSACTION_ID,
} from '@/lib/constants'
import { useGetSingleTransactionsQuery } from '@/redux/services/transactions/get-single-transaction.api-slice'
import { cn } from '@/lib/utils'
import { formatDateTime } from '@/lib/helper/format-date-time'
import { formatNumber } from '@/lib/helper/format-number'
import { TransactionSlideOutMenuIcon } from '../../atoms/icons/transaction-slideout-menu-icon'
import Hidden from '../../molecules/data-display/hidden'
import TransactionsSlideOutMenuSkeleton from '../../molecules/skeletons/transactions-slide-out-menu-skeleton'
import { getInitials } from '@/lib/helper/get-initials'

interface IProps {
  transactionId: string
}

const TransactionsSlideOutMenu = create(({ transactionId }: IProps) => {
  const { resolve, remove, visible } = useModal()

  // Colour of slide-out menu icon
  const [iconColour, setIconColour] = useState<string>('')

  const pathname = usePathname()
  const { replace } = useRouter()

  // Get transaction_id url query param
  const searchParams = useSearchParams()
  const tranxId = searchParams.get(TRANSACTION_ID)

  // Get single Transaction API query
  const {
    data: transactionData,
    isLoading,
    isFetching,
    error,
    isError,
    isSuccess,
  } = useGetSingleTransactionsQuery({ transactionId: transactionId })

  // Determines colour of slide-out menu based on the transaction status
  useEffect(() => {
    switch (transactionData?.data?.status.toLowerCase()) {
      case 'completed':
        setIconColour(SUCCESSFUL_ICON_COLOUR)
        break
      case 'failed':
        setIconColour(FAILED_ICON_COLOUR)
        break
      case 'pending':
        setIconColour(PENDING_ICON_COLOUR)
        break
      default:
        setIconColour(PENDING_ICON_COLOUR)
    }
  }, [transactionData?.data?.status])

  const agentInitials = getInitials(
    `${transactionData?.data?.metadata?.agent?.firstname} ${transactionData?.data?.metadata?.agent?.firstname}`,
  )
  const customerInitials = getInitials(
    `${transactionData?.data?.metadata?.customer?.firstname} ${transactionData?.data?.metadata?.customer?.firstname}`,
  )

  const handleCloseModal = () => {
    resolve({ resolved: true })
    remove()
  }

  // Clears transaction_id search param and close slide-out menu
  const clearSearchParam = () => {
    replace(pathname, { scroll: true })
    handleCloseModal()
  }

  const [scrollHeight, setScrollHeight] = useState(window.innerHeight - 30)

  // Adjusts responsiveness(dimension) of the scrollArea
  useEffect(() => {
    const handleResize = () => {
      setScrollHeight(window.innerHeight - 30)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <Sheet
        modal
        open={visible}
        onOpenChange={() => {
          if (tranxId) {
            clearSearchParam()
          } else {
            handleCloseModal()
          }
        }}
      >
        <SheetContent>
          <div className='relative h-full'>
            <ScrollArea
              className='w-full rounded-sm'
              style={{ height: `${scrollHeight}px` }}
            >
              <SheetHeader className='absolute top-0 right-0 left-0 z-10'>
                <SheetTitle>Transactions details</SheetTitle>
              </SheetHeader>

              {/* Display skeleton when loading content */}
              <Hidden visible={isLoading}>
                <TransactionsSlideOutMenuSkeleton />
              </Hidden>
              {/* Display skeleton when loading content */}
              <Hidden visible={isError && !isFetching && !isLoading}>
                <h3 className='text-foreground text-24 font-raleway'>
                  No Record Found
                </h3>
              </Hidden>

              {/* Display content when data is loaded */}
              <Hidden visible={!isLoading && !isFetching && !error}>
                <div
                  className={cn(
                    'w-full mt-[72px] px-[24px] pt-[24px] font-raleway space-y-[16px]',
                  )}
                >
                  <div className='w-full h-[204px] flex flex-col items-center justify-center gap-y-6'>
                    {/* Slide out Icon */}
                    <TransactionSlideOutMenuIcon color={iconColour} />

                    <div className='w-full flex flex-col items-center space-y-[4px]'>
                      {/* Amount */}
                      <h3 className='flex-wrap max-w-xs text-foreground text-center text-24 font-raleway font-semibold'>
                        {transactionData?.data?.order_amount}{' '}
                        <span>{transactionData?.data?.currency}</span>
                      </h3>
                      {/* Status */}
                      <h4
                        className={cn(
                          'text-base font-semibold capitalize',
                          transactionData?.data?.status === 'COMPLETED' &&
                            'text-primary',
                          transactionData?.data?.status === 'FAILED' &&
                            'text-destructive',
                          transactionData?.data?.status === 'PENDING' &&
                            'text-[#FAAD14]',
                        )}
                      >
                        {`${transactionData?.data?.status}!` ?? null}
                      </h4>
                    </div>
                  </div>

                  <div className='px-4 space-y-[16px]'>
                    {/* Transaction Details */}
                    <SlideOutTransactionDetailsWidget
                      amount={`${transactionData?.data?.order_amount} ${transactionData?.data?.currency}`}
                      date={formatDateTime(
                        transactionData?.data?.createdAt as string,
                      )}
                      transactionFee={`${formatNumber({
                        number: Number(transactionData?.data?.fee),
                        mantissa: 2,
                      })} ${transactionData?.data?.currency}`}
                      transactionId={`${transactionData?.data?.id}`}
                      transationType={`${transactionData?.data?.type}`}
                    />

                    {/* Pilgrim details */}
                    <Hidden
                      visible={
                        transactionData?.data?.metadata?.customer ? true : false
                      }
                    >
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
                          imageUrl={
                            transactionData?.data?.metadata?.customer?.imageUrl
                          }
                          ImageFallback={customerInitials}
                          name={`${transactionData?.data?.metadata?.customer?.firstname} ${transactionData?.data?.metadata?.customer?.lastname}`}
                          number={
                            transactionData?.data?.metadata?.customer
                              ?.phoneNumber!
                          }
                        />
                      </div>
                    </Hidden>

                    {/* Agent details */}
                    <Hidden
                      visible={
                        transactionData?.data?.metadata?.customer ? true : false
                      }
                    >
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
                          imageUrl={
                            transactionData?.data?.metadata?.customer?.imageUrl
                          }
                          ImageFallback={agentInitials}
                          name={`${transactionData?.data?.metadata?.agent?.firstname} ${transactionData?.data?.metadata?.agent?.lastname}`}
                          number={
                            transactionData?.data?.metadata?.agent
                              ?.phoneNumber as string
                          }
                        />
                      </div>
                    </Hidden>
                  </div>
                </div>
              </Hidden>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
})

export default TransactionsSlideOutMenu
