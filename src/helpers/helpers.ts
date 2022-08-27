import { IToken } from '../interfaces/token.interface';

export const getToken = (): IToken => {
  return JSON.parse(localStorage.getItem('token') || '{}');
};