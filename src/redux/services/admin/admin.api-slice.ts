import { baseApiSlice } from "@/redux/api/base-api";

export interface IGetAdminResponse {
  error: false;
  responseCode: string;
  responseMessage: string;
  data: {
    _id: string;
    email: string;
    userType: string;
    twoFactor: boolean;
    clientId: string;
    roles: [];
    transactions: [];
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
  };
}

export interface IUpdateAdminResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: {
    _id: string;
    email: string;
    userType: string;
    twoFactor: boolean;
    clientId: string;
    roles: [];
    transactions: [];
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
    apiKey: string;
    firstname: string;
    lastname: string;
    phoneNumber: string;
    emailVerified: boolean;
    isVerified: boolean;
    status: string;
  };
}

export interface IUpdateAdminPayload {
  firstname: string;
  lastname: string;
  email: string;
}

interface IGetAdminPayload {
  id: string;
}

export const adminApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdmin: builder.query<IGetAdminResponse, IGetAdminPayload>({
      query: ({ id }) => ({
        url: `auth/admin/get-admin/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        keepUnusedDataFor: 5,
      }),
      providesTags: ["getAdmin"],
    }),
    updateAdmin: builder.mutation<IUpdateAdminResponse, IUpdateAdminPayload>({
      query: (adminDetails) => ({
        url: `settings/admin/update-profile`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: adminDetails,
        keepUnusedDataFor: 5,
      }),
      invalidatesTags: ["getAdmin"]
    }),
  }),
});

export const { useGetAdminQuery, useUpdateAdminMutation } = adminApiSlice;
