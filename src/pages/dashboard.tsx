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

  // Check if user exist
  // useEffect(() => {
  //   const userData = localStorage.getItem("userData");
  //   const user = userData ? JSON.parse(userData) : null;

  //   if (!user || !token) {
  //     toastError("Please Login to Access Dashboard");
  //     navigate("/");
  //   }

  //   setActiveUser(user);
  // }, []);

  const handleLogout = async () => {
    setIsLoading(true);

    await logoutUser()
      .then((response) => {
        console.log("response");
        if (response && response.status === 200) {
          setIsLoading(false);
          localStorage.removeItem("userData");
          toastSuccess(response.message);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toastError(err.errorMessage);
        console.error("Logout Error:", err);
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

// {`${user?.fullName}`}
