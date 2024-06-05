import { baseApiSlice } from "@/redux/api/base-api";

export type IActivity = {
  _id: string;
  user: string;
  status: string;
  ip: string;
  device: string;
  type: string;
  createdAt: string;
  __v: number;
};

export interface IActivitiesResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: {
    count: number;
    result: IActivity[];
    pagination: {
      totalResults: number;
      currentPage: number;
      totalPages: number;
    };
  };
}

export interface IDeleteActivitiesRes {
  error: boolean;
  responseCode: string;
  data: {
    acknowledged: boolean;
    deletedCount: number;
  };
}
export interface IQuery {
  pageSize?: number;
  page?: number;
  status?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
}

export const activitiesApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query<IActivitiesResponse, IQuery>({
      query: ({ page, pageSize, status, type, startDate, endDate }) => ({
        url: `settings/admin/activities?page=${page}&pageSize=${pageSize}&status=${status}&type=${type}&startDate=${startDate}&endDate=${endDate}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    deleteActivities: builder.mutation<IDeleteActivitiesRes, void>({
      query: () => ({
        url: `settings/admin/activities`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        keepUnusedDataFor: 5,
      }),
    }),
  }),
});

export const { useGetActivitiesQuery, useDeleteActivitiesMutation } =
  activitiesApiSlice;
