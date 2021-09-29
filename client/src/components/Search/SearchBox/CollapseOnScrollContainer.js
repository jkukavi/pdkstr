import { useScrollingDownContext } from "../../../contexts/ScrollingDown";

const CollapseOnScrollContainer = ({ collapsedClassName, children }) => {
  const scrollingDown = useScrollingDownContext("cardContainer");

  return (
    <div
      className={`searchBoxContainer ${
        scrollingDown ? collapsedClassName : ""
      }`}
    >
      {children}
    </div>
  );
};

export default CollapseOnScrollContainer;
