import React from "react";

import magnifier from "icons/magnifier.svg";

const Navbar = ({
  handleInputChange,
}: {
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <div className="filterNavbarContainer">
      <div className="filterNavbar">
        <h2>History</h2>
        <div className="verticalLine"></div>
        <input
          style={{ margin: "3px 0 3px" }}
          type="text"
          placeholder="Search history"
          onChange={handleInputChange}
        />

        <div className="iconHolder">
          <img src={magnifier} alt="alt" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
