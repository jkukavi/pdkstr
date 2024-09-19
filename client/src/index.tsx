import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import AuthContextProvider from "contexts/Auth";

import Authorization from "components/Authorization";

import App from "./pages/App";
import Login from "./pages/Login";
import { theme } from "consts/theme";

const GlobalStyles = createGlobalStyle`
  body {
    overflow-x: hidden;
    margin: 0;
    background: linear-gradient(90deg, ${({ theme }) =>
      theme.global.background.background1}, ${({ theme }) =>
  theme.global.background.background2} 66%, ${({ theme }) =>
  theme.global.background.background3} 101%);
    position: relative;
  }

  *{
  scrollbar-color: ${({ theme }) => theme.global.scrollbar.color1};
   /* ${({ theme }) => theme.global.scrollbar.color2}; */
  scrollbar-width: thin;
  font-family: "Sarabun", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: ${({ theme }) => theme.global.scrollbar.track};

}

::-webkit-scrollbar-thumb {
  background: ${({ theme }) => theme.global.scrollbar.thumb.color};
}

::-webkit-scrollbar-thumb:hover {
  background: ${({ theme }) => theme.global.scrollbar.thumb.colorHover};
}

p {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
`;

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
