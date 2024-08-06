import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { theme } from "consts/theme";
import styled from "styled-components";

import { SearchEngineIcon } from "consts";
import { ping, tryRestartingService } from "apiCalls";

import chevron from "icons/chevron.svg";
import "./index.css";
import DropDown from "components/Dropdown";
import Text from "components/Text";
import SpinningLoader from "components/Loaders";

const engineArray: Engine[] = ["youtube", "soundcloud"];

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 2rem;
  will-change: transform;
  border: none;
  text-decoration: none;
  outline: none;
  background-color: #393838;
  font-weight: 500;
  border-radius: 3px;
  box-shadow: 1px 1px 2px black;
  transition: box-shadow 0.2s;
  margin-bottom: 1rem;

  &:hover {
    box-shadow: 2px 1px 5px black;
  }
`;

const BackButton = styled(Button)`
  & span {
    width: 0;
    transition: width 0.3s;
  }

  &:hover span {
    width: 5rem;
  }
`;

const Settings = () => {
  const [healthExpanded, setHealthExpanded] = useState<boolean>(false);
  const history = useHistory();
  return (
    <div
      //className="settings"
      style={{
        paddingLeft: " 1rem",
        paddingTop: "1rem",
        height: " 100%",
        background: " #c7c7c7",
      }}
    >
      <BackButton onClick={() => history.goBack()}>
        <img
          src={chevron}
          style={{ transform: "rotate(90deg)" }}
          alt="alt"
        ></img>
        <span
          style={{
            position: "relative",
            top: "-3px",
            fontSize: "1.2rem",
            lineHeight: "1.2rem",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          Return
        </span>
      </BackButton>
      {/*added div*/}
      {/*added a headline*/}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "1rem",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "500",
            textTransform: "uppercase",
          }}
        >
          Settings
        </h2>
        <ProxySettings />
        <CardSizeDropdown />
        <div style={{ marginTop: "1rem" }}>
          <h2
            style={{
              fontWeight: "500",
              fontSize: "21px",
              textTransform: "uppercase",
            }}
          >
            Health checks of services:
          </h2>
          {healthExpanded ? (
            <ServicesHealthCheck />
          ) : (
            <Button
              onClick={() => {
                setHealthExpanded(true);
              }}
            >
              Health check
            </Button>
          )}
          {
            <Button
              onClick={() => {
                tryRestartingService();
              }}
            >
              Restart Service
            </Button>
          }
        </div>
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

{
  /* Settings styles

const SettingsContainer = styled.div`
  padding-left: 1rem;
  comment out margin-top, added padding-top
  margin-top: 1rem;
  padding-top: 1rem;
  change on height
  height: 100%;
  background: #c7c7c7;
`;

const SettingsInnerContainer = styled.div`
  display: "flex";
  flex-direction: "column";
  row-gap: "1rem";
  border: "1px solid red";
`;
*/
}
