import React, { useEffect, useState } from "react";
import { logoutUser } from "../service/api";
import { useAuth } from "../context/authProvider.context";
import { useNavigate } from "react-router-dom";
import BlinkLoader from "../components/Loader/Loader";
import { useToast } from "../context/toastProvider.context";
import "./dashboard.scss";

const Dashboard = () => {
  const { isLoading, setIsLoading } = useAuth();
  const { toastSuccess, toastError } = useToast();

  const { userData } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);

    await logoutUser()
      .then((response) => {
        setIsLoading(false);
        toastSuccess(response.message);
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        toastError(err.errorMessage);
      });
  };

  return (
    <div className="dashboard-container">
      <h2>{`${userData?.fullName}`} Dashboard</h2>
      <button className="myBtn" onClick={() => handleLogout()}>
        {isLoading ? <BlinkLoader /> : "Logout"}
      </button>
    </div>
  );
};

export default Dashboard;
