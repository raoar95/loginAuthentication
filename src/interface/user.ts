export interface IEmailRequest {
  email: string;
}

export interface IPassword {
  password: string;
}

export interface ILoginAuth extends IEmailRequest, IPassword {}

export interface IRegisterAuth extends ILoginAuth {
  name: string;
}

export interface IOtp {
  otp: string;
}

export interface IUserData {
  _id: string;
  email: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IAuthResponse {
  user: IUserData;
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterResponse {
  status: number;
  message: string;
  data?: IUserData;
}
