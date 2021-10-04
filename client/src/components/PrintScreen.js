import React, { useState } from "react";

import chevron from "icons/chevron.png";

const PrintScreen = ({ children }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      {process.env.NODE_ENV !== "production" && (
        <pre
          style={{
            position: "fixed",
            backgroundColor: "#cb6161f5",
            top: "10rem",
            right: 0,
            transition: "transform 0.5s",
            transform: expanded ? "translate(-1rem)" : "translate(100%)",
            zIndex: 4,
          }}
          onClick={() => setExpanded((e) => !e)}
        >
          <div
            style={{
              position: "absolute",
              width: "2rem",
              height: "2rem",
              top: "50%",
              left: 0,
              transition: "transform 0.5s",
              transform: `translate(-100%, -50%) ${
                expanded ? "rotate(90deg)" : "rotate(-90deg)"
              }`,
            }}
          >
            <img src={chevron} alt="alt" />
          </div>
          {JSON.stringify(children, null, 2)}
        </pre>
      )}
    </>
  );
};

export default PrintScreen;
