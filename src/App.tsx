import React from "react";
// import { useEffect, useState } from "react";
// import axios from "axios";
import "./App.css";
import AuthForm from "./component/LoginRegisterForm";
import AppRoutes from "./AppRoutes";
import { Routes } from "react-router-dom";

function App() {
  // const [jokes, setJokes] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("/jokes")
  //     .then((res) => {
  //       setJokes(res.data);
  //       // console.log(res);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  return (
    <>
      {/* <div className="myCont">
        <h1>Testing</h1><br /><br />
        {jokes.map((data) => (
            <p key={data.id}>{data.joke}<br /></p>
          )
        )}
      </div> */}
      {/* <AuthForm /> */}

      <AppRoutes />
    </>
  );
}

export default App;
