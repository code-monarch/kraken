import { baseApiSlice } from '@/redux/api/base-api'

export type Transactions = {
  id: string
  userid: string
  description: string
  type: string
  reference: string
  sessionID: string
  order_amount: number | string
  fee: string
  currency: string // e.g. "USD",
  status: string //e.g. "COMPLETED",
  metadata: {
    customer: {
      email: string
      customerid: string
    }
  }
  createdAt: string // e.g. 2024-05-31T01:31:21.761Z,
  updatedAt: string // e.g. 2024-05-31T01:31:21.761Z,
  history: {
    id: string
    walletid: string
    transactionid: string
    amount: string
    initial_balance: number
    balance_after: number
    type: string
    is_reversed: null
    createdAt: string // e.g. 2024-05-31T01:31:22.017Z
    updatedAt: string // e.g. 2024-05-31T01:31:22.017Z
  }
}

export interface ITransactionsResponse {
  error: boolean
  responseCode: string
  responseMessage: string
  data: Transactions[]
  // Placeholder type for Pagination
  pagination: {
    totalPages: number
  }
}

interface ITransactionsPayload {
  pageSize?: number
  page?: number
  q?: string // search query
}

export const getTransactionsMatrixApiSlice = baseApiSlice.injectEndpoints({
  endpoints: builder => ({
    getTransactionsMatrix: builder.query<ITransactionsResponse, ITransactionsPayload>(
      {
        query: ({ pageSize, page, q }) => ({
          url: `admin/transactions?page=${page}&limit=${pageSize}${q ? `&q=${q}` : ''}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          keepUnusedDataFor: 5,
        }),
        providesTags: ['getTransactions'],
      },
    ),
  }),
})

export const { useGetTransactionsMatrixQuery } = getTransactionsMatrixApiSlice
