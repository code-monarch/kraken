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

// Since we've already created a base auth apiSlice for our application with the base URl for authentication,
//  we will simply be injecting other apiSlices, loginApiSlice for example, into our auth apiSlice
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
