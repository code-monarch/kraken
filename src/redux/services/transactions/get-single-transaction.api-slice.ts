import { baseApiSlice } from '@/redux/api/base-api'
import { Transaction } from './get-transactions.api-slice'
import { LOGIN_API_KEY, SERVICE_ACCOUNT_API_KEY } from '@/lib/constants'
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
                    }
                }),
                providesTags: ['getSingleTransactions'],
                transformErrorResponse: (response) => {
                    // Check if original status code === 401 and modify the response as needed
                    if (response.status === 401) {
                        localStorage.removeItem(LOGIN_API_KEY)
                        localStorage.removeItem(SERVICE_ACCOUNT_API_KEY)
                    }
                    // Default case, return the original response
                    return response
                },
            },
        ),
    }),
})

export const { useGetSingleTransactionsQuery } = getSingleTransactionsApiSlice
