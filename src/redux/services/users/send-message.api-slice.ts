import { baseApiSlice } from "@/redux/api/base-api";

export interface ISendMessageResponse {
  error: boolean;
  responseCode: string;
  responseMessage: string;
  data: boolean;
}

export interface ISendMessagePayload {
  email: string[];
  title: string;
  message: string;
}

export const messageApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendMessage: builder.mutation<ISendMessageResponse, ISendMessagePayload>({
      query: (messageDetails) => ({
        url: `settings/admin/send-message`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: messageDetails,
      }),
    }),
  }),
});

export const { useSendMessageMutation } = messageApiSlice;
