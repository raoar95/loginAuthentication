import React from "react";
import { Route, Routes } from "react-router-dom";
// import { ProtectedRoute, UnProtectedRoute } from "./utils/RouteHandler";
import Dashboard from "./component/dashboard";
import AuthForm from "./component/LoginRegisterForm";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* <UnProtectedRoute path="/login" element={<AuthForm />} />
      <UnProtectedRoute path="/dashboard" element={<Dashboard />} /> */}
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/login" element={<AuthForm />} /> */}
    </Routes>
  );
};

export default AppRoutes;
