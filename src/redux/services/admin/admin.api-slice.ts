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
      }),
    }),
  }),
});

export const { useGetAdminQuery } = adminApiSlice;
