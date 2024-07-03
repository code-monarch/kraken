import { baseApiSlice } from '@/redux/api/base-api'

interface ICashoutRequest {
    id: string,
    userid: string,
    description: string,
    type: string,
    reference: string,
    sessionID: string,
    order_amount: number,
    fee: number,
    currency: "NGN",
    status: "PENDING" | "APPROVED" | "DECLINED",
    metadata: string,
    createdAt: string,
    updatedAt: string,
    history: {
        id: string,
        walletid: string,
        transactionid: string,
        amount: string,
        initial_balance: number,
        balance_after: number,
        type: "debit",
        is_reversed: null,
        createdAt: string,
        updatedAt: string
    }
}

interface IGetCashoutRequestsResponse {
    error: boolean,
    responseCode: string,
    responseMessage: string,
    data: ICashoutRequest[]
}

export const getCashoutRequestsApiSlice = baseApiSlice.injectEndpoints({
    endpoints: builder => ({
        getCashoutRequests: builder.query<IGetCashoutRequestsResponse, void>(
            {
                query: () => ({
                    url: `transactions/admin/cashout`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    keepUnusedDataFor: 5,
                }),
                providesTags: ['getCashoutRequests'],
            },
        ),
    }),
})

export const { useGetCashoutRequestsQuery } = getCashoutRequestsApiSlice
