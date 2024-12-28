import React, { createContext, useContext, useState } from "react";

import { IRegisterResponse, IUserData } from "../../interface/user";

/** interface */
export interface ITokens {
  accessToken: string | null;
  refreshToken: string | null;
}

export interface IErrorData {
  success: boolean;
  statusCode: number;
  errorMessage: string;
}

export interface IApiErrorResponse {
  status: number;
  errorMessage: string;
  data: IErrorData;
}

export interface AuthContextType {
  userData: IUserData | null;
  setUserData: React.Dispatch<React.SetStateAction<IUserData | null>>;
  token: ITokens | null;
  setToken: React.Dispatch<React.SetStateAction<ITokens | null>>;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  regResponseData: IRegisterResponse | null;
  setRegResponseData: React.Dispatch<
    React.SetStateAction<IRegisterResponse | null>
  >;
  loginError: IApiErrorResponse | null;
  setLoginError: React.Dispatch<React.SetStateAction<IApiErrorResponse | null>>;
  regError: IApiErrorResponse | null;
  setRegError: React.Dispatch<React.SetStateAction<IApiErrorResponse | null>>;
}

// Initial State
const defaultAuthContext: AuthContextType = {
  userData: null,
  setUserData: () => {},
  token: null,
  setToken: () => {},
  isAuth: false,
  setIsAuth: () => {},
  isLoading: false,
  setIsLoading: () => {},
  regResponseData: null,
  setRegResponseData: () => {},
  loginError: null,
  setLoginError: () => {},
  regError: null,
  setRegError: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [token, setToken] = useState<ITokens | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [regResponseData, setRegResponseData] =
    useState<IRegisterResponse | null>(null);
  const [loginError, setLoginError] = useState<IApiErrorResponse | null>(null);
  const [regError, setRegError] = useState<IApiErrorResponse | null>(null);

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        token,
        setToken,
        isAuth,
        setIsAuth,
        isLoading,
        setIsLoading,
        regResponseData,
        setRegResponseData,
        loginError,
        setLoginError,
        regError,
        setRegError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
