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
};

export type IAdminUser = {
  _id: string;
  email: string;
  userType: string;
  twoFactor: boolean;
  clientId: string;
  transactions: [];
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  apiKey: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  emailVerified: boolean;
  isVerified: boolean;
  status: string;
  totp2FA: boolean;
};

export interface IGetUsersMetricsResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: {
    count: number;
    results: IUser[];
    pagination: {
      totalResults: number;
      currentPage: number;
      totalPages: number;
    };
  };
}

export interface IUserMetricsQuery {
  pageSize?: number;
  page?: number;
  userType?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  q?: string;
}

export const usersMetricsApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsersMetrics: builder.query<IGetUsersMetricsResponse, IUserMetricsQuery>(
      {
        query: ({
          pageSize,
          page,
          userType,
          status,
          startDate,
          endDate,
          q,
        }) => ({
          url: `settings/admin/user-metrics?page=${page}&limit=${pageSize}&userType=${userType}&status=${status}&startDate=${startDate}&endDate=${endDate}&q=${q}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      }
    ),
  }),
});

export const { useGetUsersMetricsQuery } = usersMetricsApiSlice;
