import { baseApiSlice } from "@/redux/api/base-api";

export interface IForgotPasswordResponse {
  error: boolean;
  responseCode: string;
  data: string;
}

export interface IForgotPasswordPayload {
  email: string;
}

export const forgotPasswordApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation<
      IForgotPasswordResponse,
      IForgotPasswordPayload
    >({
      query: (forgotPasswordDetails) => ({
        url: "admin/forgot-password",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: forgotPasswordDetails,
      }),
    }),
  }),
});

export const { useForgotPasswordMutation } = forgotPasswordApiSlice;
