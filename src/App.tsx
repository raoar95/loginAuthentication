import React from "react";
import AppRoutes from "./AppRoutes";
import Toast from "./component/toast/Toast";
import { useToast } from "./state/context/ToastContextProvider";

function App() {
  const { toastSuccess, toastError } = useToast();

  const handleClick = () => {
    // toastSuccess("This is a success message");
    toastError("This is a Error message");
  };

  return (
    <>
      {/* <Toast
          isVisible
          type="Success"
          message="User Registered Successfully"
          setToast={setToast}
        /> */}
      {/* <button onClick={handleClick}>Show Toast</button> */}
      <AppRoutes />
    </>
  );
}

export default App;
