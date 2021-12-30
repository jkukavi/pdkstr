const copyToClipboard = (text: string) => {
  const dummy = document.createElement("input");
  document.body.appendChild(dummy);

  dummy.setAttribute("value", text);
  dummy.select();
  dummy.setSelectionRange(0, 99999);

  document.execCommand("copy");
  document.body.removeChild(dummy);
};

export default copyToClipboard;
