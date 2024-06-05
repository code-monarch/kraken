import { baseApiSlice } from "@/redux/api/base-api";
import { IActivity } from "./activities.api-slice";

export interface ISingleActivityResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: IActivity;
}

export interface IDeleteSingleActivityRes {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: IActivity;
}

interface IActivityPayload {
  id: string;
}

export const activityApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleActivity: builder.query<ISingleActivityResponse, IActivityPayload>(
      {
        query: ({ id }) => ({
          url: `settings/admin/activity/${id}`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }),
      }
    ),

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
        keepUnusedDataFor: 5,
      }),
    }),
  }),
});

export const { useGetSingleActivityQuery, useDeleteSingleActivityMutation } =
  activityApiSlice;
