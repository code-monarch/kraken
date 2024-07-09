import { baseApiSlice } from '@/redux/api/base-api'

export interface IFundDisbursementWalletResponse {
  error: boolean
  responseCode: boolean
  responseMessage: string
  data: {
    id: string
    status: string //e.g. "COMPLETED",
    userid: string
    description: string
    type: string
    reference: string
    sessionID: string
    order_amount: number
    fee: number
    currency: string //e.g. "NGN",
    metadata: {
      agent: {
        lastname: string
        firstname: string
        phoneNumber: string
        address: string
        id: string
        email: string
      }
    }
    updatedAt: string
    createdAt: string
  }
}

export interface IFundDisbursementWalletPayload {
  userid: string
  currency: string // e.g. "NGN",
  amount: number
  type: 'credit' | 'liquidate'
}
export const fundDisbursementWalletApiSlice = baseApiSlice.injectEndpoints({
  endpoints: builder => ({
    fundDisbursementWallet: builder.mutation<
      IFundDisbursementWalletResponse,
      IFundDisbursementWalletPayload
    >({
      query: payload => ({
        url: `/transactions/admin/wallets/agent/fund`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      }),
      invalidatesTags: [
        'getUser',
        'getTransactions',
        'getSingleTransactions',
        'getTransactionMatrix',
        'getTransactionMatrixAlltime',
        'getCashoutRequests',
      ],
    }),
  }),
})

export const { useFundDisbursementWalletMutation } =
  fundDisbursementWalletApiSlice
