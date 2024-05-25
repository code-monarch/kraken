import { baseApiSlice } from "@/redux/api/base-api";
import { IUser } from "./user.api-slice";

export interface IDeleteUserResponse {
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

export interface IDeleteUserPayload {
  id: string;
}
export const deleteUserApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteUser: builder.mutation<IDeleteUserResponse, IDeleteUserPayload>({
      query: ({ id }) => ({
        url: `settings/admin/user/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useDeleteUserMutation } = deleteUserApiSlice;
