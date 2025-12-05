const fs = require("fs");
const os = require("os");

console.log("cpu:",os.cpus().length);

console.log("1");

// sync

// const result = fs.readFileSync("./test.txt","utf-8");
// console.log(result);

// console.log("2");
// console.log("dhruv");

// async

fs.readFile("./test.txt", "utf-8", (err, result) => {
  console.log(result);
});
console.log("2");
console.log("dhruv");
