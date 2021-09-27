import React from "react";
import { useHistory } from "react-router";

import { useAuthContext } from "../../../contexts/Auth";

import settings from "../../../icons/settings.png";
import powerOff from "../../../icons/powerOff.png";
import userIcon from "../../../icons/userIcon.png";
import { notify } from "../../Notifications";

import DropDown from "../../Dropdown";

const SearchEngineDropdown = () => {
  const history = useHistory();

  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      notify("Something went wrong. Please check your connection.");
    }
  };

  return (
    <DropDown
      frontItem={<UserIcon username={user} />}
      dropdownItems={[
        {
          component: (
            <img
              style={{ filter: "invert(0.6)", height: "65%" }}
              src={settings}
              alt="alt"
            ></img>
          ),
          onClick: () => {
            history.push("/settings");
          },
        },
        {
          component: (
            <img
              style={{ filter: "invert(0.6)", height: "65%" }}
              src={powerOff}
              alt="alt"
            ></img>
          ),
          onClick: handleLogout,
        },
      ]}
    />
  );
};

export default SearchEngineDropdown;

const colors = ["#db9134"];

const UserIcon = ({ username }) => {
  if (!username)
    return (
      <img
        style={{ filter: "invert(0.6)", height: "80%" }}
        src={userIcon}
        alt="alt"
      />
    );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "1.4rem",
        height: "1.4rem",
        alignItems: "center",
        borderRadius: "100%",
        backgroundColor: colors[0],
        background: "radial-gradient(circle, rgb(251 158 63) 0%, #fa2e2e 100%)",
        fontWeight: 600,
      }}
    >
      <span
        style={{
          filter: "drop-shadow(1px 1px 0.9px #030303c2)",
        }}
      >
        {username.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};
