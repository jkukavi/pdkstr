import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./pages/App";
import LoginPage from "./pages/Login";
import Authorization from "./components/Authorization";

import AuthContextProvider from "./contexts/Auth";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <AuthContextProvider>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Authorization>
            <App />
          </Authorization>
        </AuthContextProvider>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
