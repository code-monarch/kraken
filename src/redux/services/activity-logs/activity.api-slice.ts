import { baseApiSlice } from "@/redux/api/base-api";

export interface ISingleActivity {
  error: boolean;
  responseCode: string;
  data: {
    _id: string;
    user: string;
    title: string;
    activity: string;
    createdAt: string;
    __v: number;
  };
}

export interface IDeleteSingleActivityRes {
  error: boolean;
  responseCode: string;
  data: {
    _id: string;
    user: string;
    title: string;
    activity: string;
    createdAt: string;
    __v: number;
  };
}

interface IActivityPayload {
  id: string;
}

export const activityApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleActivity: builder.query<ISingleActivity, IActivityPayload>({
      query: ({ id }) => ({
        url: `settings/admin/activity/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    deleteSingleActivity: builder.mutation<
      IDeleteSingleActivityRes,
      IActivityPayload
    >({
      query: ({ id }) => ({
        url: `settings/admin/activity/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetSingleActivityQuery, useDeleteSingleActivityMutation } =
  activityApiSlice;
