import { baseApiSlice } from '@/redux/api/base-api'

export interface ICashoutRequest {
  id: string
  userid: string
  walletid: string
  transactionid: string
  approved_by: null
  status: string
  amount: number
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
        firstname: string
        lastname: string
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
          firstname: string
          lastname: string
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
        keepUnusedDataFor: 5,
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
        keepUnusedDataFor: 5,
      }),
      providesTags: ['getCashoutRequests'],
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
        keepUnusedDataFor: 5,
      }),
      invalidatesTags: ['getCashoutRequests'],
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
        keepUnusedDataFor: 5,
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
