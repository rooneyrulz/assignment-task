import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_API_URI,
  credentials: "include",
  prepareHeaders: (headers, { getState, endpoint }) => {
    if (endpoint === "/refresh") {
      const token = getState().auth.refreshToken || "";

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    } else {
      const token = getState().auth.accessToken || "";

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    }

    return headers;
  },
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions);

  // console.log("baseQueryWithReauth: " + result.error.status);

  const { accessToken, refreshToken } = api.getState().auth;

  // If you want, handle other status codes, too
  if (
    (accessToken || refreshToken) &&
    [401, 403].includes(result?.error?.status)
  ) {
    // send refresh token to get new access token
    const refreshResult = await baseQuery(
      {
        url: "/refresh",
        method: "POST",
      },
      {
        ...api,
        endpoint: "/refresh",
      },
      extraOptions
    );

    // console.log(refreshResult.error);

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if ([401, 403].includes(refreshResult?.error?.status)) {
        refreshResult.error.data.message = "Your login has expired.";
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["User"],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});
