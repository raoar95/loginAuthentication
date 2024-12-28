import React from "react";
import { logoutUser } from "../service/api";
import { useAuth } from "../state/context/AuthProviderContext";
import { useNavigate } from "react-router-dom";
import BlinkLoader from "./loader/Loader";
import { useToast } from "../state/context/ToastContextProvider";

const Dashboard = () => {
  const { userData, token, isLoading, setIsLoading } = useAuth();

  const { toastSuccess, toastError } = useToast();

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoading(true);

    if (token) {
      logoutUser(token)
        .then((response) => {
          if (response && response.status === 200) {
            setIsLoading(false);
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
    <div style={{ textAlign: "center" }}>
      <h2 style={{ color: "#000" }}>{`${userData?.fullName}`} Dashboard</h2>
      <button onClick={() => handleLogout()}>
        {!isLoading && "Logout"} {isLoading && <BlinkLoader />}
      </button>
    </div>
  );
};

export default Dashboard;
