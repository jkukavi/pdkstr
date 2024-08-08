import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import AuthContextProvider from "contexts/Auth";

import Authorization from "components/Authorization";

import App from "./pages/App";
import Login from "./pages/Login";
import { theme } from "consts/theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Router>
          <Switch>
            <Route path="/login-page">
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
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
