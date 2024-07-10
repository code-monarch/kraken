import { baseApiSlice } from "@/redux/api/base-api";

export type IUser = {
  roles: [];
  _id: string;
  id: number;
  phoneNumber: string;
  twoFactor: boolean;
  isVerified: boolean;
  verificationCode: string;
  emailVerified: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  address: string;
  bvn: string;
  country: string;
  email: string;
  firstname: string;
  lastname: string;
  middlename: string;
  nin: string;
  passportID: string;
  state: string;
  userType: string;
  status: string;
  imageUrl: string;
};

export interface IGetUsersResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: {
    count: number;
    result: IUser[];
    pagination: {
      totalResults: number;
      currentPage: number;
      totalPages: number;
    };
  };
}

export interface IGetSingleUserResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: IUser
}

// interface IDeleteUserResponse {
//   error: boolean;
//   responseCode: string;
//   data: {
//     _id: string;
//     email: string;
//     password: string;
//     userType: string;
//     roles: string[];
//     transactions: [];
//     lastLogin: string;
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
//   };
// }

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
  status?: string;
}

export interface IUserQuery {
  page?: number;
  limit?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export const usersApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IGetUsersResponse, IUserQuery>({
      query: ({ page, limit, status, startDate, endDate }) => ({
        url: `settings/admin/users?page=${page}&limit=${limit}&status=${status}&startDate=${startDate}&endDate=${endDate}`,
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
      providesTags: ["getUser"],
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
      invalidatesTags: ["getUser"],
    }),

    // deleteUser: builder.mutation<IDeleteUserResponse, IUserPayload>({
    //   query: ({ id }) => ({
    //     url: `settings/admin/user/${id}`,
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }),
    // }),
  }),
});

export const {
  useGetUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  // useDeleteUserMutation,
} = usersApiSlice;
