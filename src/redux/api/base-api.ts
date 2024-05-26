import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { LOGIN_API_KEY, SERVICE_ACCOUNT_API_KEY } from "@/lib/constants";
import { logOut } from "@/lib/helper/logOut";
import LocalStore from "@/lib/helper/storage-manager";

const loginApiKey = LocalStore.getItem({ key: LOGIN_API_KEY })
const serviceAccountApiKey = LocalStore.getItem({ key: SERVICE_ACCOUNT_API_KEY })

// Instantiate a mutex instance
const mutex = new Mutex();

// Define custom headers
const headers = new Headers();
// Add a Content-Type header
headers.append("Content-Type", "application/json; charset=UTF-8");

const baseQuery = fetchBaseQuery({
  // baseUrl: "https://b02z813bo7.execute-api.us-east-1.amazonaws.com/",
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  // credentials: "same-origin",
  // credentials: "include",
  mode: "cors",
  prepareHeaders: (headers, { }) => {
    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json; charset=UTF-8");

    if (serviceAccountApiKey) {
      headers.set(
        "x-service-account-key",
        `${serviceAccountApiKey}`
        // "a24bc9ef5497fea18a61dccb5ebf0a48a3533c265d2e98be"
      );
    }

    if (loginApiKey) {
      headers.set("x-admin-api-key", loginApiKey);
    }

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

  if (result.error && result?.error?.status === 600) {
    // Remove expired API key
    // LocalStore.removeItem({ key: LOGIN_API_KEY })
    // LocalStore.removeItem({ key: SERVICE_ACCOUNT_API_KEY })

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
              "clientId": `${process.env.CLIENT_ID}`,
              "clientSecret": `${process.env.CLIENT_SECRET}`
            }
          }
        );
        if (serviceAccountLoginResult.data.data) {
          const newServiceAccountLoginApiKey = serviceAccountLoginResult.data?.data?.apiKey;

          // store the new service API key
          LocalStore.setItem({ key: SERVICE_ACCOUNT_API_KEY, value: newServiceAccountLoginApiKey })

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
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
