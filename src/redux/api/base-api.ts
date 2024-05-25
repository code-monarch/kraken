import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { LOGIN_API_KEY, SERVICE_ACCOUNT_API_KEY } from "@/lib/constants";
import { logOut } from "@/lib/helper/logOut";

const loginApiKey = localStorage.getItem(LOGIN_API_KEY);
const serviceAccountApiKey = localStorage.getItem(SERVICE_ACCOUNT_API_KEY);

// Instantiate a mutex instance
const mutex = new Mutex();

// Define custom headers
const headers = new Headers();
// Add a Content-Type header
headers.append("Content-Type", "application/json; charset=UTF-8");

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://b02z813bo7.execute-api.us-east-1.amazonaws.com/",
  baseUrl: "https://staging.api.umrahcash.com/",
  // credentials: "same-origin",
  // credentials: "include",
  mode: "cors",
  prepareHeaders: (headers, { }) => {
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json; charset=UTF-8");
    headers.set(
      "x-service-account-key",
      serviceAccountApiKey ?? "4ecce566867cc1546bfb04d9f67c2fc8d3808dd5e433058f"
    );

    if (loginApiKey) {
      headers.set("x-admin-api-key", loginApiKey);
    }
    // headers.set("x-admin-api-key", "7023fa9efbeb018b390b308e43fc046b472b8554d168831f");

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result?.error?.status === 500) {
    // Remove expired API key
    localStorage.removeItem("Api_Key");

    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // send refresh token to get new access token
        const serviceAccountLoginResult: any = await baseQuery(
          "auth/admin/authenticate",
          api,
          {
            body: {
              "clientId": "frontend-website",
              "clientSecret": "a6805281c286a6d1541092884565174b"
            }
          }
        );
        if (serviceAccountLoginResult.data.data) {
          const newServiceAccountLoginApiKey = serviceAccountLoginResult.data?.data?.apiKey;

          // store the new service API key
          localStorage.setItem(SERVICE_ACCOUNT_API_KEY, newServiceAccountLoginApiKey);

          // retry the original query with new API key
          result = await baseQuery(args, api, extraOptions);
        } else {
          logOut()
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const baseApiSlice = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: [],
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
