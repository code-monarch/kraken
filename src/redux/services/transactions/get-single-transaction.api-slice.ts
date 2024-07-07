import { baseApiSlice } from '@/redux/api/base-api'
import { Transaction } from './get-transactions.api-slice'
interface ISingleTransactionsResponse {
    error: boolean
    responseCode: string
    responseMessage: string
    data: Transaction
}

interface ISingleTransactionsPayload {
    transactionId: string
}

export const getSingleTransactionsApiSlice = baseApiSlice.injectEndpoints({
    endpoints: builder => ({
        getSingleTransactions: builder.query<ISingleTransactionsResponse, ISingleTransactionsPayload>(
            {
                query: ({ transactionId }) => ({
                    url: `transactions/admin/single/${transactionId}`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    keepUnusedDataFor: 5,
                }),
                providesTags: ['getSingleTransactions'],
            },
        ),
    }),
})

export const { useGetSingleTransactionsQuery } = getSingleTransactionsApiSlice
