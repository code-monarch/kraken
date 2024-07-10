import { baseApiSlice } from "@/redux/api/base-api";
import { IUser } from "./user.api-slice";

export interface ISearchUserResponse {
  error: false;
  responseCode: "UMRSETTINGS200";
  responseMessage: "Users search successfully generated";
  data: IUser[];
}

interface IQuery {
  q: string;
  startDate?: string;
  endDate?: string;
  start?: string;
  end?: string;
}

export const searchUserApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchUser: builder.query<ISearchUserResponse, IQuery>({
      query: ({ q, startDate, endDate, start, end }) => ({
        url: `settings/admin/user/search?q=${q}&startDate=${startDate}&endDate=${endDate}&start=${start}&end=${end}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useSearchUserQuery } = searchUserApiSlice;
