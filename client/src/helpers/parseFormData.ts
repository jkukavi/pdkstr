const parseFormData = (eventTarget: HTMLFormElement) => {
  const formData = new FormData(eventTarget);

  const body: {
    [key: string]: string;
  } = {};

  formData.forEach((value, key) => {
    if (typeof value === "string") {
      body[key] = value;
    }
  });

  return body;
};

export default parseFormData;
