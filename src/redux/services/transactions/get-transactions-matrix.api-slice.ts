import { baseApiSlice } from '@/redux/api/base-api'

export interface ITransactionMatrixResponse {
  error: boolean
  responseCode: string
  responseMessage: string
  data: {
    today: {
      deposit: {
        total_volume: number
        total_tranx: number
        average_tranx: number
      }
      Withdrawal: {
        total_volume: number
        total_tranx: number
        average_tranx: number
      }
      Cashout: {
        total_volume: number
        total_tranx: number
        average_tranx: number
      }
    }
    last30Days: {
      deposit: {
        total_volume: number
        total_tranx: number
        average_tranx: number
      }
      Withdrawal: {
        total_volume: number
        total_tranx: number
        average_tranx: number
      }
      Cashout: {
        total_volume: number
        total_tranx: number
        average_tranx: number
      }
    }
    last90Days: {
      deposit: {
        total_volume: number
        total_tranx: number
        average_tranx: number
      }
      Withdrawal: {
        total_volume: number
        total_tranx: number
        average_tranx: number
      }
      Cashout: {
        total_volume: number
        total_tranx: number
        average_tranx: number
      }
    }
    lastYear: {
      deposit: {
        total_volume: number
        total_tranx: number
        average_tranx: number
      }
      Withdrawal: {
        total_volume: number
        total_tranx: number
        average_tranx: number
      }
      Cashout: {
        total_volume: number
        total_tranx: number
        average_tranx: number
      }
    }
  }
}

interface ITransactionMatrixPayload {
  q?: string // search query
}

export const getTransactionMatrixApiSlice = baseApiSlice.injectEndpoints({
  endpoints: builder => ({
    getTransactionMatrix: builder.query<
      ITransactionMatrixResponse,
      ITransactionMatrixPayload
    >({
      query: ({ q }) => ({
        url: `transactions/admin/matrix${q ? `?q=${q}` : ''}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        keepUnusedDataFor: 5,
      }),
      providesTags: ['getTransactionMatrix'],
    }),
  }),
})

export const { useGetTransactionMatrixQuery } = getTransactionMatrixApiSlice
