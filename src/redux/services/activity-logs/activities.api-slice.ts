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
}

export interface IActivitiesResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: {
    count: string;
    result: IActivity[];
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

export const activitiesApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query<IActivitiesResponse, void>({
      query: () => ({
        url: `settings/admin/activities`,
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
      }),
    }),
  }),
});

export const { useGetActivitiesQuery, useDeleteActivitiesMutation } =
  activitiesApiSlice;
