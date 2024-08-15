import { LOGIN_API_KEY, SERVICE_ACCOUNT_API_KEY, TRANSACTION_EXPORT } from '@/lib/constants'
import { baseApiSlice } from '@/redux/api/base-api'

export type TransactionMetadata = {
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
        agent: TransactionMetadata
        customer: TransactionMetadata
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


export interface ITransactionsPayload {
    startDate?: string
    endDate?: string
}

export const getExportTransactionsApiSlice = baseApiSlice.injectEndpoints({
    endpoints: builder => ({
        getExportTransactions: builder.query<string, ITransactionsPayload>(
            {
                query: ({ startDate, endDate }) => ({
                    url: `transactions/admin/export-transactions?${startDate ? `startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }),
                providesTags: ['getTransactionExportData'],
                transformErrorResponse: (response) => {
                    // Check if original status code === 426 and modify the response as needed
                    if (response.status === 426) {
                        localStorage.removeItem(LOGIN_API_KEY)
                        localStorage.removeItem(SERVICE_ACCOUNT_API_KEY)
                    }
                    if (response.status === 304) {
                        response.status = 200
                        response.data = response.data
                    }
                    // Default case, return the original response
                    return response
                },
            },
        ),
    }),
})

export const { useGetExportTransactionsQuery, useLazyGetExportTransactionsQuery } = getExportTransactionsApiSlice
