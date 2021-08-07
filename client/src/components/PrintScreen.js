import React from "react";

const PrintScreen = ({ children }) => {
  return (
    <>
      {process.env.NODE_ENV !== "production" && (
        <pre
          style={{
            position: "absolute",
            backgroundColor: "#cb6161f5",
            bottom: "2rem",
            right: "5rem",
            zIndex: 4,
          }}
        >
          {children}
        </pre>
      )}
    </>
  );
};

export default PrintScreen;
