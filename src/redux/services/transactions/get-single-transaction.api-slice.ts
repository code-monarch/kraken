import { baseApiSlice } from '@/redux/api/base-api'
import { TransactionMetadata } from './get-transactions.api-slice'
import { LOGIN_API_KEY, SERVICE_ACCOUNT_API_KEY } from '@/lib/constants'

type SingleTransaction = {
    id: string,
    userid: string,
    description: string,
    type: "withdrawal" | "cashout" | "deposit" | "disbursement",
    reference: string,
    sessionID: string,
    order_amount: number,
    fee: number,
    currency: "SAR" | "NGN",
    status: 'COMPLETED' | 'PENDING' | 'FAILED',
    metadata: {
        channel: string,
        currency: "SAR" | "NGN",
        exchange_amount: string,
        rate: number,
        agent: TransactionMetadata,
        customer: TransactionMetadata
    },
    createdAt: string,
    updatedAt: string,
    history: {
        id: string,
        walletid: string,
        transactionid: string,
        amount: number,
        initial_balance: number,
        balance_after: number,
        type: "withdrawal" | "cashout" | "deposit" | "disbursement",
        is_reversed: boolean | null,
        createdAt: string,
        updatedAt: string
    }
}

interface ISingleTransactionsResponse {
    error: boolean
    responseCode: string
    responseMessage: string
    data: SingleTransaction
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
                    // Check if original status code === 426 and modify the response as needed
                    if (response.status === 426) {
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
