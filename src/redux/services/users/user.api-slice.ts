import { baseApiSlice } from "@/redux/api/base-api";

export interface IUser {
  _id: string;
  id: string;
  firstname: string;
  lastname: string;
  middlename: string;
  email: string;
  state: string;
  bvn: string;
  pin: string;
  lga: string;
  address: string;
  nin: string;
  password: string;
  userType: string;
  roles: [];
  phoneNumber: string;
  transactions: [];
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  status: string;
}

export interface IGetUsersResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: {
    result: IUser[];
    count: number;
  }
}

export interface IGetSingleUserResponse {
  error: boolean;
  responseCode: string;
  data: {
    email: string;
    state: string;
    lga: string;
    address: string;
    nin: string;
    userType: string;
    roles: [];
    phoneNumber: string;
    transactions: [];
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface IDeleteUserResponse {
  error: boolean;
  responseCode: string;
  data: {
    _id: string;
    email: string;
    password: string;
    userType: string;
    roles: string[];
    transactions: [];
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

interface IUpdateUserResponse {
  error: boolean;
  responseCode: string;
  data: {
    _id: string;
    email: string;
    state: string;
    lga: string;
    address: string;
    nin: string;
    password: string;
    userType: string;
    roles: [];
    phoneNumber: string;
    transactions: [];
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    status: string;
  };
}

interface IUserPayload {
  id: string;
  status: string;
}

export const usersApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<IGetUsersResponse, void>({
      query: () => ({
        url: `settings/admin/users`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getSingleUser: builder.query<IGetSingleUserResponse, IUserPayload>({
      query: ({ id }) => ({
        url: `settings/admin/user/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    updateUser: builder.mutation<IUpdateUserResponse, IUserPayload>({
      query: ({ id, status }) => ({
        url: `settings/admin/activities/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: status,
      }),
    }),

    deleteUser: builder.mutation<IDeleteUserResponse, IUserPayload>({
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

export const {
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
