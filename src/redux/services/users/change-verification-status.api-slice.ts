import { baseApiSlice } from '@/redux/api/base-api'
import { IUser } from './user.api-slice'

export interface IChangeVerificationResponse {
  error: boolean
  responseCode: string
  responseMessage: string
  data: {}
}

export interface IChangeAgentShopStatusPayload {
  status: 'Approved' | 'Pending' | 'Declined'
  statusMessage: string
  id: string
}

export interface IGetAgentShopStatusResponse {
  error: boolean
  responseCode: string
  responseMessage: string
  data: {
    status: string
    _id: string
    agent: string
    name: string
    address: string
    country: string
    state: string
    businessRegCert: string
    documents: string[]
    latitude: string
    longitude: string
    workingHours: {
      day: string
      isOpen: boolean
      openingTime: string
      closingTime: string
      _id: string
    }[]
    agentType: string
    placePhotos: string[]
    bank: string
    accountNumber: string
    accountName: string
    approved: boolean
    createdAt: string
    updatedAt: string
    __v: number
  }
}

export const agentShopApiSlice = baseApiSlice.injectEndpoints({
  endpoints: builder => ({
    changeAgentShopStatus: builder.mutation<
      IChangeVerificationResponse,
      IChangeAgentShopStatusPayload
    >({
      query: ({ id, status, statusMessage }) => ({
        url: `settings/admin/agent-shop-id/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { status, statusMessage },
      }),
      invalidatesTags: ['getUser'],
    }),

    getAgentShopStatus: builder.query<
      IGetAgentShopStatusResponse,
      Pick<IChangeAgentShopStatusPayload, 'id'>
    >({
      query: ({ id }) => ({
        url: `settings/admin/agent-shop-id/${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      providesTags: ['getUser'],
    }),
  }),
})

export const { useChangeAgentShopStatusMutation, useGetAgentShopStatusQuery } =
  agentShopApiSlice
