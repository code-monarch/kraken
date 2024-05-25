import { baseApiSlice } from "@/redux/api/base-api";

export interface ILoginResponse {
  error: boolean;
  responseCode: string;
  data: {
    clientId: string;
    apiKey: string;
  };
}
export interface IServiceAccountLoginPayload {
  clientId: "umrah-website";
  clientSecret: "b27ad3aa846664fa72e2a4b92ee46f97";
}

export const serviceAccountLoginApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    serviceAccountLogin: builder.mutation<
      ILoginResponse,
      void
    >({
      query: () => ({
        url: "signIn",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          clientId: "umrah-website",
          clientSecret: "b27ad3aa846664fa72e2a4b92ee46f97",
        },
      }),
    }),
  }),
});

export const { useServiceAccountLoginMutation } = serviceAccountLoginApiSlice;
