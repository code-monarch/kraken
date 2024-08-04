import React, { useMemo, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import PersonalInfo from '../molecules/personal-info'
import YourPhotoText from '../molecules/your-photo-text'
import SettingsImageInput from '@/pattern/common/molecules/inputs/settings-image-input'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import EmailInput from '@/pattern/common/molecules/inputs/email-input'
import FormInput from '@/pattern/common/molecules/inputs/form-input'
import { Button } from '@/components/ui/button'
import {
  IUpdateAdminPayload,
  useGetAdminProfileQuery,
  useUpdateAdminMutation,
} from '@/redux/services/admin/admin.api-slice'
import { show } from '@ebay/nice-modal-react'
import { SuccessModal } from '@/pattern/common/organisms/success-modal'
import LoadingButton from '@/pattern/common/molecules/controls/loading-button'
import { toast } from 'sonner'
import { useUpdateProfilePhotoMutation } from '@/redux/services/admin/update-profile-photo.api-slice'
import { IMAGE_FALLBACK_PLACEHOLDER } from '@/lib/constants'

function isBase64(str: string) {
  // Regular expression for validating Base64 image strings
  const base64ImageRegex =
    /^data:image\/(png|jpeg|jpg|gif|bmp|webp);base64,[A-Za-z0-9+/]+={0,2}$/
  return base64ImageRegex.test(str)
}

const MyDetailsTab = () => {
  const { data } = useGetAdminProfileQuery()

  const adminImage = data?.data.imageUrl ?? IMAGE_FALLBACK_PLACEHOLDER

  const [selectedFile, setSelectedFile] = useState(
    adminImage?.startsWith('https://') ? adminImage : 'https://' + adminImage,
  )

  useMemo(() => {
    setSelectedFile(
      adminImage?.startsWith('https://') ? adminImage : 'https://' + adminImage,
    )
  }, [adminImage])

  const defaultValues = {
    userImg: '',
    firstname: data?.data.firstname,
    lastname: data?.data.lastname,
    email: data?.data.email,
  }

  const methods = useForm<IUpdateAdminPayload>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: defaultValues,
  })

  const {
    handleSubmit,
    formState: { isDirty },
    getValues,
    reset,
  } = methods

  console.log('getValues', getValues)

  const [updateAdmin, { isLoading, isSuccess, isError }] =
    useUpdateAdminMutation()
  const [updateProfilePhoto, { isLoading: isProfilePhotoLoading }] =
    useUpdateProfilePhotoMutation()

  const onSubmit: SubmitHandler<IUpdateAdminPayload> = data => {
    const promises = []

    if (isBase64(selectedFile)) {
      const updateProfilePhotoPromise = updateProfilePhoto({
        image: selectedFile,
      }).unwrap()
      promises.push(updateProfilePhotoPromise)
    }

    if (isDirty) {
      const updateAdminPromise = updateAdmin({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
      }).unwrap()
      promises.push(updateAdminPromise)
    }

    Promise.all(promises)
      .then(() => {
        show(SuccessModal, { message: 'Profile Updated Successfully' })
      })
      .catch(err => {
        toast.error('Unexpected error', {
          description: `${
            err?.data?.responseMessage ??
            'An error occurred while trying to update your profile'
          }`,
          duration: 8000,
          cancel: {
            label: 'Close',
            onClick: () => console.log('Close!'),
          },
        })
      })
  }

  console.log('selected file: ', selectedFile)

  return (
    <div>
      <div className='flex items-center justify-between my-4 '>
        <PersonalInfo />
        <div className='flex items-center gap-3'>
          <Button
            variant='outline'
            size='sm'
            disabled={!isDirty}
            onClick={() => reset()}
            className='w-fit'
          >
            Cancel
          </Button>

          <LoadingButton
            loading={isLoading || isProfilePhotoLoading}
            type='submit'
            onClick={handleSubmit(onSubmit)}
            size='sm'
            className='w-fit disabled:cursor-not-allowed'
            disabled={!isDirty && !isBase64(selectedFile)}
          >
            Save
          </LoadingButton>
        </div>
      </div>
      <Separator />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex items-start gap-[32px] my-4'>
            <div className='w-[280px]'>
              <YourPhotoText />
            </div>
            <SettingsImageInput
              name='userImg'
              label='Photo'
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />
          </div>
          <Separator />

          <div className='flex items-center gap-[32px] my-4'>
            <Label className='font-bold w-[280px]'>Name</Label>
            <div className='flex gap-5 w-[512px]'>
              <FormInput name='firstname' className='min-w-[246px] w-[246px]' />
              <FormInput name='lastname' className='min-w-[246px] w-[246px]' />
            </div>
          </div>
          <Separator />

          <div className='flex items-center gap-[32px] my-4'>
            <Label className='font-bold w-[280px]'>Email</Label>
            <div className='col-span-1 w-[512px]'>
              <EmailInput
                name='email'
                className='bg-[#f5fffa] text-primary border-0'
              />
            </div>
          </div>
          <Separator />
        </form>
      </FormProvider>
    </div>
  )
}

export default MyDetailsTab
