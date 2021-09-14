import React, { useState, useEffect } from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";

import Register from "./Register";
import LoginForm from "./LoginForm";

import { useAuthContext } from "../../contexts/Auth";
import Notification from "../../components/Notification";

const LoginPage = () => {
  const [notifications, setNotifications] = useState([]);
  const { user, reestablishSession } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const history = useHistory();

  const { from } = location.state || { from: { pathname: "/" } };

  const goBack = () => {
    history.replace(from);
  };

  const notify = (notification) => {
    setNotifications((notifications) => [...notifications, notification]);
  };

  const tryReestablishingSession = async () => {
    try {
      await reestablishSession();
      goBack();
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user === null) {
      tryReestablishingSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!!user) {
    history.replace("/");
  }

  if (loading && user === null) {
    return (
      <div className="loginPageContainer">
        <div className="loading array">
          <div className="loader" />
        </div>
      </div>
    );
  }

  return (
    <div className="loginPageContainer">
      <div style={{ position: "absolute", top: 0, left: 0 }}>
        {notifications.map((notification) => (
          <Notification notification={notification} />
        ))}
      </div>
      <div className="loginFormContainer">
        <Switch>
          <Route path="/login/register">
            <Register notify={notify} />
          </Route>
          <Route path="/login">
            <LoginForm notify={notify} goBack={goBack} />
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
