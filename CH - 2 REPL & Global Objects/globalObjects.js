// global objects

// console.log(`Path of this file : ${__filename}`);
// console.log(`Path of this folder : ${__dirname}`);

// setTimeout(() => {
//   console.log(`Delay for 3 second`);
// }, 3000 /* millisecond*/);

// let num = 1;
// setInterval(() => {
//   console.log(`2 second interval ${num++}`);
// }, 2000);

// intermediate level
//  1) Print the numbers 1, 2, 3, 4, 5, each with different delays (ex: 1s, 2s, 3s, 4s, 5s).

// let dig = 1;

// const printTime = () => {
//   let timer = 2000;
//   if (dig > 5) return;
//   console.log(`${dig}`);
//   dig++;
//   timer = timer * dig;
//   setTimeout(printTime, timer);
// };

// printTime();

// question 2

// Make a program that runs two intervals:

// Interval 1: prints "Ping" every 1 second

// Interval 2: prints "Pong" every 2 seconds
// Both should run at same time.

let second = 1;
const interval = setInterval(() => {
  if (second % 3 == 0) {
    console.log(`Pong`);
  } else {
    console.log(`Ping`);
  }

  if (second == 30) clearInterval(interval);
  second++;
}, 2000);