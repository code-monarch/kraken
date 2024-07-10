import { baseApiSlice } from "@/redux/api/base-api";

export interface IChangePasswordResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: {
    _id: string;
    email: string;
    password: string;
    userType: string;
    twoFactor: boolean;
    clientId: string;
    roles: [];
    transactions: [];
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    apiKey: string;
  };
}

export interface IChangePasswordPayload {
  password: string;
  newPassword: string;
}

export const changePasswordApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation<
      IChangePasswordResponse,
      IChangePasswordPayload
    >({
      query: (changePasswordDetails) => ({
        url: "settings/admin/change-password",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: changePasswordDetails,
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = changePasswordApiSlice;
