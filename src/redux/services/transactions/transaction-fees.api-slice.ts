import { LOGIN_API_KEY, SERVICE_ACCOUNT_API_KEY } from '@/lib/constants'
import { baseApiSlice } from '@/redux/api/base-api'

export interface ITransactionFee {
  id: string
  description: string
  amount: number
  type: string
  currency: string
  createdAt: string
  updatedAt: string
}

export interface ITransactionFeesResponse {
  error: boolean
  responseCode: string
  responseMessage: string
  data: ITransactionFee[]
}

export interface IUpdateTransactionFeesResponse {
  error: boolean
  responseCode: boolean
  responseMessage: string
  data: {}
}

export const getTransactionFeesApiSlice = baseApiSlice.injectEndpoints({
  endpoints: builder => ({
    getTransactionFees: builder.query<ITransactionFeesResponse, void>({
      query: () => ({
        url: `transactions/admin/fees`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['getTransactionFees'],
      transformErrorResponse: response => {
        // Check if original status code === 426 and modify the response as needed
        if (response.status === 426) {
          localStorage.removeItem(LOGIN_API_KEY)
          localStorage.removeItem(SERVICE_ACCOUNT_API_KEY)
        }
        // Default case, return the original response
        return response
      },
    }),

    updateTransactionFees: builder.mutation<
      IUpdateTransactionFeesResponse,
      Record<string, string>
    >({
      query: payload => ({
        url: `transactions/admin/fees`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      }),
      invalidatesTags: ['getTransactionFees'],
    }),
  }),
})

export const { useGetTransactionFeesQuery, useUpdateTransactionFeesMutation } =
  getTransactionFeesApiSlice
