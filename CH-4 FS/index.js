const { log } = require("console");
const fs = require("fs");

// fs.writeFileSync("./demo.txt", "hello Node js");

// fs.writeFile("./demo.txt", "hello bhagirath !!!", (error) => {
//   if (error) {
//     console.log("Error:", error);
//   } else {
//     console.log("File updated successfully!");
//   }
// });

// fs.appendFileSync(
//   "./demo.txt",
//   "I am student!! " + new Date().toLocaleString() + "\n"
// );

// fs.appendFile("./demo.txt","i am bhagirath!!" + new Date().toLocaleString() + "\n" , (err) => {
//     if(err)
//     {
//         console.log(err);

//     }
//     else
//     {
//         console.log("program succesfull!!!");

//     }
// });

const result = fs.readFileSync("./demo.txt", "utf-8");
console.log(result);

fs.readFile("./demo.txt", "utf-8", (err, result) => {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});
