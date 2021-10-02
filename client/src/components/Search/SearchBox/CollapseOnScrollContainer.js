import { useScrollingDownContext } from "../../../contexts/ScrollingDown";

const CollapseOnScrollContainer = ({ children }) => {
  const scrollingDown = useScrollingDownContext("cardContainer");

  return (
    <div className={`searchBoxContainer ${scrollingDown ? "collapsed" : ""}`}>
      {children}
    </div>
  );
};

export default CollapseOnScrollContainer;
