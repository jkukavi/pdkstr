import React from "react";

import { Redirect, useLocation } from "react-router-dom";

import { useAuthContext } from "../contexts/Auth";

const Authorization = ({ children }) => {
  const { user } = useAuthContext();
  const location = useLocation();

  if (!user) {
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  } else {
    return children;
  }
};

export default Authorization;
