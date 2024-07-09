import { LOGIN_API_KEY, SERVICE_ACCOUNT_API_KEY } from '@/lib/constants'
import { baseApiSlice } from '@/redux/api/base-api'

export interface ITransactionMatrixChartResponse {
    error: boolean
    responseCode: string
    responseMessage: string
    data: {
        today: {
            deposit: {
                total_volume: number
                total_tranx: number
                average_tranx: number
            }
            Withdrawal: {
                total_volume: number
                total_tranx: number
                average_tranx: number
            }
            Cashout: {
                total_volume: number
                total_tranx: number
                average_tranx: number
            }
        }
        last30Days: {
            deposit: {
                total_volume: number
                total_tranx: number
                average_tranx: number
            }
            Withdrawal: {
                total_volume: number
                total_tranx: number
                average_tranx: number
            }
            Cashout: {
                total_volume: number
                total_tranx: number
                average_tranx: number
            }
        }
        last90Days: {
            deposit: {
                total_volume: number
                total_tranx: number
                average_tranx: number
            }
            Withdrawal: {
                total_volume: number
                total_tranx: number
                average_tranx: number
            }
            Cashout: {
                total_volume: number
                total_tranx: number
                average_tranx: number
            }
        }
        lastYear: {
            deposit: {
                total_volume: number
                total_tranx: number
                average_tranx: number
            }
            Withdrawal: {
                total_volume: number
                total_tranx: number
                average_tranx: number
            }
            Cashout: {
                total_volume: number
                total_tranx: number
                average_tranx: number
            }
        }
    }
}

interface ITransactionMatrixPayload {
    interval: "weekly" | "monthly" | "yearly"
    startDate?: string // e.g. 2024-05-31T01:31:21.761Z
    endDate?: string // e.g. 2024-05-31T01:31:21.761Z
}

export const getTransactionMatrixChartApiSlice = baseApiSlice.injectEndpoints({
    endpoints: builder => ({
        getTransactionMatrixChart: builder.query<
            ITransactionMatrixChartResponse,
            ITransactionMatrixPayload
        >({
            query: ({ interval, startDate, endDate }) => ({
                url: `/transactions/admin/matrix/chart?interval=${interval}${startDate ? `?q=${startDate}` : ''}${endDate ? `?q=${endDate}` : ''}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: ['getTransactionMatrixChart'],
            transformErrorResponse: (response) => {
                // Check if original status code === 401 and modify the response as needed
                if (response.status === 401) {
                    localStorage.removeItem(LOGIN_API_KEY)
                    localStorage.removeItem(SERVICE_ACCOUNT_API_KEY)
                }
                // Default case, return the original response
                return response
            },
        }),
    }),
})

export const { useGetTransactionMatrixChartQuery } = getTransactionMatrixChartApiSlice
