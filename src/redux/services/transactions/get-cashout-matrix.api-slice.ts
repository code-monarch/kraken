import { baseApiSlice } from '@/redux/api/base-api'

export interface ICashoutMatrixResponse {
  error: boolean
  responseCode: string
  responseMessage: string
  data: {
    totalCashout: number
    approvedCashout: number
    pendingCashout: number
    declinedCashout: number
  }
}

interface ICashoutMatrixPayload {
  q?: string // search query
}

export const getCashoutMatrixApiSlice = baseApiSlice.injectEndpoints({
  endpoints: builder => ({
    getCashoutMatrix: builder.query<ICashoutMatrixResponse, void>({
      query: () => ({
        url: `transactions/admin/cashout-matrix`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        keepUnusedDataFor: 5,
      }),
      providesTags: ['getCashoutRequests'],
    }),
  }),
})

export const { useGetCashoutMatrixQuery } = getCashoutMatrixApiSlice
