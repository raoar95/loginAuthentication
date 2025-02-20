/* utils */
import tryCatchHandler from "../utils/tryCatchHandler";
import { fetchHandler, responseHandler } from "../utils/apiHandler";

/* interface */
import {
  IEmailRequest,
  ILoginAuth,
  IOtp,
  IPassword,
  IRegisterAuth,
} from "../interface/user";
import { ITokens } from "../context/authProvider.context";

// ================================== Login Auth start ====================================== //

const loginAuth = tryCatchHandler(async (payload: ILoginAuth) => {
  const response = await fetchHandler({
    endpoint: "/users/login",
    method: "POST",
    payload,
  });

  return responseHandler(response);
});

// ================================== Login Auth end =========================================== //

// ================================== Email Otp Login Start =========================================== //

const emailOtpLogin = tryCatchHandler(async (payload: IEmailRequest) => {
  const response = await fetchHandler({
    endpoint: "/users/email-otp-login",
    method: "POST",
    payload,
  });

  return responseHandler(response);
});

// ================================== Email Otp Login End =========================================== //

// ================================== Verify email Login Otp Start =========================================== //

const VerifyEmailLoginOtp = tryCatchHandler(async (payload: IOtp) => {
  const response = await fetchHandler({
    endpoint: "/users/verify-email-otp-login",
    method: "POST",
    payload,
  });

  return responseHandler(response);
});

// ================================== Verify email Login Otp End =========================================== //

// ================================== Register Auth start ========================================= //

const registerAuth = tryCatchHandler(async (payload: IRegisterAuth) => {
  const response = await fetchHandler({
    endpoint: "/users/register",
    method: "POST",
    payload,
  });

  return responseHandler(response);
});

// ================================== Register Auth End ========================================= //

// =================================== User Logout Start ========================================= //

const logoutUser = tryCatchHandler(async (token: ITokens) => {
  const response = await fetchHandler({
    endpoint: "/users/logout",
    method: "POST",
    token,
  });

  return responseHandler(response);
});

// ===================================== User Logout End ========================================= //

// ===================================== request reset password start ========================================= //

const requestResetEmail = tryCatchHandler(async (payload: IEmailRequest) => {
  const response = await fetchHandler({
    endpoint: "/users/request-reset-password",
    method: "POST",
    payload,
  });

  return responseHandler(response);
});

// ===================================== request reset password end ========================================= //

// ===================================== reset password start ========================================= //

const resetPassword = tryCatchHandler(async (payload: IPassword) => {
  const response = await fetchHandler({
    endpoint: "/users/reset-password",
    method: "POST",
    payload,
  });

  return responseHandler(response);
});

// ===================================== reset password end ========================================= //

// ====================================== Verify reset Otp Start =========================================== //

const verifyResetOtp = tryCatchHandler(async (payload: IOtp) => {
  const response = await fetchHandler({
    endpoint: "/users/verify-otp",
    method: "POST",
    payload,
  });

  return responseHandler(response);
});

// ======================================= Verify reset Otp End =========================================== //

// ======================================= isAuth Start ========================================= //

const isUserAuth = tryCatchHandler(async (token: ITokens) => {
  const response = await fetchHandler({
    endpoint: "/users/isAuth",
    method: "GET",
    token,
  });

  return responseHandler(response);
});

// ======================================= isAuth end ========================================= //

// ===================================== renew refresh token start ========================================= //

const renewRefreshToken = tryCatchHandler(async (token: ITokens) => {
  const response = await fetchHandler({
    endpoint: "/users/renew-refresh-token",
    method: "GET",
    token,
  });

  return responseHandler(response);
});

// ===================================== renew refresh token end ========================================= //

export {
  loginAuth,
  emailOtpLogin,
  VerifyEmailLoginOtp,
  registerAuth,
  logoutUser,
  requestResetEmail,
  resetPassword,
  verifyResetOtp,
  isUserAuth,
  renewRefreshToken,
};
