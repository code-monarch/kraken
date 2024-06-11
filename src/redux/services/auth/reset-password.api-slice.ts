import { baseApiSlice } from "@/redux/api/base-api";

export interface IResetPasswordRequestResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: boolean;
}

export interface IResetPasswordResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: boolean;
}

export interface IVerifyPasswordTokenResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: boolean;
}

export interface IResetPasswordRequestPayload {
  email: string;
}

export interface IResetPasswordPayload {
  email: string;
  password: string;
  token: string;
}

export interface IVerifyPasswordTokenPayload {
  email: string;
  token: string;
}

export const resetPasswordApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    resetPasswordRequest: builder.mutation<
      IResetPasswordRequestResponse,
      IResetPasswordRequestPayload
    >({
      query: (resetPasswordRequestDetails) => ({
        url: "auth/admin/reset-password-request",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: resetPasswordRequestDetails,
      }),
    }),

    resetPassword: builder.mutation<
      IResetPasswordResponse,
      IResetPasswordPayload
    >({
      query: (resetPasswordDetails) => ({
        url: "auth/admin/reset-password",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: resetPasswordDetails,
        keepUnusedDataFor: 5,
      }),
    }),

    verifyPasswordToken: builder.mutation<
      IVerifyPasswordTokenResponse,
      IVerifyPasswordTokenPayload
    >({
      query: (verifyPasswordTokenDetails) => ({
        url: "auth/admin/verify-password-token",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: verifyPasswordTokenDetails,
      }),
    }),
  }),
});

export const {
  useResetPasswordRequestMutation,
  useResetPasswordMutation,
  useVerifyPasswordTokenMutation,
} = resetPasswordApiSlice;
