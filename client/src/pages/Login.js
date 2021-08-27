import React, { useState } from "react";
import { Link, Route, useRouteMatch } from "react-router-dom";

import { useAuthContext } from "../contexts/Auth";

const LoginPage = () => {
  const { setUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const { url } = useRouteMatch();

  if (loading)
    return (
      <div className="loginFormContainer">
        <div className="loading array">
          <div className="loader" />
        </div>
      </div>
    );

  return (
    <div className="loginFormContainer">
      <form
        className="loginForm"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => {
            setUser(true);
          }, 2000);
        }}
      >
        <div className="item">
          <label for="username">Username:</label>
          <input
            type="text"
            name="username"
            className="textInput"
            autocomplete="username"
          />
        </div>

        <div className="item">
          <label for="password">Password:</label>
          <input
            type="password"
            name="password"
            className="textInput"
            autocomplete="current-password"
          />
        </div>
        <Route exact path={`${url}/guest-code`}>
          <div className="item">
            <div className="item">
              <label for="guestCode">Guest code:</label>
              <input type="email" name="guestCode" className="textInput" />
            </div>
          </div>
        </Route>

        <div className="underlayContainer">
          <div className="underlay">{/* <div className="inner" /> */}</div>
        </div>
        <div className="item">
          <button>Log in</button>
          <Link to={`${url}/guest-code`}>You have a guest code?</Link>

          <Link to={`${url}/forgot-password`}>Forgot your password?</Link>
          <Route exact path={`${url}/forgot-password`}>
            <div className="item">
              <label for="forgotPassword">Email:</label>
              <input type="email" name="forgotPassword" className="textInput" />
            </div>
          </Route>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
