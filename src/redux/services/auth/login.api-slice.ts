import { baseApiSlice } from "@/redux/api/base-api";

export interface ILoginResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: {
    id: string;
    email: string;
    apiKey: string;
  };
}
export interface ILoginPayload {
  email: string;
  password: string;
}

export const loginApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginPayload>({
      query: (loginDetails) => ({
        url: "auth/admin/login",
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
