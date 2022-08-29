import { IToken } from '../interfaces/token.interface';
import { ILogin } from '../interfaces/user.interface';

export const getToken = (): IToken => {
  return JSON.parse(localStorage.getItem('token') || '{}');
};

export const getUser = (): ILogin => {
  return JSON.parse(localStorage.getItem('user') || '{}');
};