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

function throttle(callback, limit) {
  let waiting = false;
  let finalTimeout = false;
  return function (...args) {
    if (!waiting) {
      clearTimeout(finalTimeout);
      callback();
      waiting = true;
      setTimeout(function () {
        waiting = false;
      }, limit);
    } else {
      clearTimeout(finalTimeout);
      finalTimeout = setTimeout(callback, limit / 2);
    }
  };
}

const checkScroll = (setScrollingDown) => {
  let oldScroll = 0;

  return () => {
    if (window.scrollY > oldScroll) {
      setScrollingDown(true);
    } else {
      setScrollingDown(false);
    }
    oldScroll = window.scrollY;
  };
};

const localStorage = window.localStorage;

const get = () => {
  return JSON.parse(localStorage.getItem("history")) || [];
};

const add = (item) => {
  let oldHistory = JSON.parse(localStorage.getItem("history") || "[]");
  oldHistory.splice(0, 0, item);
  localStorage.setItem("history", JSON.stringify(oldHistory));
  return oldHistory;
};

const clean = () => {
  localStorage.removeItem("history");
};

const storage = { get, add, clean };

export { debounce, throttle, checkScroll, storage };
