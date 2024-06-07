import { baseApiSlice } from "@/redux/api/base-api";

export interface ILogoutResponse {
    error: boolean,
    responseCode: string,
    responseMessage: string,
    data: boolean
}

export const logoutApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        logout: builder.mutation<
            ILogoutResponse,
            void
        >({
            query: () => ({
                url: "auth/admin/logout",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                keepUnusedDataFor: 5,
            }),
        }),
    }),
});

export const { useLogoutMutation } = logoutApiSlice;
