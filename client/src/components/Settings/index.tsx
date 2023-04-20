import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { SearchEngineIcon } from "consts";
import { ping, tryRestartingService } from "apiCalls";
import MicroLoader from "components/Loaders/MicroLoader";

import chevron from "icons/chevron.svg";
import "./index.css";

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
      <div style={{ color: "#c9c9c9" }}>
        No settings yet to be shown here, but expect to see them here as soon as
        they are developed.
      </div>
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

const ServicesHealthCheck = () => (
  <>
    {engineArray.map((engine: Engine) => (
      <HealthOf engine={engine} />
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
  });

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
