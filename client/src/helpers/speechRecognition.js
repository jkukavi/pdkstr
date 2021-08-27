import speak from "./speak";

function Nothing() {
  this.start = () => {};
}

var SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition || Nothing;
var recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var startSearch;
var notify;

recognition.onstart = function () {
  notify("Listening...");
};

recognition.onspeechend = function () {
  notify("Stopped listening.");
  recognition.stop();
};

// This runs when the speech recognition service returns result
recognition.onresult = function (event) {
  var transcript = event.results[0][0].transcript;
  var confidence = event.results[0][0].confidence;
  notify(`Transcribed: "${transcript}" with confidence ${confidence * 100}%`);
  if (confidence < 0.75) {
    speak("Stop mumbling.");
  } else {
    startSearch(transcript);
  }
};

const recognizeAndStartSearch = (currentStartSearch, currentNotify) => {
  startSearch = currentStartSearch;
  notify = currentNotify;
  return () => {
    recognition.start();
  };
};

export default recognizeAndStartSearch;
