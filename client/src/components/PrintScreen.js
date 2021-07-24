import React from "react";

const PrintScreen = ({ children }) => {
  return (
    <>
      {process.env.NODE_ENV !== "production" && (
        <pre
          style={{
            position: "absolute",
            backgroundColor: "#cb6161f5",
            top: "10vh",
            left: "10vw",
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
