import React, { useEffect } from "react";

import { useHistory, Redirect } from "react-router-dom";

import { useAuthContext } from "../contexts/Auth";

const Authorization = ({ children }) => {
  const { user } = useAuthContext();
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.replace("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (false) {
    return <Redirect to="/login" />;
  } else {
    return children;
  }
};

export default Authorization;
