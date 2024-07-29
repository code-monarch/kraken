import { baseApiSlice } from '@/redux/api/base-api'

export interface ICreateAdminResponse {
  error: boolean
  responseCode: string
  data: {
    id: number
    firstname: string
    email: string
    password: string
    userType: string
    twoFactor: boolean
    roles: string[]
    transactions: []
    _id: string
    lastLogin: string
    createdAt: string
    updatedAt: string
    __v: number
  }
}

export interface ICreateAdminPayload {
  firstname: string
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
