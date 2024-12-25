import React from "react";
import { Route, Routes } from "react-router-dom";
// import { ProtectedRoute, UnProtectedRoute } from "./utils/RouteHandler";
import Dashboard from "./component/dashboard";
import AuthForm from "./component/LoginRegisterForm";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <UnProtectedRoute path="/login" element={<AuthForm />} />
      <UnProtectedRoute path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  );
};

export default AppRoutes;
