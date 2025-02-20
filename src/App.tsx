import React from "react";

// import { IonApp } from "@ionic/react";

/* Components */
import AppRoutes from "./AppRoutes";

/* Styles */
import "./theme/variables.css";
import "./theme/global.css";

const App: React.FC = () => {
  return (
    // <IonApp>
    <AppRoutes />
    // </IonApp>
  );
};

export default App;
