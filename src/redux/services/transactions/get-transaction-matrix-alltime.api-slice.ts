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
        },
        keepUnusedDataFor: 5,
      }),
      providesTags: ['getTransactionMatrixAlltime'],
    }),
  }),
})

export const { useGetTransactionMatrixAlltimeQuery } =
  getTransactionMatrixApiSlice
