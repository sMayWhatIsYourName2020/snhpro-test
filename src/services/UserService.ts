import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken } from '../helpers/helpers';
import { IToken } from '../interfaces/token.interface';
import { ILogin, IUserInfo } from '../interfaces/user.interface';
import { base } from '../routes';

export const userAPI = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${base}Account` }),
  endpoints: (builder) => ({
    login: builder.mutation<IToken, ILogin>({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation<IToken, ILogin>({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
    }),
    refreshToken: builder.query<IToken, Omit<IToken, 'accessToken'>>({
      query: (data) => ({
        url: '/refresh-token',
        method: 'POST',
        body: data,
      }),
    }),
    getUserInfo: builder.query<IUserInfo, void>({
      query: () => ({
        url: '/user',
        headers: {
          Authorization: `Bearer ${getToken().accessToken}`,
        },
      })
    }),
  }),
})
export const { useLoginMutation, useRegisterMutation, useGetUserInfoQuery, useRefreshTokenQuery } = userAPI;
