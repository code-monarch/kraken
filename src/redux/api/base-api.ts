import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define custom headers
const headers = new Headers();
// Add a Content-Type header
headers.append("Content-Type", "application/json; charset=UTF-8");

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://b02z813bo7.execute-api.us-east-1.amazonaws.com/",
  baseUrl: "http://staging.api.umrahcash.com/",
  // credentials: "same-origin",
  // credentials: "include",
  mode: "cors",
  prepareHeaders: (headers, {}) => {
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json; charset=UTF-8");
    headers.set(
      "x-service-account-key",
      "51416eeafe2621b5a0a76c103e22f9d874019c22d812826f"
    );

    const apiKey = localStorage.getItem("Api_Key");

    if (apiKey) {
      headers.set("x-admin-api-key", `${apiKey}`);
    }

    return headers;
  },
});

// All we've done so far is good, Now we will create a base apiSlice for our entire app.
// This will keep our ApiSlices modular.
export const baseApiSlice = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: [],
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
