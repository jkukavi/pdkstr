import React, { useState } from "react";
import { useHistory } from "react-router";

import { useAuthContext } from "../../../contexts/Auth";

import chevron from "../../../icons/chevron.png";
import settings from "../../../icons/settings.png";
import powerOff from "../../../icons/powerOff.png";
import userIcon from "../../../icons/userIcon.png";
import { notify } from "../../Notifications";

const SearchEngineDropdown = () => {
  const [dropdown, setDropdown] = useState(false);
  const history = useHistory();

  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      notify("Something went wrong. Please check your connection.");
    }
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    setDropdown((dropdown) => !dropdown);
    if (!dropdown) {
      setTimeout(() => document.getElementById("alternateEngines").focus(), 0);
    }
  };
  return (
    <>
      <div className={"dropDownContainer"}>
        <div
          className={"dropDownIcon active"}
          tabIndex={0}
          //pointerDown, because pointerUp lost a race condition to onBlur of droppedMenu, so to win the race,
          //pointerDown is used. In time, should be replaced maybe with a flag or smth.
          onPointerDown={handlePointerDown}
          //so it can be opened with keyboard
          onKeyPress={handlePointerDown}
        >
          <UserIcon username={user} />

          <img className="chevron" src={chevron} alt="alt" />
        </div>
        {dropdown && (
          <div
            onBlur={() => {
              setDropdown(false);
            }}
            id="alternateEngines"
            //tabIndex="-1" or "0" so it can catch focus, and therefore trigger onblur
            tabIndex={0}
            className="dropDown"
          >
            <div
              className="dropDownIcon"
              onClick={() => {
                setDropdown(false);
                history.push("/settings");
              }}
            >
              <img
                style={{ filter: "invert(0.6)", height: "65%" }}
                src={settings}
                alt="alt"
              ></img>
            </div>
            <div className="dropDownIcon" onClick={handleLogout}>
              <img
                style={{ filter: "invert(0.6)", height: "65%" }}
                src={powerOff}
                alt="alt"
              ></img>
            </div>
          </div>
        )}
      </div>
    </>
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
