import { baseApiSlice } from "@/redux/api/base-api";

export interface IServiceLoginResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: {
    clientId: string;
    apiKey: string;
  };
}

export interface IServiceLoginPayload {
  clientId: string;
  clientSecret: string;
}

export const serviceAccountLoginApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    serviceAccountLogin: builder.mutation<IServiceLoginResponse, IServiceLoginPayload>({
      query: (loginDetails) => ({
        url: "auth/admin/authenticate",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: loginDetails,
        keepUnusedDataFor: 5,
      }),
    }),
  }),
});

export const { useServiceAccountLoginMutation } = serviceAccountLoginApiSlice;
