import { baseApiSlice } from "@/redux/api/base-api";

export interface ITwoFALoginResponse {
    error: boolean,
    responseCode: string,
    data: {
        twoFactor: {
            sms2FA: boolean,
            totp2FA: boolean
        },
        userType: "SUPER_ADMIN" | "ADMIN",
        id: string,
        email: string,
        apiKey: string
    }
}

export interface ITwoFALoginPayload {
    email: string,
    TOtp?: string,
    smsOtp?: string
    /**
     * Key not part of API payload. Just a generic name for the OTP value
     */
    password?: string
}

export const twoFALoginApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        twoFALogin: builder.mutation<ITwoFALoginResponse, ITwoFALoginPayload>({
            query: (loginDetails) => ({
                url: "auth/admin/two-factor-login",
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

export const { useTwoFALoginMutation } = twoFALoginApiSlice;
