import { baseApiSlice } from "@/redux/api/base-api";

export interface IToggle2FaResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
}

export interface IConfirmToggle2FaResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
}
export interface IConfirmToggle2FaPayload {
  token: string;
}

export const toggle2FaApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    toggle2Fa: builder.mutation<IToggle2FaResponse, void>({
      query: () => ({
        url: "settings/admin/toggle-2fa",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    confirmToggle2Fa: builder.mutation<IConfirmToggle2FaResponse, IConfirmToggle2FaPayload>({
      query: (tokenDetails) => ({
        url: "settings/admin/confirm-toggle-2fa",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: tokenDetails,
      }),
    }),
  }),
});

export const { useToggle2FaMutation, useConfirmToggle2FaMutation } =
  toggle2FaApiSlice;
