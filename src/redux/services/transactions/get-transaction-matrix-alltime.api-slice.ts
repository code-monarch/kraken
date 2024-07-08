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
      NGN: number
      SAR: number
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
        }
      }),
      providesTags: ['getTransactionMatrixAlltime'],
      transformErrorResponse: (response) => {
        // Check if original status code === 401 and modify the response as needed
        if (response.status === 401) {
          localStorage.clear()
          return {
            status: 426,
            message: 'Invalid API key',
          };
        }
        // Default case, return the original response
        return response
      },
    }),
  }),
})

export const { useGetTransactionMatrixAlltimeQuery } =
  getTransactionMatrixApiSlice
