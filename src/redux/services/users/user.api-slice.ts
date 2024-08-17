import { baseApiSlice } from '@/redux/api/base-api'

export type IUser = {
  _id: string
  id: number
  email: string
  twoFactor: boolean
  totp2FA: boolean
  isVerified: boolean
  verificationCode: string
  emailVerified: boolean
  deleted: boolean
  lastLogin: string
  createdAt: string
  updatedAt: string
  _v: number
  address: string
  country: string
  firstname: string
  imageUrl: string
  lastname: string
  middlename: string
  nin: string
  passportID: string
  phoneNumber: string
  state: string
  status: string
  userType: string
  kycMessage: string
  kycVerification: 'VERIFIED' | 'PENDING' | 'NOT-VERIFIED' | 'DECLINED'
}

export interface IGetUsersResponse {
  error: boolean
  responseCode: string
  responseMessage: string
  data: {
    count: number
    result: IUser[]
    pagination: {
      totalResults: number
      currentPage: number
      totalPages: number
    }
  }
}

export interface IGetSingleUserResponse {
  error: boolean
  responseCode: string
  responseMessage: string
  data: IUser
}

interface IUpdateUserResponse {
  error: boolean
  responseCode: string
  data: {
    _id: string
    email: string
    state: string
    lga: string
    address: string
    nin: string
    password: string
    userType: string
    roles: []
    phoneNumber: string
    transactions: []
    lastLogin: string
    createdAt: string
    updatedAt: string
    __v: number
    status: string
  }
}

interface IUserPayload {
  id: string
  status?: string
}

export interface IUserQuery {
  page?: number
  limit?: number
  status?: string
  startDate?: string
  endDate?: string
}

export const usersApiSlice = baseApiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<IGetUsersResponse, IUserQuery>({
      query: ({ page, limit, status, startDate, endDate }) => ({
        url: `settings/admin/users?page=${page}&limit=${limit}&status=${status}&startDate=${startDate}&endDate=${endDate}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),

    getSingleUser: builder.query<IGetSingleUserResponse, IUserPayload>({
      query: ({ id }) => ({
        url: `settings/admin/user/${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['getUser'],
    }),

    updateUser: builder.mutation<IUpdateUserResponse, IUserPayload>({
      query: ({ id, status }) => ({
        url: `settings/admin/activities/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: status,
      }),
      invalidatesTags: ['getUser'],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} = usersApiSlice
