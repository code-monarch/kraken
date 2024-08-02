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

export enum IUpdateTransactionFeesEnum {
  CASHOUT_REWARD = '74c0ef8d-b551-49c7-99cd-37c16ba7cb6a',
  DEPOSIT_FEE = 'ef986bae-b0a5-4c81-b970-e5d6041fefc1',
  WITHDRAWAL_FEE = 'a160651d-6abd-4a06-a5af-1ccc54f2c585',
}

/**
 * @field 74c0ef8d-b551-49c7-99cd-37c16ba7cb6a = [cashout reward id]
 * @field ef986bae-b0a5-4c81-b970-e5d6041fefc1 = [deposit fee id]
 * @field a160651d-6abd-4a06-a5af-1ccc54f2c585 = [withdrawal fee id]
 */
export interface IUpdateTransactionFeesPayload {
  '74c0ef8d-b551-49c7-99cd-37c16ba7cb6a'?: number
  'ef986bae-b0a5-4c81-b970-e5d6041fefc1'?: number
  'a160651d-6abd-4a06-a5af-1ccc54f2c585'?: number
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
      IUpdateTransactionFeesPayload
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
