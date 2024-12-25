import React from "react";
import { logoutUser } from "../service/api";
import { useAuth } from "../state/context/AuthProviderContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { userData, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (token) {
      logoutUser(token)
        .then((response) => {
          console.log("response: ", response);

          if (response && response.status === 200) {
            navigate("/login");
          }
        })
        .catch((err) => {
          console.error("Logout Error:", err);
        });
    }
  };

  return (
    <div>
      <h2 style={{ color: "#000" }}>{`${userData?.fullName}`} Dashboard</h2>
      <button onClick={() => handleLogout()}>Logout</button>
    </div>
  );
};

export default Dashboard;
