import React, { memo } from "react";
import "./Loader.css";

const BlinkLoader = () => {
  return <span className="loader"></span>;
};

export default memo(BlinkLoader);
