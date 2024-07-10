import { baseApiSlice } from "@/redux/api/base-api";
import { IUser } from "./user.api-slice";

export interface IFreezeUserResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: {
    _id: string;
    id: number;
    firstname: string;
    lastname: string;
    middlename: string;
    email: string;
    phoneNumber: string;
    state: string;
    address: string;
    bvn: string;
    nin: string;
    twoFactor: boolean;
    isVerified: boolean;
    emailVerified: boolean;
    userType: string;
    roles: [];
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IFreezeUserPayload {
  id: string;
}
export const freezeUserApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    freezeUser: builder.mutation<IFreezeUserResponse, IFreezeUserPayload>({
      query: ({ id }) => ({
        url: `settings/admin/user/toggle-freeze/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["getUser"],
    }),
  }),
});

export const { useFreezeUserMutation } = freezeUserApiSlice;
