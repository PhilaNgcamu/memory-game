const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${formattedMinutes}:${formattedSeconds}`;
};

export const timeTaken = (minutes, seconds) => {
  if (minutes === "00") {
    return `${seconds} seconds`;
  }
  if (minutes === "01" && seconds === "01") {
    return `${minutes} minute and ${seconds} second`;
  } else if (minutes === "01") {
    return `${minutes} minute and ${seconds} seconds`;
  } else if (minutes !== "01" && seconds === "01") {
    return `${minutes} minutes and ${seconds} second`;
  } else {
    return `${minutes} minutes and ${seconds} seconds`;
  }
};

export default formatTime;
