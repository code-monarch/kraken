import { baseApiSlice } from '@/redux/api/base-api'

type Metadata = {
  lastname: string,
  firstname: string,
  phoneNumber: string,
  address: string,
  id: string,
  email: string
  imageUrl: string
}

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
    agent: Metadata
    customer: Metadata
  },
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

export interface ITransactionsPayload {
  pageSize?: number
  page?: number
  searchQuery?: string // search query
  filterby?: { label: 'status'; value: 'COMPLETED' | 'PENDING' | 'FAILED' | null | undefined }
  type?: 'Trade' | 'Withdrawal' | 'Swap' | 'Deposit' | null | undefined
  startDate?: string
  endDate?: string
}

export const getTransactionsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: builder => ({
    getTransactions: builder.query<ITransactionsResponse, ITransactionsPayload>(
      {
        query: ({ pageSize, page, searchQuery, filterby, type, startDate, endDate }) => ({
          url: `transactions/admin?page=${page}&limit=${pageSize}${filterby && filterby.value ? `&filterby=${filterby.label}=${filterby.value}` : ''}${type ?? ''}${searchQuery ? `&searchQuery=${searchQuery}` : ''}${startDate ? `&startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }),
        providesTags: ['getTransactions'],
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
      },
    ),
  }),
})

export const { useGetTransactionsQuery, useLazyGetTransactionsQuery } = getTransactionsApiSlice
