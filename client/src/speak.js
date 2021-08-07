const speak = (string) => {
  const utterance = new SpeechSynthesisUtterance(string);
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
};

export default speak;
