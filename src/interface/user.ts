export interface ILoginAuth {
  email?: string;
  username?: string;
  password: string;
}

export interface IRegisterAuth extends Omit<ILoginAuth, "username"> {
  username?: string;
  name: string;
}

export interface IUserData {
  _id: string;
  username: string;
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
