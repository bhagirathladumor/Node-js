let seconds = 60;

setInterval(() => {
  let minute = Math.floor(seconds / 60);
  let sec = seconds % 60;
  if (seconds == -1) return;

  if (minute <= 9) {
    if (sec <= 9) {
      console.log(`0${minute} : 0${sec}`);
    } else {
      console.log(`${minute} : ${sec}`);
    }
  } else {
    console.log(`${minute} : ${sec}`);
  }
  seconds--;
}, 5000);