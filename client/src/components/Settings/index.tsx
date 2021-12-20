import React from "react";
import { useHistory } from "react-router-dom";

import chevron from "icons/chevron.svg";

import "./index.css";

const Settings = () => {
  const history = useHistory();
  return (
    <div className="settings">
      <button onClick={() => history.goBack()}>
        <img
          src={chevron}
          style={{ transform: "rotate(90deg)" }}
          alt="alt"
        ></img>
        <span>Return</span>
      </button>
      <div style={{ color: "#c9c9c9" }}>
        No settings yet to be shown here, but expect to see them here as soon as
        they are developed.
      </div>
    </div>
  );
};

export default Settings;
