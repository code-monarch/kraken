import { baseApiSlice } from "@/redux/api/base-api";
import { IUser } from "./user.api-slice";

export interface IAddUserResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: {
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
    _id: string;
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IAddUserPayload {
  email: string;
  phoneNumber: string;
  lastname: string;
  firstname: string;
  userType: string;
}

export const addUserApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation<IAddUserResponse, IAddUserPayload>({
      query: (addUserDetails) => ({
        url: `settings/admin/user`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: addUserDetails,
      }),
      invalidatesTags: ["getUser"],
    }),
  }),
});

export const { useAddUserMutation } = addUserApiSlice;
