// const express = require("express");
// const app = express();

// app.get("/", (req, res) => {
//   res.send("hey whatup from express");
// });

// app.listen(3000);
const fs = require("fs");
const fileName = "target.txt";

// syncronous 
const data = fs.readFileSync(fileName)
console.log(data.toString());

// asyncronous
fs.readFile(fileName, (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data.toString());
});

console.log("Node js async programming ... ?")