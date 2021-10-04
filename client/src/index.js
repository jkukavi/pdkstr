import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthContextProvider from "contexts/Auth";

import Authorization from "components/Authorization";

import App from "./pages/App";
import Login from "./pages/Login";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Authorization>
              <App />
            </Authorization>
          </Route>
        </Switch>
      </Router>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
