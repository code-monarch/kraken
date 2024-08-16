'use client'
import React, { useState } from 'react'
import { create, show, useModal } from '@ebay/nice-modal-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import VerifyStatusHeaderIcon from '@/pattern/common/atoms/icons/verify-status-header-icon'
import { SelectNewVerificationStatusWidget } from '../molecules/select-new-verification-status-widget'
import { CommentInput } from '@/pattern/common/molecules/inputs/comment-input'
import SelectInput from '@/pattern/common/molecules/inputs/select-input'
import * as Yup from 'yup'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SuccessModal } from '@/pattern/common/organisms/success-modal'
import { ErrorModal } from '@/pattern/common/organisms/error-modal'
import {
  IChangeAgentShopStatusPayload,
  useChangeAgentShopStatusMutation,
} from '@/redux/services/users/change-verification-status.api-slice'
import LoadingButton from '@/pattern/common/molecules/controls/loading-button'

interface IProps {
  id: string
  status: string
}

const VERIFICATION_TYPES = [
  { label: 'Pending', value: 'Pending' },
  { label: 'Approved', value: 'Approved' },
  { label: 'Declined', value: 'Declined' },
]

const ChangeVerificationFormSchema = Yup.object().shape({
  status: Yup.string().required('Status is Required'),
})

export const ChangeVerificationStatusModal = create(({ id, status }: IProps) => {
  const { resolve, remove, visible } = useModal()

  const handleCloseModal = () => {
    resolve({ resolved: true })
    remove()
  }

  // Controls value of comment
  const [comment, setComment] = useState<string>('')

  const defaultValues = {
    status: status,
  }

  const methods = useForm<any>({
    mode: 'onChange',
    resolver: yupResolver(ChangeVerificationFormSchema),
    reValidateMode: 'onChange',
    delayError: 2000,
    defaultValues: defaultValues,
  })

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods

  const [changeAgentShopStatus, { isLoading, isSuccess, isError }] =
    useChangeAgentShopStatusMutation()

  const onSubmit: SubmitHandler<IChangeAgentShopStatusPayload> = data => {
    changeAgentShopStatus({
      status: data?.status,
      statusMessage: comment,
      id: id,
    })
      .unwrap()
      .then(res => {
        handleCloseModal()
        show(SuccessModal, {
          message: 'Verication status updated successfully',
        })
      })
      .catch(err => {
        handleCloseModal()
        if (err.status !== 401 || 500 || 501) {
          show(ErrorModal, { message: err?.data?.responseMessage })
        } else {
          show(ErrorModal, {
            message: 'Something went wrong, please try again',
          })
        }
      })
  }

  return (
    <Dialog open={visible} onOpenChange={handleCloseModal}>
      <DialogContent className='w-fit h-fit p-0 outline-none border-none shadow-none'>
        <Card className='w-[400px] min-h-[460px] h-fit p-6'>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='w-full flex flex-col gap-5'
            >
              {/* Header */}
              <CardHeader className='w-full flex flex-col items-start gap-y-5'>
                <VerifyStatusHeaderIcon />
                <CardTitle className='text-[1.125rem] text-foreground font-semibold'>
                  Change Verification Status
                </CardTitle>
              </CardHeader>

              {/* Content */}
              <CardContent className='space-y-[16px] mb-[8px]'>
                <SelectInput
                  name='status'
                  label='Select New Verification Status'
                  options={VERIFICATION_TYPES}
                  placeholder='Select a verification status'
                  className='min-h-min'
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
                <LoadingButton
                  size='sm'
                  type='submit'
                  onClick={handleSubmit(onSubmit)}
                  loading={isLoading}
                >
                  Confirm
                </LoadingButton>
              </CardFooter>
            </form>
          </FormProvider>
        </Card>
      </DialogContent>
    </Dialog>
  )
})
