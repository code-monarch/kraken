import { baseApiSlice } from "@/redux/api/base-api";

export interface IUpdateProfilePhotoResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: {
    _id: string;
    email: string;
    userType: string;
    twoFactor: boolean;
    clientId: string;
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
    apiKey: string;
    firstname: string;
    lastname: string;
    status: string;
    totp2FASecret: string;
    phoneNumber: string;
    emailVerified: boolean;
    totp2FA: boolean;
    imageUrl: string;
  };
}

export interface IUpdateProfilePhotoPayload {
  image: string;
}

export const profilePhotoApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateProfilePhoto: builder.mutation<
      IUpdateProfilePhotoResponse,
      IUpdateProfilePhotoPayload
    >({
      query: (imageDetails) => ({
        url: `settings/admin/update-profile-photo`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: imageDetails,
      }),
      invalidatesTags: ["getAdmin"],
    }),
  }),
});

export const { useUpdateProfilePhotoMutation } = profilePhotoApiSlice;
