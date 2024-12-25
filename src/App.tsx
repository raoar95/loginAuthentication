import React from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";
import AuthForm from "./component/LoginRegisterForm";

function App() {
  return (
    <>
      <AuthForm />
      <AppRoutes />
    </>
  );
}

export default App;
