import playIcon from "./icons/play.png";
import pauseIcon from "./icons/pause.png";
import { throttle } from "../../helpers/helpers";

function prettyPrintSeconds(secondsWithRemainder) {
  if (!secondsWithRemainder) {
    return "N/A";
  }
  const totalSeconds = Math.floor(secondsWithRemainder);
  const secondsInHour = 60 * 60;
  const secondsInMinute = 60;
  const hours = Math.floor(totalSeconds / secondsInHour);
  const minutes = Math.floor((totalSeconds % secondsInHour) / secondsInMinute);
  const seconds = Math.floor(totalSeconds % secondsInMinute);

  const hoursString = hours === 0 ? null : hours < 10 ? "0" + hours : hours;
  const minutesString =
    minutes === 0 ? "00" : minutes < 10 ? "0" + minutes : minutes;
  const secondsString = seconds < 10 ? "0" + seconds : seconds;

  const prettyPrintedString = `${hoursString ? hoursString + ":" : ""}${
    minutesString + ":"
  }${secondsString}`;

  return prettyPrintedString;
}

export default function init() {
  var myAudio = document.getElementById("my-audio");
  var playButton = document.getElementById("playButton");
  var progressBar = document.querySelector(".progress.bar");
  var bufferBar = document.querySelector(".buffer.bar");
  var barHolder = document.getElementById("barHolder");
  var circleHolder = document.querySelector("#circleHolder");
  var circle = document.querySelector("#circleHolder .circle");
  var currentTime = document.getElementById("currentTime");
  var cancelSeek = document.getElementById("cancelSeek");
  var cancelSeekButton = document.querySelector("#cancelSeek .button");
  var cancelSeekCurrentTime = document.querySelector(
    "#cancelSeek .currentTime"
  );
  var cancelSeekDuration = document.querySelector("#cancelSeek .duration");

  let playing = false;

  function displayControls() {
    // playButton.style.display = "block";
  }

  // check that the media is ready before displaying the controls
  if (myAudio.readyState === 4) {
    displayControls();
  } else {
    // not ready yet - wait for canplay event
    myAudio.addEventListener(
      "canplay",
      function () {
        displayControls();
      },
      { once: true }
    );
  }

  if (myAudio.readyState > 0) {
    const prettyPrintedDuration = prettyPrintSeconds(myAudio.duration);
    document.getElementById("duration").innerHTML = prettyPrintedDuration;
    cancelSeekDuration.innerHTML = prettyPrintedDuration;
  } else {
    myAudio.addEventListener("loadedmetadata", () => {
      const prettyPrintedDuration = prettyPrintSeconds(myAudio.duration);

      document.getElementById("duration").innerHTML = prettyPrintedDuration;
      cancelSeekDuration.innerHTML = prettyPrintedDuration;
    });
  }

  function playOrPause(e) {
    e.preventDefault();
    e.stopPropagation();
    if (playing) {
      playButton.style.backgroundImage = `url(${playIcon})`;
      myAudio.pause();
    } else {
      playButton.style.backgroundImage = `url(${pauseIcon})`;
      myAudio.play();
    }
  }

  playButton.addEventListener("click", playOrPause);

  myAudio.addEventListener("play", () => {
    playing = true;
    playButton.style.backgroundImage = `url(${pauseIcon})`;
  });

  myAudio.addEventListener("pause", () => {
    playing = false;
    playButton.style.backgroundImage = `url(${playIcon})`;
  });

  // // display progress

  var flag = false;

  function nonThrottledTimeUpdate() {
    const newProgressPercentage =
      Math.round((myAudio.currentTime / myAudio.duration) * 100 * 100) / 100;
    //sets the percentage

    if (!flag) {
      currentTime.innerHTML = prettyPrintSeconds(myAudio.currentTime);
      progressBar.style.width = `${newProgressPercentage}%`;
      circleHolder.style.left = `${newProgressPercentage}%`;
    }
  }

  const timeUpdate = throttle(nonThrottledTimeUpdate, 800);

  myAudio.addEventListener("timeupdate", timeUpdate);

  myAudio.addEventListener("progress", function () {
    var duration = myAudio.duration;
    if (duration > 0) {
      if (myAudio.buffered.length > 0) {
        const bufferedPercentage =
          (myAudio.buffered.end(myAudio.buffered.length - 1) / duration) * 100;
        bufferBar.style.width = bufferedPercentage + "%";
      }
    }
  });

  const nonThrottledUpdatePosition = (e) => {
    const newPercentage =
      (e.pageX - barHolder.offsetLeft) / barHolder.clientWidth;

    if (newPercentage < 0 || newPercentage > 1) {
      return;
    }

    const roundedNewPercentage = Math.round(newPercentage * 100 * 100) / 100;

    const currentTimeString = prettyPrintSeconds(
      Math.round((roundedNewPercentage / 100) * myAudio.duration)
    );
    cancelSeekCurrentTime.innerHTML = currentTimeString;
    currentTime.innerHTML = currentTimeString;
    progressBar.style.width = `${roundedNewPercentage}%`;
    circleHolder.style.left = `${roundedNewPercentage}%`;
  };

  const updatePosition = throttle(nonThrottledUpdatePosition, 15);

  function cancelSeekIsPressed(e) {
    if (e.pointerType === "mouse" && e.target === cancelSeekButton) {
      return true;
    } else if (e.pointerType === "touch") {
      const target = document.elementFromPoint(e.clientX, e.clientY);
      if (target === cancelSeekButton) return true;
    }
    return false;
  }

  const cleanup = (e) => {
    flag = false;
    window.removeEventListener("pointermove", updatePosition);
    window.removeEventListener("pointerup", cleanup);

    try {
      if (cancelSeekIsPressed(e)) throw new Error("Seek cancelled");
    } catch (e) {
      circle.classList.remove("display");
      cancelSeek.classList.remove("display");
      const newProgressPercentage =
        Math.round((myAudio.currentTime / myAudio.duration) * 100 * 100) / 100;

      setTimeout(() => {
        requestAnimationFrame(() => {
          currentTime.innerHTML = prettyPrintSeconds(myAudio.currentTime);
          progressBar.style.width = `${newProgressPercentage}%`;
          circleHolder.style.left = `${newProgressPercentage}%`;
        });
      });
      return;
    } finally {
      circle.classList.remove("display");
      cancelSeek.classList.remove("display");
    }

    var clickPositionString = circleHolder.style.left;
    var clickPosition = Number(clickPositionString.slice(0, -1)) / 100;
    var clickTime = clickPosition * myAudio.duration;
    var twoDecClickTime = Math.round(clickTime * 100) / 100;
    // move the playhead to the correct position
    myAudio.currentTime = twoDecClickTime;
  };

  barHolder.addEventListener("pointerdown", function (e) {
    e.preventDefault();
    e.stopPropagation();

    flag = true;
    circle.classList.add("display");
    cancelSeek.classList.add("display");
    updatePosition(e);

    window.addEventListener("pointermove", updatePosition);
    window.addEventListener("pointerup", cleanup);
  });

  return () => {
    playButton.removeEventListener("click", playOrPause);
  };
}
