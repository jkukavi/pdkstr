import { v4 as uuidv4 } from "uuid";

const debounce = (func, wait) => {
  var timeout;
  return function (arg) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = null;
      func(arg);
    }, wait);
  };
};

function addRandomKey(item) {
  return {
    ...item,
    key: uuidv4(),
  };
}

const rounded = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

function getViewsString(stringNumber) {
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

function throttle(callback, limit) {
  let waiting = false;
  let finalTimeout = false;
  return function (...args) {
    if (!waiting) {
      clearTimeout(finalTimeout);
      callback(...args);
      waiting = true;
      setTimeout(function () {
        waiting = false;
      }, limit);
    } else {
      clearTimeout(finalTimeout);
      finalTimeout = setTimeout(() => callback(...args), limit / 2);
    }
  };
}

const checkScroll = (setScrollingDown) => {
  let oldScroll = 0;
  const cardContainer = document.getElementById("cardContainer");

  return () => {
    console.log("hello");
    if (cardContainer.scrollTop > oldScroll) {
      setScrollingDown(true);
    } else {
      setScrollingDown(false);
    }
    oldScroll = cardContainer.scrollTop;
  };
};

const localStorage = window.localStorage;

const get = (name) => {
  return JSON.parse(localStorage.getItem(name)) || [];
};

const add = (name, item) => {
  let oldData = JSON.parse(localStorage.getItem(name) || "[]");
  oldData.splice(0, 0, item);
  localStorage.setItem(name, JSON.stringify(oldData));
  return oldData;
};

const clean = (name) => {
  localStorage.removeItem(name);
};

const storage = { get, add, clean };

export {
  debounce,
  throttle,
  checkScroll,
  storage,
  addRandomKey,
  getViewsString,
};
