import { LOGIN_API_KEY, SERVICE_ACCOUNT_API_KEY } from '@/lib/constants'
import { baseApiSlice } from '@/redux/api/base-api'

export interface ICashoutRequest {
  id: string
  userid: string
  walletid: string
  transactionid: string
  approved_by: null
  status: string
  amount: number
  rewards: number
  currency: string
  matadata: null
  createdAt: string
  updatedAt: string
  comment: string
  transaction: {
    id: string
    userid: string
    description: string
    type: string
    reference: string
    sessionID: string
    order_amount: number
    fee: number
    currency: string
    status: string
    metadata: {
      agent: {
        lastname: string
        firstname: string
        phoneNumber: string
        address: string
        id: string
        email: string
        imageUrl: string
      }
    }
    createdAt: string
    updatedAt: string
  }
}

interface ISingleCashoutRequestResponse {
  error: boolean
  responseCode: string
  responseMessage: string
  data: {
    id: string
    userid: string
    walletid: string
    transactionid: string
    approved_by: null
    status: string
    amount: number
    rewards: number
    currency: string
    matadata: null
    createdAt: string
    updatedAt: string
    comment: string
    transaction: {
      id: string
      userid: string
      description: string
      type: string
      reference: string
      sessionID: string
      order_amount: number
      fee: number
      currency: string
      status: string
      metadata: {
        agent: {
          lastname: string
          firstname: string
          phoneNumber: string
          address: string
          id: string
          email: string
          imageUrl: string
        }
      }
      createdAt: string
      updatedAt: string
    }
    wallet: {
      id: string
      userid: string
      currency: string
      type: string
      available_balance: number
      ledger_balance: number
      is_frozen: boolean
      createdAt: string
      updatedAt: string
    }
  }
}

export interface IGetCashoutRequestsResponse {
  error: boolean
  responseCode: string
  responseMessage: string
  data: {
    contents: ICashoutRequest[]
    paginate: {
      totalResults: number
      currentPage: number
      totalPages: number
    }
  }
}

interface ICashoutRequestPayload {
  id: string
  comment?: string
}

interface ICashoutQuery {
  page?: number
  limit?: number
  filterby?: string
  startDate?: string
  endDate?: string
}

export const getCashoutRequestsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: builder => ({
    getCashoutRequests: builder.query<
      IGetCashoutRequestsResponse,
      ICashoutQuery
    >({
      query: ({ page, limit, filterby, startDate, endDate }) => ({
        url: `transactions/admin/cashout?page=${page}&limit=${limit}${filterby ? `&filterby=status=${filterby}` : ''}${startDate ? `&startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['getCashoutRequests'],
    }),

    getSingleCashoutRequest: builder.query<
      ISingleCashoutRequestResponse,
      ICashoutRequestPayload
    >({
      query: ({ id }) => ({
        url: `transactions/admin/cashout/${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['getCashoutRequests'],
      transformErrorResponse: (response) => {
        // Check if original status code === 426 and modify the response as needed
        if (response.status === 426) {
          localStorage.removeItem(LOGIN_API_KEY)
          localStorage.removeItem(SERVICE_ACCOUNT_API_KEY)
        }
        // Default case, return the original response
        return response
      },
    }),

    approveCashoutRequest: builder.mutation<
      ISingleCashoutRequestResponse,
      ICashoutRequestPayload
    >({
      query: ({ id }) => ({
        url: `transactions/admin/cashout/${id}/approved`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['getCashoutRequests', 'getTransactionMatrixChart'],
    }),

    declineCashoutRequest: builder.mutation<
      ISingleCashoutRequestResponse,
      ICashoutRequestPayload
    >({
      query: ({ id, comment }) => ({
        url: `transactions/admin/cashout/${id}/declined`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['getCashoutRequests'],
    }),
  }),
})

export const {
  useGetCashoutRequestsQuery,
  useGetSingleCashoutRequestQuery,
  useApproveCashoutRequestMutation,
  useDeclineCashoutRequestMutation,
} = getCashoutRequestsApiSlice
