import { baseApiSlice } from '@/redux/api/base-api'

export interface IRole {
  _id: string
  name: string
  description: string
  policies: string[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IGetRolesResponse {
  error: boolean
  responseCode: string
  responseMessage: string
  data: {
    roles: IRole[]
    count: number
  }
}

export const rolesApiSlice = baseApiSlice.injectEndpoints({
  endpoints: builder => ({
    getRoles: builder.query<IGetRolesResponse, void>({
      query: () => ({
        url: `auth/admin/get-roles`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      //   providesTags: [""],
    }),
  }),
})

export const { useGetRolesQuery } = rolesApiSlice
