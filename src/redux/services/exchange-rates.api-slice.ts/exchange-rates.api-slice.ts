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

export interface ICreateExchangeRateResponse {
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

export interface IDeleteExchangeRateResponse {
  error: boolean
  responseCode: string
  responseMessage: string
}

export interface IUpdateExchangeRatePayload {
  ask: number
  bid: number
  id: string
}
export interface IDeleteExchangeRatePayload {
  id: string
}
export interface ICreateExchangeRatePayload {
  base_currency: string
  target_currency: string
  ask: number
  bid: number
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
      ICreateExchangeRateResponse,
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

    createExchangeRate: builder.mutation<
      ICreateExchangeRateResponse,
      ICreateExchangeRatePayload
    >({
      query: payload => ({
        url: `transactions/admin/exchange-rates`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      }),
      invalidatesTags: ['getExchangeRates'],
    }),

    deleteExchangeRate: builder.mutation<
      IDeleteExchangeRateResponse,
      IDeleteExchangeRatePayload
    >({
      query: ({ id }) => ({
        url: `transactions/admin/exchange-rates/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: payload,
      }),
      invalidatesTags: ['getExchangeRates'],
    }),
  }),
})

export const {
  useGetExchangeRatesQuery,
  useUpdateExchangeRatesMutation,
  useCreateExchangeRateMutation,
  useDeleteExchangeRateMutation,
} = exchangeRatesApiSlice
