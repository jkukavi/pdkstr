import speak from "./speak";
import { notify } from "components/Notifications";
import { SearchBox } from "components/Search/SearchBox";

function Nothing() {
  return {
    start: () => {},
    stop: () => {},
  };
}

//Nothing is added so that non-chrome browsers don't crash.
let SpeechRecognition = window.webkitSpeechRecognition || Nothing;
let recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onstart = function () {
  notify("Listening...");
};

recognition.onspeechend = function () {
  notify("Stopped listening.");
  recognition.stop();
};

// This runs when the speech recognition service returns result
recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript;
  const confidence = event.results[0][0].confidence;
  const confidencePercentage = Math.floor(confidence * 100);
  notify(
    `Transcribed: "${transcript}" with confidence ${confidencePercentage}%`
  );
  if (confidencePercentage < 75) {
    speak("Stop mumbling.");
  } else {
    SearchBox.searchFromVoiceInput(transcript);
  }
};

const recognizeAndStartSearch = () => {
  return () => recognition.start();
};

export default recognizeAndStartSearch;

document.getElementById("hello")?.addEventListener("start", (e) => {});
