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

function prefixWithZero(timeUnit) {
  return timeUnit < 10 ? "0" + timeUnit : String(timeUnit);
}

function addOneSecondTo(time) {
  if (time.seconds === "59") {
    time.seconds = "00";
    if (time.minutes === "59") {
      time.minutes = "00";
      time.hours = prefixWithZero(Number(time.hours) + 1);
    } else {
      time.minutes = prefixWithZero(Number(time.minutes) + 1);
    }
  } else {
    time.seconds = prefixWithZero(Number(time.seconds) + 1);
  }

  return time.toString();
}

var time = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  toString() {
    return this.hours
      ? this.hours + ":" + this.minutes + ":" + this.seconds
      : this.minutes + ":" + this.seconds;
  },
};

function initializeTime(prettyPrintedDuration) {
  const timeStringArray = prettyPrintedDuration.split(":");
  if (timeStringArray.length === 2) {
    time.hours = null;
  }
}

function setTime(timeString) {
  const timeArray = timeString.split(":");
  if (timeArray.length === 3) {
    time.seconds = timeArray[2] || null;
    time.minutes = timeArray[1] || null;
    time.hours = timeArray[0] || null;
  } else if (timeArray.length === 2) {
    time.seconds = timeArray[1] || null;
    time.minutes = timeArray[0] || null;
  }
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
      initializeTime(prettyPrintedDuration);
      initializeSingleSecondProgressPercentage(myAudio.duration);
      progressBar.style.transform = `scaleX(0) translateY(-50%)`;
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

  let singleSecondProgressPercentage;

  function initializeSingleSecondProgressPercentage(totalDurationInSeconds) {
    singleSecondProgressPercentage =
      Math.round((1 / totalDurationInSeconds) * 100 * 100) / 100;
  }

  function nonThrottledTimeUpdate() {
    const newProgressPercentage =
      Number(circleHolder.style.left.split("%")[0]) +
      singleSecondProgressPercentage;

    if (!flag) {
      requestAnimationFrame(() => {
        currentTime.innerHTML = addOneSecondTo(time);
        progressBar.style.transform = `scaleX(${newProgressPercentage}) translateY(-50%)`;
        circleHolder.style.left = `${newProgressPercentage}%`;
      });
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

    setTime(currentTimeString);

    cancelSeekCurrentTime.innerHTML = currentTimeString;
    currentTime.innerHTML = currentTimeString;
    progressBar.style.transform = `scaleX(${roundedNewPercentage}) translateY(-50%)`;
    circleHolder.style.left = `${roundedNewPercentage}%`;
  };

  const updatePosition = throttle(nonThrottledUpdatePosition, 25);

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

      currentTime.innerHTML = prettyPrintSeconds(myAudio.currentTime);
      progressBar.style.transform = `scaleX(${newProgressPercentage}) translateY(-50%)`;
      circleHolder.style.left = `${newProgressPercentage}%`;

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
