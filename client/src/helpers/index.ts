import { v4 as uuidv4 } from "uuid";

interface VoidFunction {
  (args?: any): void;
}

const debounce = (func: VoidFunction, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null;
  return function (...args: any) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = null;
      func(...args);
    }, wait);
  };
};

function addRandomKey(item: any) {
  return {
    ...item,
    key: uuidv4(),
  };
}

const rounded = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;

function getViewsString(stringNumber: number) {
  const num = Number(stringNumber);
  const million = 1000 * 1000;
  const thousand = 1000;
  const billion = 1000 * 1000 * 1000;

  if (num > billion) {
    const billions = rounded(num / billion);
    return `${billions}B`;
  } else if (num > million) {
    const millions = rounded(num / million);
    return `${millions}M`;
  } else if (num > thousand) {
    const thousands = rounded(num / thousand);
    return `${thousands}K`;
  } else {
    return num;
  }
}

function throttle(callback: VoidFunction, limit: number) {
  let waiting = false;
  let finalTimeout: ReturnType<typeof setTimeout> | null;
  return function (...args: any) {
    if (!waiting) {
      if (finalTimeout) {
        clearTimeout(finalTimeout);
      }
      callback(...args);
      waiting = true;
      setTimeout(function () {
        waiting = false;
      }, limit);
    } else {
      if (finalTimeout) {
        clearTimeout(finalTimeout);
      }
      finalTimeout = setTimeout(() => callback(...args), limit / 2);
    }
  };
}

const checkScroll = (
  setScrollingDown: React.Dispatch<React.SetStateAction<boolean>>
) => {
  let oldScroll = 0;
  const cardContainer = document.getElementById("cardContainer");

  return () => {
    if (!cardContainer) return;

    if (cardContainer.scrollTop > oldScroll) {
      setScrollingDown(true);
    } else {
      setScrollingDown(false);
    }
    oldScroll = cardContainer.scrollTop;
  };
};

export { debounce, throttle, checkScroll, addRandomKey, getViewsString };
