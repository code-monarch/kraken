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
import FormInput from '../../common/molecules/inputs/form-input'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import EmailInput from '../../common/molecules/inputs/email-input'
import LoadingButton from '../../common/molecules/controls/loading-button'
import { Button } from '@/components/ui/button'
import AddNewUserSuccessModal from './add-new-user-success-modal'
import { ErrorModal } from '@/pattern/common/organisms/error-modal'
import {
  ICreateAdminPayload,
  useCreateAdminMutation,
} from '@/redux/services/auth/create-admin.api-slice'
import { useGetRolesQuery } from '@/redux/services/auth/admin-roles.api-slice'
import PasswordInput from '@/pattern/common/molecules/inputs/password-input'
import Select, { MultiValue } from 'react-select'
import InputErrorMessage from '@/pattern/common/molecules/feedback/input-error-message'
import { FieldSet } from '@/pattern/common/molecules/inputs/fieldset'
import { Label } from '@/components/ui/label'

const USER_TYPES = [
  { label: 'Agent', value: 'AGENT' },
  { label: 'User', value: 'USER' },
]

interface RoleOption {
  value: string
  label: string
}

const CreateAdminFormSchema = Yup.object().shape({
  firstname: Yup.string().required('First name is Required'),
  lastname: Yup.string().required('Last name is Required'),
  phoneNumber: Yup.string().required('Phone number is Required'),
  roleIds: Yup.array()
    .of(Yup.string().required('Role is Required'))
    .min(1, 'At least one role is required')
    .required('At least one role is required'),
  password: Yup.string().required('Password is Required'),
  email: Yup.string()
    .email('Email must be a valid email address')
    .required('Please enter your email address'),
})

const CreateAdminModal = create(() => {
  const {
    data: roles,
    isLoading: isRolesLoading,
    isSuccess: isRolesSuccess,
    isFetching: isRolesFetching,
  } = useGetRolesQuery()

  // Controls value of Selected user type
  const [userType, setUserType] = useState<string>('')

  const [selectedRoles, setSelectedRoles] = useState<MultiValue<RoleOption>>([])

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
    password: '',
    roleIds: [],
  }

  const methods = useForm<ICreateAdminPayload>({
    mode: 'onChange',
    resolver: yupResolver(CreateAdminFormSchema),
    reValidateMode: 'onChange',
    delayError: 2000,
    defaultValues: defaultValues,
  })

  const {
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
  } = methods

  const [createAdmin, { isLoading, isSuccess, isError }] =
    useCreateAdminMutation()

  const onSubmit: SubmitHandler<ICreateAdminPayload> = data => {
    createAdmin({
      firstname: data?.firstname,
      lastname: data?.lastname,
      phoneNumber: data?.phoneNumber,
      email: data?.email,
      password: data?.password,
      roleIds: selectedRoles?.map(role => role.value),
    })
      .unwrap()
      .then(res => {
        handleCloseModal()
        show(AddNewUserSuccessModal, {
          title: res?.responseMessage ?? 'Admin account created successfully',
        })
      })
      .catch(err => {
        handleCloseModal()
        if (err.status !== 401 || 500 || 501) {
          show(ErrorModal, {
            message: err?.data?.responseMessage ?? 'Something went wrong',
          })
        } else {
          show(ErrorModal, {
            message: 'Something went wrong, please try again',
          })
        }
      })
  }

  // Update form value when roles are selected
  const handleRoleChange = (selected: MultiValue<RoleOption>) => {
    setSelectedRoles(selected)
    setValue(
      'roleIds',
      selected.map(role => role.value),
    )
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
                  Create a new Admin
                </CardTitle>
              </CardHeader>
              <CardContent className='w-full flex flex-col gap-y-4'>
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
                    error={errors['firstname']}
                    placeholder='Jon'
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

                {/* Password Input */}
                <PasswordInput
                  label='Password'
                  name='password'
                  error={errors['password']}
                />

                {/* Admin Roles Select Input */}
                <FieldSet>
                  <Label>Admin Role(s)</Label>
                  <Select
                    name='roleIds'
                    className='h-full w-full bg-[hsla(0,0%,100%,1)] font-medium text-base placeholder:text-[hsla(213,27%,84%,1)]  hover:border-primary focus:border-primary focus:ring-[3px] focus:ring-[var(--ring-primary)] transition-colors border border-[hsla(213,27%,84%,1)] rounded-[6px]'
                    options={roles?.data?.roles?.map(role => ({
                      value: role._id,
                      label: role.name,
                    }))}
                    isLoading={isRolesLoading || isRolesFetching}
                    isMulti={true}
                    placeholder='Select admin role(s)'
                    onChange={handleRoleChange}
                  />
                  {errors.roleIds && <InputErrorMessage name='roleIds' />}
                </FieldSet>
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
                      Create Admin
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

export default CreateAdminModal
