import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { SearchEngineIcon } from "consts";
import { ping, tryRestartingService } from "apiCalls";
import MicroLoader from "components/Loaders/MicroLoader";

import chevron from "icons/chevron.svg";
import "./index.css";
import DropDown from "components/Dropdown";
import Text from "components/Text";

const engineArray: Engine[] = ["youtube", "soundcloud"];

const Settings = () => {
  const [healthExpanded, setHealthExpanded] = useState<boolean>(false);
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
      <CardSizeDropdown />
      <div style={{ marginTop: "1rem" }}>
        <h2>Health checks of services:</h2>
        {healthExpanded ? (
          <ServicesHealthCheck />
        ) : (
          <button
            onClick={() => {
              setHealthExpanded(true);
            }}
          >
            Health check
          </button>
        )}
        {
          <button
            onClick={() => {
              tryRestartingService();
            }}
          >
            Restart Service
          </button>
        }
      </div>
    </div>
  );
};

const CardSizeDropdown = () => {
  const [size, _setCardSize] = useState(
    localStorage.getItem("cSize") || "large"
  );

  const setCardSize = (size: "small" | "large") => {
    _setCardSize(size);
    localStorage.setItem("cSize", size);
  };

  const sizes = ["small", "large"] as const;

  const dropdownItems = sizes.map((item) => ({
    component: <Text>{item}</Text>,
    onClick: () => {
      setCardSize(item);
    },
  }));

  return (
    <DropDown dropdownItems={dropdownItems} frontItem={<Text>{size}</Text>} />
  );
};

const ServicesHealthCheck = () => (
  <>
    {engineArray.map((engine: Engine, i) => (
      <HealthOf engine={engine} key={i} />
    ))}
  </>
);

export default Settings;

type Health = "checking" | "healthy" | "unhealthy";

const HealthOf = ({ engine }: { engine: Engine }) => {
  const [health, setHealth] = useState<Health>("checking");

  const checkHealth = async () => {
    try {
      await ping(engine);
      setHealth("healthy");
    } catch (e) {
      setHealth("unhealthy");
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "3rem",
        width: "5rem",
        filter: "drop-shadow(black 1px 1px 1px)",
        justifyContent: "space-between",
      }}
    >
      <SearchEngineIcon engine={engine} size="m" />
      <HealthIcon health={health} />
    </div>
  );
};

const HealthIcon = ({ health }: { health: Health }) => {
  if (health === "checking") {
    return <MicroLoader />;
  }

  const backgroundColorsByHealth = {
    healthy: "green",
    unhealthy: "red",
  };

  return (
    <div
      style={{
        marginLeft: "1rem",
        borderRadius: "50%",
        height: "1.5rem",
        width: "1.5rem",
        backgroundColor: backgroundColorsByHealth[health],
      }}
    />
  );
};
