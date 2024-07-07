import { baseApiSlice } from '@/redux/api/base-api'

export type Transaction = {
  id: string
  userid: string
  description: string
  type: string
  reference: string
  sessionID: string
  order_amount: number | string
  fee: string
  currency: string // e.g. "USD",
  status: "COMPLETED" | "PENDING" | "FAILED",
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
  data: {
    contents: Transaction[],
    paginate: {
      totalResults: number,
      currentPage: number,
      totalPages: number
    }
  }
}

interface ITransactionsPayload {
  pageSize?: number
  page?: number
  searchQuery?: string // search query
  filterby?: { label: 'status'; value: 'COMPLETED' | 'PENDING' | 'FAILED' }
  type?: 'Trade' | 'Withdrawal' | 'Swap' | 'Deposit'
  startDate?: string
  endDate?: string
}

export const getTransactionsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: builder => ({
    getTransactions: builder.query<ITransactionsResponse, ITransactionsPayload>(
      {
        query: ({ pageSize, page, searchQuery, filterby, type, startDate, endDate }) => ({
          url: `transactions/admin?page=${page}&limit=${pageSize}${filterby ? `&filterby=${filterby.label}=${filterby.value ?? 'COMPLETED'}` : ''}${type ? `,type=${type}` : ''}${searchQuery ? `&searchQuery=${searchQuery}` : ''}${startDate ? `&startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}`,
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

export const { useGetTransactionsQuery } = getTransactionsApiSlice
