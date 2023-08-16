import React from "react";

const Text = ({ children }: { children: string }) => {
  return (
    <span style={{ fontSize: "12px", color: "whitesmoke" }}>{children}</span>
  );
};

export default Text;
