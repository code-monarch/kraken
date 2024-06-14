import { baseApiSlice } from "@/redux/api/base-api";

export interface IToggleTotpResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: {
    secret: string;
    otpauth_url: string;
    qr_code: string;
  };
}

export interface IValidateTotpResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: boolean;
}

export interface IValidateTotpPayload {
  token: string;
  emailOtp?: string;
}

export const toggleTotpApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generateTotp: builder.mutation<IToggleTotpResponse, void>({
      query: () => ({
        url: "settings/admin/totp-generate",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    validateTotp: builder.mutation<IValidateTotpResponse, IValidateTotpPayload>(
      {
        query: (tokenDetails) => ({
          url: "settings/admin/totp-validate",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: tokenDetails,
          keepUnusedDataFor: 5,
        }),
      }
    ),
  }),
});

export const { useGenerateTotpMutation, useValidateTotpMutation } =
  toggleTotpApiSlice;
