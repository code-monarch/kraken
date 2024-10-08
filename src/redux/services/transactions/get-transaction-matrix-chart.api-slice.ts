import { LOGIN_API_KEY, SERVICE_ACCOUNT_API_KEY } from '@/lib/constants'
import { intervalType } from '@/lib/data'
import { baseApiSlice } from '@/redux/api/base-api'
import { IChartResponse } from '@/redux/types'

export interface ITransactionMatrixChartResponse {
    error: boolean,
    responseCode: string,
    responseMessage: string,
    data: IChartResponse
}

interface ITransactionMatrixPayload {
    interval: intervalType['value']
    startDate?: string // e.g. 2024-05-31
    endDate?: string // e.g. 2024-05-31
}

export const getTransactionMatrixChartApiSlice = baseApiSlice.injectEndpoints({
    endpoints: builder => ({
        getTransactionMatrixChart: builder.query<
            ITransactionMatrixChartResponse,
            ITransactionMatrixPayload
        >({
            query: ({ interval, startDate, endDate }) => ({
                url: `/transactions/admin/matrix/chart?interval=${interval}${startDate ? `&startDate=${startDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            providesTags: ['getTransactionMatrixChart'],
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
    }),
})

export const { useGetTransactionMatrixChartQuery } = getTransactionMatrixChartApiSlice
