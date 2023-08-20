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
      <ProxySettings />
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
    <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
      <Text size="M">{"Card sizes:"}</Text>
      <DropDown dropdownItems={dropdownItems} frontItem={<Text>{size}</Text>} />
    </div>
  );
};

const ProxySettings = () => {
  const [proxySetting, _setProxySetting] = useState(
    localStorage.getItem("onlyProxy") || "false"
  );

  const setProxySetting = (size: "true" | "false") => {
    _setProxySetting(size);
    localStorage.setItem("onlyProxy", size);
  };

  const proxyOptions = ["true", "false"] as const;

  const dropdownItems = proxyOptions.map((item) => ({
    component: <Text>{item}</Text>,
    onClick: () => {
      setProxySetting(item);
    },
  }));

  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
      <Text size="M">{"Should only proxy audio:"}</Text>
      <DropDown
        dropdownItems={dropdownItems}
        frontItem={<Text>{proxySetting}</Text>}
      />
    </div>
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

type Health = "healthy" | "unhealthy";

const HealthOf = ({ engine }: { engine: Engine }) => {
  const [healthResult, setHealthResult] = useState<
    boolean | { [key: string]: boolean } | null
  >(null);
  const [loading, setLoading] = useState(false);

  const checkHealth = async () => {
    try {
      setLoading(true);
      const pingResult = await ping(engine);

      setHealthResult(pingResult as any);

      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const getResultComponent = () => {
    if (typeof healthResult === "boolean") {
      return (
        <HealthIcon health={healthResult === true ? "healthy" : "unhealthy"} />
      );
    }

    if (typeof healthResult === "object" && healthResult !== null) {
      const resultRows = Object.keys(healthResult).map((key) => (
        <div style={{ display: "flex" }}>
          <Text>{key}</Text>
          <HealthIcon
            health={healthResult[key] === true ? "healthy" : "unhealthy"}
          />
        </div>
      ));

      return (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              filter: "drop-shadow(black 1px 1px 1px)",
            }}
          >
            {resultRows}
          </div>
        </>
      );
    }

    return <></>;
  };

  if (loading || typeof healthResult === "boolean")
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "5rem",
          filter: "drop-shadow(black 1px 1px 1px)",
          justifyContent: "space-between",
        }}
      >
        <SearchEngineIcon engine={engine} size="m" />
        {loading ? (
          <MicroLoader />
        ) : (
          <HealthIcon
            health={healthResult === true ? "healthy" : "unhealthy"}
          />
        )}
      </div>
    );

  return (
    <>
      <SearchEngineIcon engine={engine} size="m" />
      {getResultComponent()}
    </>
  );
};

const HealthIcon = ({ health }: { health: Health }) => {
  const backgroundColorsByHealth = {
    healthy: "green",
    unhealthy: "red",
  };

  return (
    <div
      style={{
        marginLeft: "1rem",
        borderRadius: "50%",
        height: "1rem",
        width: "1rem",
        backgroundColor: backgroundColorsByHealth[health],
      }}
    />
  );
};
