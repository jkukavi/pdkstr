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

export { debounce, throttle, checkScroll, storage };
