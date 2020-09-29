// Source: https://www.linkedin.com/learning/javascript-essential-training-3/create-an-analog-clock-project-breakdown

function clock() {
  const HOURHAND = document.querySelector("#hour");
  const MINUTEHAND = document.querySelector("#minute");
  const SECONDHAND = document.querySelector("#second");

  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let secondPosition = 1 + (seconds / 60) * 360;
  let minutePosition = (minutes / 60) * 360 + secondPosition / 60;
  let hourPosition = (hours / 12) * 360 + minutePosition / 12;

  function updateClock() {
    // Let JavaScript recalculate and update the clock.
    // Alternatively, a new Date object could be created every second.
    secondPosition = secondPosition + 360 / 60;
    minutePosition = minutePosition + 360 / (60 * 60);
    hourPosition = hourPosition + 360 / (12 * 60 * 60);

    HOURHAND.style.transform = `rotate(${hourPosition}deg)`;
    MINUTEHAND.style.transform = `rotate(${minutePosition}deg)`;
    SECONDHAND.style.transform = `rotate(${secondPosition}deg)`;
  }

  setInterval(updateClock, 1000);
}

clock();
