'use client'
import React, { useState } from 'react'
import PhoneNumberInput from '../../common/molecules/inputs/phone-input'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { create, show, useModal } from '@ebay/nice-modal-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import SelectInput from '../../common/molecules/inputs/select-input'
import FormInput from '../../common/molecules/inputs/form-input'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import EmailInput from '../../common/molecules/inputs/email-input'
import LoadingButton from '../../common/molecules/controls/loading-button'
import { Button } from '@/components/ui/button'
import AddNewUserSuccessModal from './add-new-user-success-modal'
import {
  IAddUserPayload,
  useAddUserMutation,
} from '@/redux/services/users/add-user.api-slice'
import { ErrorModal } from '@/pattern/common/organisms/error-modal'

const USER_TYPES = [
  { label: 'Agent', value: 'AGENT' },
  { label: 'User', value: 'USER' },
]

const AddUserFormSchema = Yup.object().shape({
  userType: Yup.string()
    .oneOf(['AGENT', 'USER'], 'Invalid type. Allowed values are agent or user.')
    .required('User type is Required'),
  firstname: Yup.string().required('First name is Required'),
  lastname: Yup.string().required('Last name is Required'),
  phoneNumber: Yup.string().required('Phone number is Required'),
  email: Yup.string()
    .email('Email must be a valid email address')
    .required('Please enter your email address'),
})

const AddNewUserModal = create(() => {
  // Controls value of Selected user type
  const [userType, setUserType] = useState<string>('')

  const { resolve, remove, visible } = useModal()

  const handleCloseModal = () => {
    resolve({ resolved: true })
    remove()
  }

  const defaultValues = {
    firstname: '',
    lastname: '',
    phoneNumber: '',
    email: '',
    // userType: '' as any,
  }

  const methods = useForm<IAddUserPayload>({
    mode: 'onChange',
    resolver: yupResolver(AddUserFormSchema),
    reValidateMode: 'onChange',
    delayError: 2000,
    defaultValues: defaultValues,
  })

  const {
    handleSubmit,
    formState: { errors, isDirty },
  } = methods

  const [addUser, { isLoading, isSuccess, isError }] = useAddUserMutation()

  const onSubmit: SubmitHandler<IAddUserPayload> = data => {
    addUser({
      email: data?.email,
      firstname: data?.firstname,
      lastname: data?.lastname,
      phoneNumber: data?.phoneNumber,
      userType: data.userType,
    })
      .unwrap()
      .then(res => {
        handleCloseModal()
        show(AddNewUserSuccessModal)
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
      <DialogContent className='bg-transparent w-fit max-w-[600px] h-fit outline-none border-none shadow-none'>
        <Card className='min-w-[300px] w-[600px] min-h-[337px] h-fit'>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='w-full flex flex-col gap-5'
            >
              <CardHeader>
                <CardTitle className='text-[1.125rem] font-semibold font-raleway'>
                  Add New User
                </CardTitle>
              </CardHeader>
              <CardContent className='w-full flex flex-col gap-y-4'>
                {/* User Type Select Input */}
                <SelectInput
                  name='userType'
                  label='User Type'
                  options={USER_TYPES}
                  placeholder='Select a user type'
                />

                <div className='w-full flex items-start gap-4'>
                  {/* First Name */}
                  <FormInput
                    label='First Name'
                    name='firstname'
                    error={errors['firstname']}
                    placeholder='Jon'
                    className='min-w-full pl-2'
                  />
                  {/* Last Name */}
                  <FormInput
                    label='Last Name'
                    name='lastname'
                    error={errors['lastname']}
                    placeholder='Doe'
                    className='min-w-full pl-2'
                  />
                </div>

                {/* Phone number */}
                <PhoneNumberInput
                  label='Phone Number'
                  name='phoneNumber'
                  error={errors['phoneNumber']}
                />

                {/* Email Input */}
                <EmailInput
                  label='Email address'
                  name='email'
                  error={errors['email']}
                />
              </CardContent>
              <CardFooter>
                {/* Controls */}
                <div className='w-full flex items-center justify-end'>
                  <div className='flex items-center justify-end gap-x-3'>
                    {/* Cancel Button */}
                    <Button
                      size='sm'
                      variant='outline'
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </Button>

                    {/* Add User Button */}
                    <LoadingButton
                      size='sm'
                      loading={isLoading}
                      disabled={!isDirty}
                      type='submit'
                    >
                      Add User
                    </LoadingButton>
                  </div>
                </div>
              </CardFooter>
            </form>
          </FormProvider>
        </Card>
      </DialogContent>
    </Dialog>
  )
})

export default AddNewUserModal
