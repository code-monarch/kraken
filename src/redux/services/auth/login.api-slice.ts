import { baseApiSlice } from "@/redux/api/base-api";

export interface ILoginResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: {
    twoFactor: {
      sms2FA: boolean;
      totp2FA: boolean;
    };
    userType: string;
    id: string;
    email: string;
    apiKey: string;
  };
}
export interface ILoginPayload {
  email: string;
  password: string;
  serviceAccountApiKey: string;
}

export const loginApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginPayload>({
      query: ({ email, password, serviceAccountApiKey }) => ({
        url: "auth/admin/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-service-account-key": serviceAccountApiKey,
        },
        body: {
          email: email,
          password: password,
        },
        keepUnusedDataFor: 5,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApiSlice;
