import { baseApiSlice } from "@/redux/api/base-api";

export interface IResetPasswordResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: boolean;
}

export interface IResetPasswordPayload {
  email: string;
}

export const resetPasswordApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    resetPassword: builder.mutation<
      IResetPasswordResponse,
      IResetPasswordPayload
    >({
      query: (resetPasswordDetails) => ({
        url: "auth/admin/reset-password-request",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: resetPasswordDetails,
        keepUnusedDataFor: 5,
      }),
    }),
  }),
});

export const { useResetPasswordMutation } = resetPasswordApiSlice;
