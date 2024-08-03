import { LOGIN_API_KEY, SERVICE_ACCOUNT_API_KEY } from '@/lib/constants'
import { baseApiSlice } from '@/redux/api/base-api'

export interface IExchangeRate {
  id: string
  base_currency: string
  target_currency: string
  ask: number
  bid: number
  createdAt: string
  updatedAt: string
}

export interface IExchangeRatesResponse {
  error: boolean
  responseCode: string
  responseMessage: string
  data: IExchangeRate[]
}

export interface IUpdateExchangeRatesResponse {
  error: boolean
  responseCode: string
  responseMessage: string
  data: {
    id: string
    base_currency: string
    target_currency: string
    ask: number
    bid: number
    createdAt: string
    updatedAt: string
  }
}

export interface IUpdateExchangeRatePayload {
  ask: number
  bid: number
  id: string
}

export const exchangeRatesApiSlice = baseApiSlice.injectEndpoints({
  endpoints: builder => ({
    getExchangeRates: builder.query<IExchangeRatesResponse, void>({
      query: () => ({
        url: `transactions/admin/exchange-rates`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['getExchangeRates'],
      transformErrorResponse: response => {
        // Check if original status code === 426 and modify the response as needed
        if (response.status === 426) {
          localStorage.removeItem(LOGIN_API_KEY)
          localStorage.removeItem(SERVICE_ACCOUNT_API_KEY)
        }
        // Default case, return the original response
        return response
      },
    }),

    updateExchangeRates: builder.mutation<
      IUpdateExchangeRatesResponse,
      IUpdateExchangeRatePayload
    >({
      query: ({ id, ...props }) => ({
        url: `transactions/admin/exchange-rates/${id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { ...props },
      }),
      invalidatesTags: ['getExchangeRates'],
    }),
  }),
})

export const { useGetExchangeRatesQuery, useUpdateExchangeRatesMutation } =
  exchangeRatesApiSlice
