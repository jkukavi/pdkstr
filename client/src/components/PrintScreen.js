import React, { useState } from "react";

const PrintScreen = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
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
            transform: expanded ? "translate(0)" : "translate(90%)",
            zIndex: 4,
          }}
          onClick={() => setExpanded((e) => !e)}
        >
          "expanded" :{expanded.toString()}
          {children}
        </pre>
      )}
    </>
  );
};

export default PrintScreen;
