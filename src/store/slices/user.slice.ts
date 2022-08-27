import axios from 'axios';
import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import routes from '../../routes';
import { getToken } from '../../helpers/helpers';
import { ILogin, IRegister, IUser } from '../../interfaces/user.interface';

interface IResponse {
  id: string;
  title: string;
  content: string;
  color: string;
}

export const login = createAsyncThunk(
  'user/login',
  async (data: ILogin) => {
    const notes = await axios.post(routes.login(), data);
    return notes.data;
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (data: IRegister) => {
    const notes = await axios.post(routes.register(), data);
    return notes.data;
  },
);

export const refreshToken = createAsyncThunk(
  'user/refreshToken',
  async (data: { refreshToken: string }) => {
    const notes = await axios.post(routes.refreshToken(), data);
    return notes.data;
  },
);

export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async ({ id, ...data }: IResponse) => {
    const token = getToken();
    const notes = await axios.put(routes.getUserInfo(), data, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      }
    });
    return notes.data;
  },
);

const initialState: IUser = {
  username: '',
  password: '',
  email: '',
  token: {
    accessToken: '',
    refreshToken: ''
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.token = payload;
      localStorage.setItem('token', JSON.stringify(payload));
    })
  }
});

export const userActions = userSlice.actions;
export const userAsyncThunks = {
  login,
  register,
  refreshToken,
  getUserInfo,
};
export default userSlice.reducer;