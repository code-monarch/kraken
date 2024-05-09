import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define custom headers
const headers = new Headers();
// Add a Content-Type header
headers.append("Content-Type", "application/json; charset=UTF-8");

const baseQuery = fetchBaseQuery({
  baseUrl: "https://589ctkcaz7.execute-api.us-east-1.amazonaws.com/settings",
  // credentials: "same-origin",
  // credentials: "include",
  mode: "cors",
  prepareHeaders: (headers, {}) => {
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json; charset=UTF-8");

    return headers;
  },
});

// All we've done so far is good, Now we will create a base apiSlice for our entire app.
// This will keep our ApiSlices modular.
export const baseApiSlice = createApi({
  reducerPath: "baseApi",
  tagTypes: [],
  baseQuery: baseQuery,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
