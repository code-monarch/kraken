import { baseApiSlice } from '@/redux/api/base-api'


export interface ITransactionMatrixAlltimeResponse {
    error: boolean,
    responseCode: string,
    responseMessage: string,
    data: {
        total_volume: number,
        total_tranx: number,
        average_tranx: number,
        balance: {
            NGN: number,
            SAR: number
        }
    }
}

interface ITransactionMatrixAlltimePayload {
    q?: string // search query
}

export const getTransactionMatrixApiSlice = baseApiSlice.injectEndpoints({
    endpoints: builder => ({
        getTransactionMatrixAlltime: builder.query<ITransactionMatrixAlltimeResponse, ITransactionMatrixAlltimePayload>(
            {
                query: ({ q }) => ({
                    url: `transactions/admin/matrix${q ? `?q=${q}` : ''}`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    keepUnusedDataFor: 5,
                }),
                providesTags: ['getTransactionMatrixAlltime'],
            },
        ),
    }),
})

export const { useGetTransactionMatrixAlltimeQuery } = getTransactionMatrixApiSlice
