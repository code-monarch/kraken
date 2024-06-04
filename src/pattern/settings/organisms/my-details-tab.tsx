import React, { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import PersonalInfo from '../molecules/personal-info'
import YourPhotoText from '../molecules/your-photo-text'
import SettingsImageInput from '@/pattern/common/molecules/inputs/settings-image-input'
import userImg from '@/public/images/user-img.png'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import EmailInput from '@/pattern/common/molecules/inputs/email-input'
import FormInput from '@/pattern/common/molecules/inputs/form-input'
import { Button } from '@/components/ui/button'
import {
  IUpdateAdminPayload,
  useUpdateAdminMutation,
} from '@/redux/services/admin/admin.api-slice'
import { show } from '@ebay/nice-modal-react'
import { SuccessModal } from '@/pattern/common/organisms/success-modal'
import { ErrorModal } from '@/pattern/common/organisms/error-modal'
import LoadingButton from '@/pattern/common/molecules/controls/loading-button'
import { toast } from 'sonner'
import {
  set2FaPreference,
  setAdminInfo,
  setAdminRole,
} from '@/redux/slices/user-slice'
import { useDispatch } from 'react-redux'

interface IProps {
  profilePic: any
  firstname: string
  lastname: string
  email: string
}

const MyDetailsTab = ({
  firstname,
  lastname,
  email,
  profilePic,
}: IProps) => {
  const [selectedFile, setSelectedFile] = useState(userImg)
  const dispatch = useDispatch()

  const defaultValues = {
    userImg: '',
    firstname: firstname,
    lastname: lastname,
    email: email,
  }

  const methods = useForm<IUpdateAdminPayload>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: defaultValues,
  })

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods

  const [updateAdmin, { isLoading, isSuccess, isError }] =
    useUpdateAdminMutation()

  const onSubmit: SubmitHandler<IUpdateAdminPayload> = data => {
    console.log('DATA TO SUBMIT: ')
    updateAdmin({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
    })
      .unwrap()
      .then(res => {
        show(SuccessModal, { message: 'Profile Updated Successfully' })
        // dispatch(setAdminRole(res?.data.userType))
        dispatch(
          setAdminInfo({
            firstname: res?.data.firstname,
            lastname: res?.data.lastname,
            email: res?.data.email,
            phoneNumber: res?.data.phoneNumber,
          }),
        )
        // dispatch(
        //   set2FaPreference({ sms2fa: res?.data.twoFactor!, google2fa: false }),
        // )
      })
      .catch(err => {
        toast.error('Unexpected error', {
          description: `${
            err?.data?.responseMessage ??
            'An error occured while trying to update your profile'
          }`,
          duration: 8000,
          cancel: {
            label: 'Cancel',
            onClick: () => console.log('Cancel!'),
          },
        })
        // show(ErrorModal, { message: err.data.responseMessage ?? "Something went wrong" });
      })
  }

  return (
    <div>
      <div className='flex items-center justify-between my-4 '>
        <PersonalInfo />
        <div className='flex items-center gap-3'>
          <Button variant='outline' size='sm' className='w-fit'>
            Cancel
          </Button>

          <LoadingButton
            loading={isLoading}
            type='submit'
            onClick={handleSubmit(onSubmit)}
            size='sm'
            className='w-fit'
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
