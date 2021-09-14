const parseFormData = (eventTarget) => {
  const formData = new FormData(eventTarget);
  const entries = formData.entries();

  const body = (() => {
    let obj = {};
    for (const [key, value] of entries) {
      obj[key] = value;
    }
    return { ...obj };
  })();

  return body;
};

export default parseFormData;
