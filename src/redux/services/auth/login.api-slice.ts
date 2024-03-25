import { baseApiSlice } from "@/redux/api/base-api";

export interface ILoginResponse {
  token: string;
  refreshToken: string;
  error: boolean;
  error_description: boolean;
  message: string;
  errorMessage: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export const loginApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginPayload>({
      query: (loginDetails) => ({
        url: "signIn",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: loginDetails,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApiSlice;
