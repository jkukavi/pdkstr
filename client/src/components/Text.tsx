import React from "react";

const sizes = {
  S: "12px",
  M: "16px",
  L: "20px",
};

type Size = keyof typeof sizes;

const Text = ({ children, size = "S" }: { children: string; size?: Size }) => {
  return (
    <span style={{ fontSize: sizes[size], color: "whitesmoke" }}>
      {children}
    </span>
  );
};

export default Text;
