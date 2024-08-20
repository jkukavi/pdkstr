import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { SearchEngineIcon } from "consts";
import { ping, tryRestartingService } from "apiCalls";
//import MicroLoader from "components/Loaders/MicroLoader";
import Loaders from "components/Loaders";

import chevron from "icons/chevron.svg";
import "./index.css";
import DropDown from "components/Dropdown";
import Text from "components/Text";
import SpinningLoader from "components/Loaders";
import { theme } from "consts/theme";

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

const Flex = ({ children }: { children: React.ReactNode }) => {
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
      {children}
    </div>
  );
};

const HealthOf = ({ engine }: { engine: Engine }) => {
  const [healthResult, setHealthResult] = useState<
    boolean | { [key: string]: boolean }
  >({});
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

  if (loading)
    return (
      <Flex>
        <SearchEngineIcon engine={engine} size="m" />
        <SpinningLoader
          sizeInPx={32}
          color={theme.loaders.otherBorderColor}
          style={{ margin: "auto" }}
        />
      </Flex>
    );

  if (typeof healthResult === "boolean") {
    return (
      <Flex>
        <SearchEngineIcon engine={engine} size="m" />
        <HealthStatus healthResult={healthResult} />
      </Flex>
    );
  }

  return (
    <>
      <SearchEngineIcon engine={engine} size="m" />
      <HealthStatus healthResult={healthResult} />
    </>
  );
};

const HealthIcon = ({ healthy }: { healthy: boolean }) => {
  return (
    <div
      style={{
        marginLeft: "1rem",
        borderRadius: "50%",
        height: "0.7rem",
        width: "0.7rem",
        backgroundColor: healthy ? "green" : "#e61b1b",
      }}
    />
  );
};

const HealthStatus = ({
  healthResult,
}: {
  healthResult: boolean | Record<string, boolean>;
}) => {
  if (typeof healthResult === "boolean") {
    return <HealthIcon healthy={healthResult} />;
  }

  if (typeof healthResult === "object") {
    const resultRows = Object.keys(healthResult).map((key) => (
      <div style={{ display: "flex" }}>
        <Text>{key}</Text>
        <HealthIcon healthy={healthResult[key]} />
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
  } else return <></>;
};
