import { baseApiSlice } from "@/redux/api/base-api";
import { IUser } from "./user.api-slice";

export type IAdminUser = {
  phoneNumber: string,
  twoFactor: boolean,
  isVerified: boolean,
  verificationCode: boolean,
  emailVerified: boolean,
  lastLogin: string,
  createdAt: string,
  updatedAt: string,
  __v: number,
  address: string,
  bvn: string,
  country: string,
  email: string,
  firstname: string,
  lastname: string,
  middlename: string,
  nin: string,
  passportID: string,
  state: string,
  status: string // e.g "Frozen",
  userType: "AGENT" | "PILGRIM",
  totp2FA: false,
  imageUrl: string,
  kycMessage: string,
  kycVerification: string
};

export interface IGetUsersMetricsResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: {
    results: IUser[];
    users: {
      active: number;
      inactive: number;
      frozen: number;
      Suspended: number;
      pending: number;
      total: number;
    };
    agents: {
      active: number;
      inactive: number;
      frozen: number;
      Suspended: number;
      pending: number;
      total: number;
    };
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
          url: `settings/admin/user-metrics?page=${page}&limit=${pageSize}${userType ? `&userType=${userType}` : ""}${status ? `&status=${status}` : ""}${startDate ? `&startDate=${startDate}` : ""}${endDate ? `&endDate=${endDate}` : ""}${q ? `&q=${q}` : ""}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // keepUnusedDataFor: 5,
        }),
        providesTags: ["getUser"],
      }
    ),
  }),
});

export const { useGetUsersMetricsQuery } = usersMetricsApiSlice;
