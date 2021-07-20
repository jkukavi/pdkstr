var SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
var startSearch;

recognition.onstart = function () {
  console.log("started Listening");
};

recognition.onspeechend = function () {
  console.log("stopped listening");
  recognition.stop();
};

// This runs when the speech recognition service returns result
recognition.onresult = function (event) {
  var transcript = event.results[0][0].transcript;
  var confidence = event.results[0][0].confidence;
  console.log(confidence);
  if (confidence < 0.85) {
    window.speechSynthesis.speak(
      new SpeechSynthesisUtterance(
        "Stop fucking mumbling and repeat yourself clearly bro"
      )
    );
  } else {
    startSearch(transcript);
  }
};

const recognizeAndStartSearch = (currentStartSearch) => {
  startSearch = currentStartSearch;
  return () => {
    recognition.start();
  };
};

export default recognizeAndStartSearch;
