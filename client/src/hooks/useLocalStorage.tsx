import { useEffect, useState } from "react";

const useLocalStorage = (key: string) => {
  const [value, setKeyValue] = useState(localStorage.getItem(key));

  useEffect(() => {
    const storageUpdateHandler = (evt: StorageEvent) => {
      const thisKeyHasChanged = evt.key === key;

      if (thisKeyHasChanged) {
        setKeyValue(evt.newValue);
      }
    };

    window.addEventListener("storage", storageUpdateHandler);

    return () => {
      window.removeEventListener("storage", storageUpdateHandler);
    };
  }, []);

  return value as any;
};

export default useLocalStorage;
