import React, { useState, FormEvent } from "react";
import "./LoginRegister.css";
import { loginAuth, registerAuth } from "../service/api";
// import { userData, setUserData, token, setToken } f

/** context */
import { AuthContextType, useAuth } from "../state/context/AuthProviderContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../state/context/ToastContextProvider";

/** loader */
import BlinkLoader from "./loader/Loader";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { toastSuccess, toastError } = useToast();

  const {
    setUserData,
    setToken,
    setIsAuth,
    isLoading,
    setIsLoading,
    setRegResponseData,
    setLoginError,
    setRegError,
  } = useAuth() as AuthContextType;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLogin) {
      loginAuth({ email, password })
        .then((data) => {
          setUserData(data.data.user);
          setToken({
            accessToken: data.data.refreshToken,
            refreshToken: data.data.accessToken,
          });
          setIsAuth(true);
          setIsLoading(false);
          toastSuccess(data.message);
          navigate("/loginAuthentication/dashboard");
        })
        .catch((err) => {
          setLoginError(err);
          setIsAuth(false);
          setIsLoading(false);
          toastError(err.errorMessage);
          console.log("Login Error: ", err);
        });
    } else {
      registerAuth({ fullName, email, password })
        .then((resData) => {
          setIsLoading(false);
          setRegResponseData(resData);
          toastSuccess(resData.message);
          navigate("/");
        })
        .catch((err) => {
          setIsLoading(false);
          setRegError(err);
          toastError(err.errorMessage);
          console.log("Register Error: ", err);
        });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="auth-input-group">
              <label htmlFor="name" className="auth-label">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="auth-input"
              />
            </div>
          )}
          <div className="auth-input-group">
            <label htmlFor="email" className="auth-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
          </div>
          <div className="auth-input-group">
            <label htmlFor="password" className="auth-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
          </div>
          <button
            type="submit"
            className="auth-button"
            onClick={() => setIsLoading(true)}
          >
            {!isLoading && (isLogin ? "Login" : "Register")}{" "}
            {isLoading && <BlinkLoader />}
          </button>
        </form>
        <div className="auth-switch-mode">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="auth-switch-button"
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
