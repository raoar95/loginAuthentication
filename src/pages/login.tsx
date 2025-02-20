import React from "react";

/* Components */
import AuthForm from "../components/Form/AuthForm";

/* Styles */
import "./login.scss";

const Login: React.FC = () => {
  return (
    <div className="auth_container">
      <AuthForm />
    </div>
  );
};

export default Login;
