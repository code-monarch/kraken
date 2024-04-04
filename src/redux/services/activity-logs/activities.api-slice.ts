import { baseApiSlice } from "@/redux/api/base-api";

export interface IActivities {
  error: boolean;
  responseCode: string;
  data: {
    _id: string;
    user: string;
    title: string;
    activity: string;
    createdAt: string;
    __v: number;
  }[];
}

export interface IDeleteActivitiesRes {
  error: boolean;
  responseCode: string;
  data: {
    acknowledged: boolean;
    deletedCount: number;
  };
}

interface IActivityPayload {
  id: string;
}

export const activitiesApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query<IActivities, IActivityPayload>({
      query: ({ id }) => ({
        url: `settings/admin/activities/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    deleteActivities: builder.mutation<IDeleteActivitiesRes, IActivityPayload>({
      query: ({ id }) => ({
        url: `settings/admin/activities/${id}`,
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
