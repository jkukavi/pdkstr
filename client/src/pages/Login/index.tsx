import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { theme } from "consts/theme";

import { useAuthContext } from "contexts/Auth";

import Notifications from "components/Notifications";

import Register from "./Register";
import LoginForm from "./LoginForm";
import SpinningLoader from "components/Loaders";

const LoginPage = () => {
  const { user, reestablishSession } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const location = useLocation<{ from: { pathname: string } } | undefined>();
  const history = useHistory();

  const { from } = location.state || { from: { pathname: "/" } };

  const goBack = () => {
    history.replace(from);
  };

  const tryReestablishingSession = async () => {
    try {
      await reestablishSession();
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user === null) {
      tryReestablishingSession();
    }
  }, []);

  if (user) {
    goBack();
  }

  if (loading && user === null) {
    return (
      <div className="loginPageContainer">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "3rem",
            margin: "auto",
          }}
        >
          <SpinningLoader
            sizeInPx={300}
            color={theme.loaders.otherBorderColor}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="loginPageContainer">
      <Notifications />
      <div className="loginFormContainer">
        <Switch>
          <Route path="/login/register">
            <Register />
          </Route>
          <Route path="/login-page">
            <LoginForm goBack={goBack} />
          </Route>
          <Route path="/reload">
            <div>YALL need to reload</div>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default LoginPage;
