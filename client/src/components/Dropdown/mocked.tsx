import React from "react";
import DropDown from ".";

const MockedDropdown = () => {
  return (
    <DropDown
      dropdownItems={[
        { component: "hello", onClick: () => {} },
        { component: "hello", onClick: () => {} },
        { component: "hello", onClick: () => {} },
      ]}
      frontItem={<p>hello2</p>}
    />
  );
};

export default MockedDropdown;
