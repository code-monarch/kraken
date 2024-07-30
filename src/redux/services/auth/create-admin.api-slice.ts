import { baseApiSlice } from '@/redux/api/base-api'

export interface ICreateAdminResponse {
  error: boolean
  responseCode: string
  responseMessage: string
  data: {
    id: number
    firstname: string
    lastname: string
    email: string
    phoneNumber: string
    twoFactor: boolean
    totp2FA: boolean
    isVerified: boolean
    emailVerified: boolean
    status: string
    password: string
    userType: string
    roles: string[]
    _id: string
    lastLogin: string
    createdAt: string
    updatedAt: string
    __v: number
  }
}

export interface ICreateAdminPayload {
  firstname: string
  lastname: string
  phoneNumber: string
  email: string
  password: string
  roleIds: string[]
}

export const createAdminApiSlice = baseApiSlice.injectEndpoints({
  endpoints: builder => ({
    createAdmin: builder.mutation<ICreateAdminResponse, ICreateAdminPayload>({
      query: createDetails => ({
        url: 'auth/admin/create-admin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: createDetails,
      }),
    }),
  }),
})

export const { useCreateAdminMutation } = createAdminApiSlice
