const speak = (string) => {
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(string));
};

export default speak;
