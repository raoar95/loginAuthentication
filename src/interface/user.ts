export interface ILoginAuth {
  email: string;
  password: string;
}

export interface IRegisterAuth extends ILoginAuth {
  name: string;
}

export interface IUserData {
  _id: string;
  email: string;
  fullName: string;
  watchHistory: string[];
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
