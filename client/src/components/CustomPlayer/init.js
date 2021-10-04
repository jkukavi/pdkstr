import playIcon from "./icons/play.svg";
import pauseIcon from "./icons/pause.svg";
import { throttle } from "helpers";

function prettyPrintSeconds(secondsWithRemainder) {
  if (secondsWithRemainder === undefined) {
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

function addSecondsToTime(time, diff) {
  let newSeconds = Number(time.seconds) + diff;

  if (newSeconds > 59) {
    time.seconds = prefixWithZero(newSeconds % 60);
    if (time.minutes === "59") {
      time.minutes = "00";
      time.hours = prefixWithZero(Number(time.hours) + 1);
    } else {
      time.minutes = prefixWithZero(Number(time.minutes) + 1);
    }
  } else {
    time.seconds = prefixWithZero(newSeconds);
  }

  return time.toString();
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

  const listeners = [];

  function addEventListener(element, ...args) {
    listeners.push({
      element,
      args,
    });

    element.addEventListener(...args);
  }

  function removeAllEventListeners() {
    for (const { element, args } of listeners) {
      element.removeEventListener(...args);
    }
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
      time.hours = null;
    }
  }

  function displayControls() {
    // playButton.style.display = "block";
  }

  // check that the media is ready before displaying the controls
  if (myAudio.readyState === 4) {
    displayControls();
  } else {
    // not ready yet - wait for canplay event
    addEventListener(myAudio, "canplay", displayControls, { once: true });
  }

  if (myAudio.readyState > 0) {
    const prettyPrintedDuration = prettyPrintSeconds(myAudio.duration);
    document.getElementById("duration").innerHTML = prettyPrintedDuration;
    cancelSeekDuration.innerHTML = prettyPrintedDuration;
  } else {
    addEventListener(myAudio, "loadedmetadata", onLoadedMetadata);
  }

  function onLoadedMetadata() {
    const prettyPrintedDuration = prettyPrintSeconds(myAudio.duration);
    document.getElementById("duration").innerHTML = prettyPrintedDuration;
    cancelSeekDuration.innerHTML = prettyPrintedDuration;
    initializeTime(prettyPrintedDuration);
    initializeSingleSecondProgressPercentage();
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

  function playAudio() {
    playing = true;
    playButton.style.backgroundImage = `url(${pauseIcon})`;
  }

  function pauseAudio() {
    playing = false;
    playButton.style.backgroundImage = `url(${playIcon})`;
  }

  addEventListener(playButton, "click", playOrPause);
  addEventListener(myAudio, "play", playAudio);
  addEventListener(myAudio, "pause", pauseAudio);

  var seeking = false;

  let singleSecondProgressPercentage;
  let currentProgressPercentage = 0;
  let currentSecond = 0;

  function initializeSingleSecondProgressPercentage() {
    const totalDuration = Math.floor(myAudio.duration);
    let nonRoundedPercentage = (1 / totalDuration) * 100;
    singleSecondProgressPercentage =
      Math.round(nonRoundedPercentage * 100 * 100) / (100 * 100);
  }

  function endTrack() {
    currentProgressPercentage = 100;
    progressBar.style.left = `${currentProgressPercentage}%`;
    circleHolder.style.left = `${currentProgressPercentage}%`;
  }

  addEventListener(myAudio, "ended", endTrack);

  function nonThrottledTimeUpdate() {
    const newSeconds = Math.floor(myAudio.currentTime);
    const diff = newSeconds - currentSecond;

    if (diff === 0) {
      return;
    } else if (diff < 0) {
      setTime(prettyPrintSeconds(newSeconds));
      currentProgressPercentage = newSeconds * singleSecondProgressPercentage;
    } else {
      addSecondsToTime(time, diff);
      currentSecond = newSeconds;
      currentProgressPercentage += diff * singleSecondProgressPercentage;
    }

    if (!seeking) {
      requestAnimationFrame(() => {
        currentTime.innerHTML = time.toString();
        progressBar.style.left = `${currentProgressPercentage}%`;
        circleHolder.style.left = `${currentProgressPercentage}%`;
      });
    } else {
      currentTime.innerHTML = time.toString();
    }
  }

  const timeUpdate = nonThrottledTimeUpdate;
  addEventListener(myAudio, "timeupdate", timeUpdate);

  function bufferBarUpdate() {
    var duration = myAudio.duration;
    if (duration > 0) {
      if (myAudio.buffered.length > 0) {
        const bufferedPercentage =
          (myAudio.buffered.end(myAudio.buffered.length - 1) / duration) * 100;
        bufferBar.style.width = bufferedPercentage + "%";
      }
    }
  }

  addEventListener(myAudio, "progress", bufferBarUpdate);

  let cancelSeekBoundingClientRect;
  let isTouchingCancelSeek = false;

  function setCancelSeekBoundingClientRect(clientRect) {
    cancelSeekBoundingClientRect = {
      top: Math.floor(clientRect.top),
      bottom: Math.floor(clientRect.bottom),
    };
  }

  function touchInsideCancelSeek(e) {
    if (
      e.clientY > cancelSeekBoundingClientRect.top &&
      e.clientY < cancelSeekBoundingClientRect.bottom
    ) {
      return true;
    }
    return false;
  }

  const nonThrottledUpdatePosition = (e) => {
    let newPercentage =
      ((e.pageX - barHolder.offsetLeft) / barHolder.clientWidth) * 100;

    let newSeconds;

    if (e.pointerType === "touch") {
      if (touchInsideCancelSeek(e) && !isTouchingCancelSeek) {
        isTouchingCancelSeek = true;
        cancelSeek.classList.add("cancel");
      } else if (!touchInsideCancelSeek(e) && isTouchingCancelSeek) {
        isTouchingCancelSeek = false;
        cancelSeek.classList.remove("cancel");
      }
    }

    if (newPercentage < 0) {
      newSeconds = 0;
    } else if (newPercentage > 100) {
      newSeconds = Math.floor(myAudio.duration);
    } else {
      newSeconds = Math.floor(newPercentage / singleSecondProgressPercentage);
    }

    const currentTimeString = prettyPrintSeconds(newSeconds);
    const roundedNewPercentage = newSeconds * singleSecondProgressPercentage;

    cancelSeekCurrentTime.innerHTML = currentTimeString;
    progressBar.style.left = `${roundedNewPercentage}%`;
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
    seeking = false;
    window.removeEventListener("pointermove", updatePosition);
    window.removeEventListener("pointerup", cleanup);

    try {
      if (cancelSeekIsPressed(e)) throw new Error("Seek cancelled");
    } catch (e) {
      currentTime.innerHTML = time.toString();
      progressBar.style.left = `${currentProgressPercentage}%`;
      circleHolder.style.left = `${currentProgressPercentage}%`;
      return;
    } finally {
      circle.classList.remove("display");
      cancelSeek.classList.remove("display");
    }

    const rawNewPercentage = Number(circleHolder.style.left.slice(0, -1));

    const newSeconds = Math.floor(
      rawNewPercentage / singleSecondProgressPercentage
    );

    currentProgressPercentage = newSeconds * singleSecondProgressPercentage;
    currentSecond = newSeconds;
    const newTime = prettyPrintSeconds(newSeconds);
    setTime(newTime);

    // move the playhead to the correct position
    myAudio.currentTime = newSeconds;
    currentTime.innerHTML = time.toString();
    progressBar.style.left = `${currentProgressPercentage}%`;
    circleHolder.style.left = `${currentProgressPercentage}%`;
  };

  function handlePointerDown(e) {
    e.preventDefault();
    e.stopPropagation();

    seeking = true;
    circle.classList.add("display");
    cancelSeek.classList.add("display");
    setCancelSeekBoundingClientRect(cancelSeekButton.getBoundingClientRect());
    updatePosition(e);

    window.addEventListener("pointermove", updatePosition);
    window.addEventListener("pointerup", cleanup);
  }

  addEventListener(barHolder, "pointerdown", handlePointerDown);

  return () => {
    removeAllEventListeners();
  };
}
