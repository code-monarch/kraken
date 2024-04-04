import { baseApiSlice } from "@/redux/api/base-api";

export interface IResetPasswordResponse {
  error: boolean;
  responseCode: string;
  data: string;
}

export interface IResetPasswordPayload {
  email: string;
  password: string;
  token: string;
}

export const resetPasswordApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    resetPassword: builder.mutation<
      IResetPasswordResponse,
      IResetPasswordPayload
    >({
      query: (resetPasswordDetails) => ({
        url: "admin/reset-password",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: resetPasswordDetails,
      }),
    }),
  }),
});

export const { useResetPasswordMutation } = resetPasswordApiSlice;
