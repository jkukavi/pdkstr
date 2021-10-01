import { useScrollingDownContext } from "../../../contexts/ScrollingDown";

const CollapseOnScrollContainer = ({ viewingChannel, children }) => {
  const scrollingDown = useScrollingDownContext("cardContainer");

  const collapsedClassName = viewingChannel ? "collapsed" : "collapsed2x";

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
