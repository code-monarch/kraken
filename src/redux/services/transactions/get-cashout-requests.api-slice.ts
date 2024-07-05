import { baseApiSlice } from '@/redux/api/base-api'

interface ICashoutRequest {
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
    metadata: null
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

interface ISingleCashoutRequestResponse {
  error: boolean
  responseCode: string
  responseMessage: string
  data: ICashoutRequest
}

interface IGetCashoutRequestsResponse {
  error: boolean
  responseCode: string
  responseMessage: string
  data: ICashoutRequest[]
}

interface ICashoutRequestPayload {
  id: string
}

export const getCashoutRequestsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: builder => ({
    getCashoutRequests: builder.query<IGetCashoutRequestsResponse, void>({
      query: () => ({
        url: `transactions/admin/cashout`,
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
  }),
})

export const { useGetCashoutRequestsQuery, useGetSingleCashoutRequestQuery } =
  getCashoutRequestsApiSlice
