import React, { useEffect, useState } from "react";
import { logoutUser } from "../service/api";
import { useAuth } from "../state/context/AuthProviderContext";
import { useNavigate } from "react-router-dom";
import BlinkLoader from "./loader/Loader";
import { useToast } from "../state/context/ToastContextProvider";
import "./dashboard.css";
import { IUserData } from "../interface/user";

const Dashboard = () => {
  const { token, isLoading, setIsLoading } = useAuth();
  const { toastSuccess, toastError } = useToast();
  const [activeUser, setActiveUser] = useState<IUserData | null>(null);

  const navigate = useNavigate();

  // Check if user exist
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const user = userData ? JSON.parse(userData) : null;

    if (!user || !token) {
      toastError("Please Login to Access Dashboard");
      navigate("/loginAuthentication/");
    }

    setActiveUser(user);
  }, []);

  const handleLogout = () => {
    setIsLoading(true);

    if (token) {
      logoutUser(token)
        .then((response) => {
          console.log("response");

          if (response && response.status === 200) {
            setIsLoading(false);
            localStorage.removeItem("userData");
            toastSuccess(response.message);
            navigate("/loginAuthentication/");
          }
        })
        .catch((err) => {
          setIsLoading(false);
          toastError(err.errorMessage);
          console.error("Logout Error:", err);
        });
    }
  };

  return (
    <div className="dashboard-container">
      <h2 style={{ color: "#000" }}>{`${activeUser?.fullName}`} Dashboard</h2>
      <button onClick={() => handleLogout()}>
        {!isLoading && "Logout"} {isLoading && <BlinkLoader />}
      </button>
    </div>
  );
};

export default Dashboard;

// {`${user?.fullName}`}
