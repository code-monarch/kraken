import { LOGIN_API_KEY, SERVICE_ACCOUNT_API_KEY } from '@/lib/constants'
import { baseApiSlice } from '@/redux/api/base-api'

export interface ITransactionMatrixAlltimeResponse {
  error: boolean
  responseCode: string
  responseMessage: string
  data: {
    total_volume: number
    total_tranx: number
    average_tranx: number
    balance: {
      settlemet: {
        NGN: number
        SAR: number
      }
      disbursement: {
        NGN: number
        SAR: number
      }
    }
  }
}

export const getTransactionMatrixApiSlice = baseApiSlice.injectEndpoints({
  endpoints: builder => ({
    getTransactionMatrixAlltime: builder.query<
      ITransactionMatrixAlltimeResponse,
      void
    >({
      query: () => ({
        url: `transactions/admin/matrix/alltime`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['getTransactionMatrixAlltime'],
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
  }),
})

export const { useGetTransactionMatrixAlltimeQuery } =
  getTransactionMatrixApiSlice
