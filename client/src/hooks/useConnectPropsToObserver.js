import { useEffect } from "react";

const useConnectPropsToObserver = (props, Observer) => {
  const keys = Object.keys(props);
  const values = Object.values(props);

  useEffect(() => {
    for (let i = 0; i <= keys.length; i++) {
      Observer[keys[i]] = props[keys[i]];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, values);
};

export default useConnectPropsToObserver;
