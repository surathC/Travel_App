import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../components/features/Auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("Accept", "*/*");
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.meta?.response?.status === 401) {
    console.log("sending refresh token");
    const token = api.getState().auth.user.token;
    const refreshResult = await baseQuery(
      {
        url: "/auth/tokens:refresh",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      api,
      extraOptions
    );
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      api.dispatch(setCredentials({ ...refreshResult.data, ...user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Destination",
    "Destinations",
    "User",
    "Users",
    "Activity",
    "Activities",
    "Events",
    "Event",
    "Service",
    "Services",
  ],
  endpoints: (builder) => ({}),
});