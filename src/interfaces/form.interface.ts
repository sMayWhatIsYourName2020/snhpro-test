export interface ILoginForm {
  username: string;
  password: string;
}

export interface IRegisterForm extends ILoginForm {
  email: string;
}