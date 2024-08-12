import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import parseFormData from "helpers/parseFormData";
import { notify } from "components/Notifications";
import Loaders from "components/Loaders";

const Register = () => {
  const [state, setState] = useState({ loading: false, success: false });

  const register: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setState((state) => ({ ...state, loading: true }));

    const {
      "new-username": username,
      "new-password": password,
      "new-email": email,
    } = parseFormData(e.target as HTMLFormElement);

    const body = { username, password, email };

    try {
      await axios.post("/register", body);
      setState((state) => ({ ...state, loading: false, success: true }));
      notify("Registration successful, check your email!");
    } catch (e) {
      notify("Something went wrong with registration. Try again.");
    }
  };
  return (
    <form className="loginForm" onSubmit={register}>
      <div className="item">
        <label htmlFor="new-username">Username:</label>
        <input
          type="text"
          name="new-username"
          className="textInput"
          autoComplete="new-username"
          required
        />
      </div>
      <div className="item">
        <label htmlFor="new-email">Email:</label>
        <input
          type="email"
          name="new-email"
          className="textInput"
          autoComplete="new-email"
          required
        />
      </div>
      <div className="item">
        <label htmlFor="new-password">Password:</label>
        <input
          type="password"
          name="new-password"
          className="textInput"
          autoComplete="new-password"
          required
        />
      </div>
      <div className="item">
        <button style={{ width: "10rem" }}>
          {state.loading ? <Loaders.tiny /> : "Register"}
        </button>
      </div>
      <Link to={"/login-page"}>Back to login</Link>
    </form>
  );
};

export default Register;
