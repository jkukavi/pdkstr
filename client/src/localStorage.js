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

const exports = { get, add, clean };

export default exports;
