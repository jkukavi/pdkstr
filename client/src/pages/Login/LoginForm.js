import React, { useState } from "react";

import { Link, Route, useRouteMatch } from "react-router-dom";

import { notify } from "../../components/Notifications";

import { useAuthContext } from "../../contexts/Auth";

const LoginForm = ({ goBack }) => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
  const { url } = useRouteMatch();

  const tryLogging = async (e) => {
    setLoading(true);
    try {
      await login(e);
      goBack();
    } catch (err) {
      if (err.response.status === 401) {
        notify("Wrong credentials brother!");
      } else if (err.response.status >= 500 && err.response.status <= 510) {
        notify(
          "Server is not responding. Service may be down. Check your internet connection."
        );
      }
      setLoading(false);
    }
  };
  return (
    <form className="loginForm" onSubmit={tryLogging}>
      <div className="item">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          name="email"
          className="textInput"
          autoComplete="username"
        />
      </div>
      <div className="item">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          className="textInput"
          autoComplete="current-password"
        />
      </div>
      <Route exact path={`${url}/guest-code`}>
        <div className="item">
          <div className="item">
            <label htmlFor="guestCode">Guest code:</label>
            <input type="email" name="guestCode" className="textInput" />
          </div>
        </div>
      </Route>
      <div className="item">
        <button>
          {loading ? (
            <div style={{ margin: "auto" }} className="tinyloader" />
          ) : (
            "Log in"
          )}
        </button>

        <Link to={`${url}/guest-code`}>You have a guest code?</Link>

        <Link to={`${url}/forgot-password`}>Forgot your password?</Link>
        <Link to={`${url}/register`}>Sign up</Link>

        <Route exact path={`${url}/forgot-password`}>
          <div className="item">
            <label htmlFor="forgotPassword">Email:</label>
            <input type="email" name="forgotPassword" className="textInput" />
          </div>
        </Route>
      </div>
    </form>
  );
};

export default LoginForm;
