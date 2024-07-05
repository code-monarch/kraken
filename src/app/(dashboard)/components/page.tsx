'use client'
import { Button } from '@/components/ui/button'
import LoadingButton from '@/pattern/common/molecules/controls/loading-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import EmailInput from '@/pattern/common/molecules/inputs/email-input'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Badge } from '@/components/ui/badge'
import TransactionsSlideOutMenu from '@/pattern/common/templates/slide-out-menu/transactions-slide-out-menu'
import { show } from '@ebay/nice-modal-react'
import UserDetailCard from '@/pattern/common/molecules/data-display/user-detail-card'
import DashboardMetricCard from '@/pattern/common/organisms/dashboard-metric-card'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import UserManagementTableTemplate from '@/pattern/user-management/templates/user-management-table-template'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { ConfirmApprovalModal } from '@/pattern/cashout-request/organisms/confirm-approval-modal'
import { ApprovalSuccessfulModal } from '@/pattern/cashout-request/organisms/approval-successful-modal'
import { DeclineRequestModal } from '@/pattern/cashout-request/organisms/decline-request-modal'
import { RequestDeclinedModal } from '@/pattern/cashout-request/organisms/request-declined-modal'
import CashoutSlideOutMenu from '@/pattern/cashout-request/templates/cahsout-slideout-menu'

export default function ComponentsPage() {
  const WishlistFormSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Please enter an email address'),
  })

  const methods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(WishlistFormSchema),
  })

  const {
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = () => {
    console.log('DATA TO SUBMIT: ')
  }

  const showTransactionSheet = () => {
    show(TransactionsSlideOutMenu)
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='bg-white min-w-[200px] w-fit h-[100px] flex items-center justify-center px-2'>
        <ToggleGroup type='single'>
          <ToggleGroupItem value='bold' aria-label='Toggle bold'>
            kdjk
          </ToggleGroupItem>
          <ToggleGroupItem value='italic' aria-label='Toggle italic'>
            sajajsh
          </ToggleGroupItem>
          <ToggleGroupItem
            value='strikethrough'
            aria-label='Toggle strikethrough'
          >
            sakjshj
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className='bg-black w-full h-[100px] flex items-center justify-center'>
        <DashboardMetricCard
          metric='Total Revenue'
          metricPercentage='50'
          metricValue={10000}
          isLoading={false}
        />
      </div>
      <Button variant='outline' onClick={showTransactionSheet}>
        Open Transaction Slide out Menu
      </Button>
      <Button autoFocus>Primary</Button>
      <Button autoFocus variant='secondary'>
        Secondary
      </Button>
      <Button autoFocus variant='outlinePrimary'>
        outline primary
      </Button>
      <Button autoFocus variant='outlineSecondary' disabled>
        outline primaryhghghgh
      </Button>
      <Button autoFocus variant='outlineSecondary' size='sm'>
        small outline Button
      </Button>
      <Button autoFocus variant='outlineSecondary' size='md'>
        medium outline Button
      </Button>
      <LoadingButton loading={true} disabled={true}>
        Loading Buttonnnn
      </LoadingButton>

      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form></form>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='outline'>Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter>
      </Card>

      <Input placeholder='loremjkjkj' />
      <Input variant='error' placeholder='loremjkjkj' />
      <Input variant='error' placeholder='loremjkjkj' disabled />
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col items-center gap-[30px]'
        >
          <EmailInput label='Email' name='Email' />
        </form>
      </FormProvider>

      <div className='bg-white w-[500px] h-[200px] px-2'>
        <UserDetailCard
          ImageFallback='JA'
          name='Josh to funny'
          number='+2349036075477'
        />
      </div>

      <div className='bg-white w-[500px] h-[200px] space-y-[50px]'>
        <Badge variant='failed'>jshdjhsdjs Badge</Badge>
      </div>

      <UserManagementTableTemplate />

      <Tabs defaultValue='account' className='w-[400px]'>
        <TabsList>
          <TabsTrigger value='account'>Account</TabsTrigger>
          <TabsTrigger value='password'>Password</TabsTrigger>
        </TabsList>
        <TabsContent value='account'>
          Make changes to your account here.
        </TabsContent>
        <TabsContent value='password'>Change your password here.</TabsContent>
      </Tabs>

      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <button onClick={() => show(ConfirmApprovalModal)}>
        Confirm Approval
      </button>
      <button onClick={() => show(ApprovalSuccessfulModal)}>
        Approval Successful
      </button>
      <button onClick={() => show(DeclineRequestModal)}>Decline Request</button>
      <button onClick={() => show(RequestDeclinedModal)}>
        Request Declined
      </button>
      <button
        onClick={() =>
          show(CashoutSlideOutMenu, {
            accountName: 'Cecilia Davis',
            accountNumber: '2078672378',
            bankName: 'GTCO',
            amount: '100,000.00',
            date: '2024-05-09T01:08:33.271Z',
            transactionId: '1234567890',
            transactionType: 'Cashout',
            status: 'approved',
            name: 'Cecilia Davis',
            phoneNumber: '08166687292',
            totalRewards: '100,00.00',
            withdrawableAmount: '80',
          })
        }
      >
        View Cashout Slideout
      </button>
    </main>
  )
}
