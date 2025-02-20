import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

/* Components */
import { MyInput, Submit } from "./FormComponent";
import OtpInput from "./OtpInput";

/* Hooks */
import { useAuth } from "../../context/authProvider.context";
import { useToast } from "../../context/toastProvider.context";

/* Utils */
import {
  emailOtpLogin,
  loginAuth,
  registerAuth,
  requestResetEmail,
  resetPassword,
} from "../../service/api";

/* Styles */
import "./AuthForm.scss";
import { generateRandomText } from "../../utils/RandomFunctions";

/* Interface */
interface IRouteParams {
  resetToken: string;
  otpID: string;
  [key: string]: string | undefined;
}

const AuthForm: React.FC = () => {
  const [isActiveId, setIsActiveId] = useState("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");

  const { toastSuccess, toastError } = useToast();

  const { setIsAuth, setUserData, isLoading, setIsLoading } = useAuth();

  const navigate = useNavigate();

  // get params
  const { resetToken, otpID } = useParams<IRouteParams>();

  useEffect(() => {
    if (otpID) setIsActiveId("verifyOtp");
    if (resetToken) setIsActiveId("resetPassword");
  }, [resetToken, otpID]);

  // console.log("isActiveId: ", isActiveId);

  const handleSubmit = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsLoading(true);

      try {
        if (isActiveId === "login") {
          const authData = {
            email,
            password,
          };

          await loginAuth(authData).then((data) => {
            setIsAuth(true);
            setUserData(data.data.user);
            toastSuccess(data.message);
            navigate("/loginAuthentication/dashboard");
          });
        }

        if (isActiveId === "otpLogin") {
          await emailOtpLogin({ email }).then((data) => {
            toastSuccess(data.message);
            navigate("/loginAuthentication/verify-otp/otpLogin");
          });
        }

        if (isActiveId === "register") {
          const authData = {
            fullName,
            email,
            password,
          };

          await registerAuth(authData).then((data) => {
            setIsAuth(true);
            setUserData(data.data.user);
            toastSuccess(data.message);
            navigate("/loginAuthentication/login");
          });
        }

        if (isActiveId === "forgotEmailRequest") {
          await requestResetEmail({ email }).then((data) => {
            toastSuccess(data.message);
            navigate("/loginAuthentication/verify-otp/reset");
          });
        }

        if (isActiveId === "resetPassword") {
          await resetPassword({ password }).then((data) => {
            toastSuccess(data.message);
            navigate("/loginAuthentication/");
          });
        }
      } catch (err: any) {
        setIsAuth(false);
        toastError(err.errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [
      fullName,
      email,
      password,
      cnfPassword,
      isActiveId,
      history,
      setIsAuth,
      setUserData,
      setIsLoading,
      toastSuccess,
      toastError,
    ]
  );

  const formTitle = {
    login: "Sign In",
    otpLogin: "Sign In With OTP",
    verifyOtp: "Verify OTP",
    register: "Sign Up",
    forgotEmailRequest: "Forgot Password",
    resetPassword: "Reset Password",
  }[isActiveId];

  const formDescription = {
    login: "Login to Access your Account",
    otpLogin: "Enter Email to Get OTP",
    verifyOtp: "Enter 6 Digit OTP Sent to your Email Id",
    register: "Sign Up to Create Account",
    forgotEmailRequest: "Enter Email to Request Reset Mail",
    resetPassword: "Enter New Password",
  }[isActiveId];

  return (
    <>
      <div className="auth_form_container flow-hidden">
        <div className="form_head_container">
          {/* Head */}
          <h1>{formTitle}</h1>
          <p>{formDescription}</p>
        </div>

        {isActiveId === "verifyOtp" ? (
          <OtpInput size={6} otpId={otpID || ""} />
        ) : (
          <>
            {/* form */}
            <form method="post" className="form_input_container">
              {isActiveId === "register" && (
                <MyInput
                  type="text"
                  placeholder="Full Name"
                  required={true}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              )}

              {isActiveId !== "resetPassword" && (
                <MyInput
                  type="email"
                  placeholder="Email"
                  required={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}

              {["login", "register", "resetPassword"].includes(isActiveId) && (
                <MyInput
                  type="password"
                  placeholder="Password"
                  required={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              )}

              {["register", "resetPassword"].includes(isActiveId) && (
                <MyInput
                  type="password"
                  placeholder="Confirm Password"
                  required={true}
                  value={cnfPassword}
                  onChange={(e) => setCnfPassword(e.target.value)}
                />
              )}

              {isActiveId === "login" && (
                <div className="form_text">
                  <Link
                    to="#"
                    onClick={() => setIsActiveId("forgotEmailRequest")}
                  >
                    Forgot Password?
                  </Link>
                </div>
              )}

              <Submit onClick={(e) => handleSubmit(e)} loading={isLoading} />
            </form>

            {/* Login Toggler */}
            <p
              className="form_text"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setIsActiveId(isActiveId === "login" ? "otpLogin" : "login");
              }}
            >
              {isActiveId === "login" ? "Login with OTP" : "Login with Email"}
            </p>

            {/* Login & Register Toggler */}
            {["login", "otpLogin", "register", "forgotEmailRequest"].includes(
              isActiveId
            ) && (
              <div className="form_text">
                {((isActiveId === "login" || isActiveId === "otpLogin") &&
                  "Need an account? ") ||
                  (isActiveId === "register" && "Already have an account? ") ||
                  (isActiveId === "forgotEmailRequest" &&
                    "Remember Password? ")}
                <Link
                  to="#"
                  onClick={() =>
                    setIsActiveId(isActiveId === "login" ? "register" : "login")
                  }
                  className="register_text"
                >
                  {((isActiveId === "login" || isActiveId === "otpLogin") &&
                    " Sign Up Now!") ||
                    ((isActiveId === "register" ||
                      isActiveId === "forgotEmailRequest") &&
                      " Login")}
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AuthForm;
