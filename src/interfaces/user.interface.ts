export interface IUser {
  username: string;
  password: string;
  email: string;
  token: {
    accessToken: string,
    refreshToken: string
  }
}

export type IRegister = Omit<IUser, 'token'>;

export type ILogin = Omit<IUser, 'email' | 'token'>;

export type IUserInfo = Omit<IUser, 'password' | 'token'>;